'use strict';

module.exports = (sequelize, DataTypes) => {
    const GroupChats = sequelize.define('GroupChats', {
        user_uuid: DataTypes.UUID,
        message: DataTypes.STRING,
        edited: {
            type: DataTypes.BOOLEAN,
            default: false
        },
    }, {});
    // GroupChats.associate = function (models) {
    //     GroupChats.belongsTo(models.Users);
    //     GroupChats.belongsTo(models.InterestPoints);
    // }
    return GroupChats;
}