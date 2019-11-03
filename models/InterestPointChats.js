'use strict';

module.exports = (sequelize, DataTypes) => {
    const InterestPointChats = sequelize.define('InterestPointChats', {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
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