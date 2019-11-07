//literal expression to indicate code should be executed in 'strict mode' which hels you write cleaner code
'use strict';

module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {

        //auto generate UUID format - can be UUIDV1 or UUIDV4
        group_uuid: {
            type: DataTypes.UUID,
            // primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,

        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });
    Groups.associate = function (models) {
        Groups.hasMany(models.GroupInvites, {
            onDelete: "cascade"
        });
        Groups.hasMany(models.GroupUserDetails, {
            onDelete: "cascade"
        });
        Groups.hasMany(models.GroupChats, {
            onDelete: "cascade"
        });
        Groups.hasMany(models.InterestPoints, {
            onDelete: "cascade"
        });
        Groups.hasMany(models.Alarms, {
            onDelete: "cascade"
        });
        Groups.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Groups;
};