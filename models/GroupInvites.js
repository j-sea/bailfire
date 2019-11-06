'use strict';

module.exports = (sequelize, DataTypes) => {
    const GroupInvites = sequelize.define('GroupInvites', {

        //auto generate UUID format - can be UUIDV1 or UUIDV4
        invite_uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        group_uuid: {
            type: DataTypes.UUID,
        },
        guest_user_uuid: {
            type: DataTypes.UUID,
            unique: true
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },
        rejected: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },

    }, {});
    GroupInvites.associate = function (models) {
        GroupInvites.belongsTo(models.Groups);
    };
    return GroupInvites;
};