
import { hashPassword } from '../helpers/utils';
import { invalidError, notNullErrorMsg } from '../helpers/defaults';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: `name ${invalidError}`,
                notNull: `email ${notNullErrorMsg}`,
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: `email ${invalidError}`,
                notNull: `email ${notNullErrorMsg}`,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: `password ${notNullErrorMsg}`,
            }
        },
    }, {
        paranoid: true,
    });

    User.beforeCreate(hashPassword);

    return User;
};
