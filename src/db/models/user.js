'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        phone: DataTypes.NUMERIC,
        address: DataTypes.STRING,
        roleId: DataTypes.INTEGER
    }, {});

    User.associate = function (models) {
        // User.hasOne(models.Farmer, {
        //     foreignKey: {
        //         name: 'userId',
        //         allowNull: false
        //     },
        //     as: 'farmer',
        //     onDelete: 'cascade',
        //     hooks: true
        // });

        // User.hasMany(models.orderclient, {
        //     foreignKey: {
        //         name: 'userId',
        //         allowNull: false
        //     },
        //     as: 'orderclient',
        // });

        // User.hasMany(models.Notifications, {
        //     foreignKey: {
        //         name: 'userId',
        //         allowNull: false
        //     },
        //     as: 'notifications',
        //     onDelete: 'cascade',
        //     hooks: true
        // });

        User.belongsTo(models.Role, {
            foreignKey: {
                name: 'roleId',
                allowNull: false,
            },
            as: 'role'
        });

    };
    return User;
};