const express = require('express');
// const db = require('./models');
const routes = require('./routes');

var PORT = process.env.PORT || 8080;

const app = express();

app.use(function(req, res, next) {
	const authorizedOrigins = [
		'http://localhost:3000',
		'https://skatter.herokuapp.com',
	];

	console.log(req.headers);

	if (authorizedOrigins.indexOf(req.headers.origin) !== -1) {
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Origin", req.headers.origin);
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	}
	next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Express to use our external routes
app.use(routes);

// db.sequelize.sync({ force: true }) // Drop all data, and Recreate the tables
// db.sequelize.sync() // Keep all data, and Initialize the tables
// .then(function() {
    // Start our server so that it can begin listening to client requests.
    app.listen(PORT, function () {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
// })
// .catch(err => console.log(err));
