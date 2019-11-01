'use strict';

module.exports = (sequelize, DataTypes) => {
    const GroupUserDetails = sequelize.define('GroupUserDetails', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        photo_url: DataTypes.STRING,
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
        },
        longitude: {
            type: DataTypes.FLOAT,
        },
        geolocation_accuracy: {
            type: DataTypes.FLOAT,
        },
        altitude: DataTypes.FLOAT,
        altitude_accuracy: DataTypes.FLOAT,
        heading: DataTypes.FLOAT,
        speed: DataTypes.FLOAT,

    }, {});
    GroupUserDetails.associate = function (models) {
        GroupUserDetails.belongsTo(models.Groups);
        GroupUserDetails.belongsTo(models.Users);
    };
    return GroupUserDetails;
}
