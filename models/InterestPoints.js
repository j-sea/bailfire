'use strict';

module.exports = (sequelize, DataTypes) => {
    const InterestPoints = sequelize.define('InterestPoints', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        geolocation: DataTypes.FLOAT,
        photo_url: DataTypes.STRING,
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});
    InterestPoints.associate = function (models) {
        InterestPoints.belongsTo(models.Groups);
        InterestPoints.hasMany(models.InterestPointChats)
        InterestPoints.hasMany(models.Alarm)
    };
    return InterestPoints;
}
