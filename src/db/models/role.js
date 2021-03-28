'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: DataTypes.STRING
    }, {});
    Role.associate = function (models) {
        Role.hasMany(models.User, {
            foreignKey: {
                name: 'roleId',
                allowNull: false
            },
            as: 'role'
        });

        //     Role.hasMany(models.Help, {
        //         foreignKey: {
        //             name: 'roleId',
        //             allowNull: false
        //         },
        //         as: 'help'
        //     })
    };
    return Role;
};