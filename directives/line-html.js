/*
	Assume that the directive applies to a div attribute.
*/
/*globals app */
app.directive("jtLineHtml", function(OpsFactory) {
	'use strict';
	function processAll(ops) {
		ops.forEach(function(op) {
			op.process();
		});
	}

	return {
		scope: {
			failrate:"=",
			runtimes:"=",
			stores:"="
		},
		controller: function($scope) {
			$scope.ops = [];
			$scope.stores.forEach(function(store, i) {
				var rate, runtime;				
				if(i>0) {
					rate = $scope.failrate[i-1];
					runtime = $scope.runtimes[i-1];
					$scope.ops.push(OpsFactory.make(
						$scope.stores[i-1],
						$scope.stores[i],
						runtime, rate
					));
				}
			});
			$scope.getWIP = function() {
				var wip = 0;
				$scope.ops.forEach(function(op) {
					if(op.getTick()>0) { wip+=1; }
					wip += op.getOutputSum();
				});
				wip -= $scope.stores[$scope.stores.length-1]; //subtract finished goods
				return wip;
			};
			$scope.$on("tick", function() {
				processAll($scope.ops);
			});
		},
		template: ["<div>",
			'<button class="store">{{stores[0][0]}}</button>',
			'<span ng-repeat="op in ops">',
			'	<span>&#8680;</span>',
			'	<button class="op">{{op.toString()}}</button>',
			'	<button class="store">{{op.getOutputs()}}</button>',
			'</span>',
			'<span> WIP={{getWIP()}}',
			'</div>'].join("")
	};
});
