
app.factory("OpsFactory", function() {
	function pushTo(a, n) {
		a.forEach(function(v,i) {
			a[i] = v+n;
		});
	}
	function pullFrom(a, n) {
		var insufficient = false;
		a.forEach(function(v,i) {
			a[i] = v-n;
			if(a[i]<0) { insufficient = true; }
		});
		if(insufficient) {
			pushTo(a,n); //reverse
			return 0;
		}
		return n;
	}
	function makeOp(inputs, outputs, runtime, failrate) {
		var wip = 0,
		tick = 0,
		op = {};
		runtime = runtime || 4;
		failrate = failrate || 0;
		op.process = function() {
			if(Math.random() < failrate) {
				return; //breakdown... maybe update colour?
			}
			tick = (tick > 0 ) ? tick-1 : tick;
			if(tick===0) {
				if(wip>0) {
					pushTo(outputs, wip);
				}
				wip = pullFrom(inputs, 1);
				if(wip>0) {
					tick = runtime;
				}
			}
		};
		op.getTick = function() { return tick; };
		op.getOutputs = function() { return outputs.join(","); };
		op.getOutputSum = function() {
			var sum = 0;
			outputs.forEach(function(v) {
				sum += v;
			});
			return sum;
		};
		op.toString = function() {
			var flag = (tick>0) ? "*": "_";
			return flag + tick;
		};
		return op;
	}
	return {
		make: makeOp,
		pushTo: pushTo,
		pullFrom: pullFrom
	};
});

