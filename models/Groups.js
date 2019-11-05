//literal expression to indicate code should be executed in 'strict mode' which hels you write cleaner code
'use strict';

module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {

        //auto generate UUID format - can be UUIDV1 or UUIDV4
        group_uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,

        deleted: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },

    }, {});
    Groups.associate = function (models) {
        //TODO:
        // Groups.hasMany(models.GroupInvites);
        // Groups.hasMany(models.GroupUserDetails);
        // Groups.hasMany(models.GroupChats);
        // Groups.hasMany(models.InterestPoints);
        // Groups.hasMany(models.Alarm);
        // Groups.belongsToMany(models.Users, { through: 'UsersGroupsJT' });
    };
    return Groups;
};