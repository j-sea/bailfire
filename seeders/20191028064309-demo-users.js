'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				email: 'a@a.com',
				password: 'password'
			},
			{
				email: 'b@b.com',
				password: 'password'
			},
			{
				email: 'c@c.com',
				password: 'password'
			},
			{
				email: 'd@d.com',
				password: 'password'
			},
		], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
