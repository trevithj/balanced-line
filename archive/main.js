/*globals angular, d3, console */
/*jslint indent: 4, maxerr: 50, white: true, todo: true */

//Balanced line app
var app = angular.module("DiceGame",[]);

app.controller("GameCtrl", function($scope, $interval) {
	"use strict";
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

