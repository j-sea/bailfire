'use strict';

const db = require('./models');

module.exports = () => {
	return db.Users.bulkCreate([
		{
			email: 'a@a.com',
			password: 'password',
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
		{
			email: 'b@b.com',
			password: 'password',
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
		{
			email: 'c@c.com',
			password: 'password',
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
		{
			email: 'd@d.com',
			password: 'password',
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
	]);
};