# Line Simulator
This runs three similar lines at once. 

1. The first is an "ideal" line - each operation has exactly the same capacity, and there is zero variation. Result - maximum throughput.
2. The second line is also balanced, but with variation in each operation's performance in the form of random delays. The operations are faster though, so the average time for each operation is the same as the first line. Or is it?
3. The third line is unbalanced. The first operation is quicker, but with a greater chance of delays. Subsequent operations have less chance of delays but are slower. Overall, each operation still has an average performance over time the same as the first line's operations.

Question: which of the two lines with variation/delays will perform closest to the ideal?

The theory behind this simulator is explained very well at Kelvyn Youngman's Theory of Constraints website: http://www.dbrmfg.co.nz/ Thanks Kelvyn, for a great resource.

## Improvements todo
At present, this isn't a compelling example. It demonstrates that less variation equals better throughput, but without really showing why. A better example may be to have the same average number of 'ticks' for all operations in lines 1 and 2 (and most operations in line 3) but allow variation both ways, and not just as delays. So an operation on lines 2 or 3 may take *fewer* ticks than operations on the ideal line. If the balanced line still performs poorly, this is a clearer indication of the problem.

Also, the unbalanced line should have operations that clearly average *longer* than the ideal line operations. At present, this isn't clear. Clarifying this may entail making two versions of the unbalanced line: one as above with the bottleneck somewhere mid-line, and one where the bottleneck controls the release of material (effectively, the bottleneck is forced into the first position).

Alternatively, we could have lines 2 and 3 be identical, but with line 3's material release deliberately kept constrained. That way, all 3 lines can be compared more meaningfully. In fact, simplest case of all may be to only show lines 2 and 3, and allow the user to experiment with the rate of material-release limiting. Hmm.

A better display would also include average lead-time. This could be done by processing the same-sized order for each line, and reporting on the time to completion. Again, we can get a more compelling demonstration if we allow pre-loading of WIP in all cases - showing that the difference in initial setup isn't an issue.
