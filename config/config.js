module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "bailfire_db",
    "host": "127.0.0.1",
		"dialect": "mysql",
		"dialectModule": require('mysql2'),
  },
	"production": {
		"username": process.env.DB_USERNAME,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"host": process.env.DB_HOST,
		"dialect": "mysql",
	},
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  // },
};
