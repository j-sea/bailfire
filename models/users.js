'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		// user_uuid: {
		// 	type: DataTypes.UUID,
		// 	primaryKey: true,
		// 	allowNull: false,
		// 	defaultValue: DataTypes.UUIDV4
		// },
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
		},
		phone: {
			type: DataTypes.INTEGER,
			allowNull: true,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len:[8],
			},
		},

	}, {});
	Users.associate = function (models) {
		// Users.hasMany(models.GroupInvites);
		// Users.hasMany(models.GroupUserDetails);
		// Users.hasMany(models.GroupChats);
		// Users.hasMany(models.InterestPointChats);
		// Users.belongsToMany(models.Groups, { through: 'UsersGroupsJT' });
	};
	Users.beforeCreate(function (user) {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
	});
	return Users;
};