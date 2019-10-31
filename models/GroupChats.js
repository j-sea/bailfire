'use strict';

module.exports = (sequelize, DataTypes) => {
    const GroupChats = sequelize.define('GroupChats'{
        message: DataTypes.STRING,
        edited: {
            type: BOOLEAN,
            default: false
        },
    }, {});
    GroupChats.associate = function (models) {
        GroupChats.belongsTo(models.Users);
        GroupChats.belongsTo(models.InterestPoints);
    }
    return GroupChats;
}