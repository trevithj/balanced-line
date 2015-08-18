/*globals angular, d3, console */
//Balanced line app
"use strict";
var app = angular.module("DiceGame",[]);

app.controller("GameCtrl", function($scope, $interval) {
	var runner = null;
	$scope.count = 0;
	function stop() {
		if(runner!==null) {
			$interval.cancel(runner);
		}
		runner=null;
	}

	//TODO: replace set/clearInterval with $interval calls
	function start(ms) {
		stop();
		runner = $interval(function() {
			$scope.$broadcast("tick", null);
			$scope.count+=1;
		}, ms, 220);
	}

	$scope.start = start;
	$scope.stop = stop;
});

