// Import necessary Node.js files
var express = require('express');
var fs = require('fs');
var path = require('path');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

// Using a stack like this is considered a quicker way to perform recursive functions.
// Instead of using the memory's call stack, we're using our own stack
const basename = path.basename(__filename);
var directoryStack = [__dirname];
var currentDirectory;
// Loop through all of the directories found until all directories have been looked inside
while (directoryStack.length !== 0) {
	// Grab the top directory to look inside
	currentDirectory = directoryStack.pop();

	// Use the filesystem package
	fs
	// Read the current directory popped off the stack
	.readdirSync(currentDirectory)
	// Filter the directory's contents for paths we either want to load or look inside
	.filter(function (file) {
		// Allow only directories, files that aren't "index.js", and files that don't start with a period (like .DS_STORE or .gitignore)
		return (file.indexOf('.') !== 0 && file !== basename);
	})
	// Iterate through all of the paths found, such as route JS files and directories
	.forEach(function (file) {
		// If I'm a file
		if (file.indexOf('.') !== -1) {
			// If I'm a JS file
			if (file.slice(-3) === '.js') {
				// Use me in the routes
				router.use(
					require(
						path.join(currentDirectory, file)
					)
				);
			}
		}
		// If I'm a directory
		else {
			// Push me to the stack for processing
			directoryStack.push(
				path.join(currentDirectory, file)
			);
		}
	});
}

// Export the router which should contain all API and HTML routes now
module.exports = router;