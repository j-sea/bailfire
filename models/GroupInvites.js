'use Strict';

module.exports = (sequelize, DataTypes) => {
    const GroupInvites = sequelize.define('GroupInvites', {

        //auto generate UUID format - can be UUIDV1 or UUIDV4
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        guest_user_uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            default: null
        },
        accepted: {
            type: Boolean,
            default: false,
            allowNull: false,
        },
        rejected: {
            type: Boolean,
            default: false,
            allowNull: false,
        },

    }, {});
    GroupInvites.associate = function (models) {
        GroupInvites.belongsTo(models.Groups);
    };
    return GroupInvites;
};