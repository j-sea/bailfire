'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		geolocation: {
			type: DataTypes.GEOMETRY,
			allowNull: true,
		},
		geolocation_accuracy: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		geolocation_last_update: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		altitude: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		altitude_accuracy: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		heading: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		speed: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
	}, {});
	Users.associate = function(models) {
		// Users.hasMany(models.GroupInvites);
		// Users.hasMany(models.GroupUserDetails);
		// Users.hasMany(models.GroupChats);
		// Users.hasMany(models.InterestPointChats);
		// Users.belongsToMany(models.Groups, {through: 'UsersGroupsJT'});
	};
	Users.beforeCreate(function (user) {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
	})
	return Users;
};