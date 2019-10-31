'use strict';

module.exports = (sequelize, DataTypes) => {
    const Alarm = sequelize.define('Alarm', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        meeting_time: {
            type: sequelize.Date,
            allowNull: false,
        },
    }, {});
    Alarm.associate = function (models) {
        Alarm.belongsTo(model.InterestPoints);
        Alarm.belongsTo(model.Groups);
    };
    return Alarm;
}