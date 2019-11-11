'use strict';

module.exports = (sequelize, DataTypes) => {
    const GroupUserDetails = sequelize.define('GroupUserDetails', {
        group_uuid: DataTypes.UUID,
        user_uuid: DataTypes.UUID,
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
        longitude: DataTypes.DOUBLE,
        latitude: DataTypes.DOUBLE,
        geolocation_accuracy: DataTypes.DOUBLE,
        altitude: DataTypes.DOUBLE,
        altitude_accuracy: DataTypes.DOUBLE,
        heading: DataTypes.DOUBLE,
        speed: DataTypes.DOUBLE,
        locatingEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    }, {});
    GroupUserDetails.associate = function (models) {
        GroupUserDetails.belongsTo(models.Groups);
        GroupUserDetails.belongsTo(models.Users);
    };
    return GroupUserDetails;
}
