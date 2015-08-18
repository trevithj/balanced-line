# Development notes
This app relies on an external concatenation process (not included) that bundles the contents of 
main.js and any other dependent angular scripts into a top-level bundle.js script. This is what 
the index.html expects to find.

At present, the required files are:

1. main.js
2. factories/ops-factory.js
3. directives/line-html.js

Angular doesn't care about the order of loading, but I like to put main on top as a convention.
