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
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
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
