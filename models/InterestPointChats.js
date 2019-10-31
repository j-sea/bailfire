'use strict';

module.exports = (sequelize, DataTypes) => {
    const InterestPointChats = sequelize.define('InterestPointChats', {
        message: DataTypes.STRING,
        edited: {
            type: BOOLEAN,
            default: false
        },
    }, {});
    InterestPointChats.associate = function (models) {
        InterestPointChats.belongsTo(models.Users);
        InterestPointChats.belongsTo(models.InterestPoints);
    };
    return InterestPointChats;
}