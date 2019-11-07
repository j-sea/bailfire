'use strict';

module.exports = (sequelize, DataTypes) => {
    const Alarms = sequelize.define('Alarms', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        meeting_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
    Alarms.associate = function (models) {
        Alarms.belongsTo(models.InterestPoints);
        Alarms.belongsTo(models.Groups);
    };
    return Alarms;
}