# Development notes
This app relies on an external concatenation process (not included) that bundles the contents of 
main.js and any other dependent angular scripts into a top-level bundle.js script. This is what 
the index.html expects to find.

At present, the required files are:

1. main.js
2. factories/ops-factory.js
3. directives/line-html.js

Angular doesn't care about the order of loading, but I like to put main on top as a convention.

## Details
This project is part of a bigger set of apps that I'd like to make independently. That is to say,
I want each app to have its own repository. They will share some basic build-tools however.
Since I don't want to put common tools under any one repository, I'll document the general build processes here.

For now I use a nodejs-based server to run the app(s), and a gulpfile to bundle the js scripts.
Both sit in a parent folder. Here is the gulpFile: ultimately I'll add a watch task to handle auto-bundling if the codebase gets too big.
```
var gulp = require("gulp"),
	concat = require('gulp-concat');

gulp.task('bundle-balanced-line', function() {
	var path = "balanced-line/";
	var sources = [
		path+"main.js",
		path+"factories/**/*.js",
		path+"directives/**/*.js"
	];
	gulp.src(sources)
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest(path));
});

gulp.task('default', ['bundle-balanced-line']);
```

I don't recall where I first found the node server script I use. For reference, here is my slightly 
modified version, and thanks to the original author, whoever you are:
```
var http = require('http'),
	url = require("url"),
	path = require("path"),
	fs = require("fs"),
	PORT=8800,
	server;

function handleRequest(req, res) {
	var uri = url.parse(req.url).pathname, 
	filename = path.join(process.cwd(), uri);
	
	fs.exists(filename, function(exists) {
		if(!exists) {
			res.end("Not found");
			return;
		}
		if(fs.statSync(filename).isDirectory()) {
			filename += 'index.html';
		}
		
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				res.end("error");
				return;
			}
			res.writeHead(200);
			res.write(file, "binary");
			res.end();
		});
	});
	
}

server = http.createServer(handleRequest);

server.listen(PORT, function() {
	console.log("Listening on port " + PORT);
	console.log("Root: " + process.cwd());
	console.log("CTRL+C to shut down");
});

```
