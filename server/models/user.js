
import { hashPassword } from '../helpers/utils';
import { isRequired, invalidErrorMsg } from '../helpers/defaults';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: `name ${isRequired}`,
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: `email ${invalidErrorMsg}`
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: `password ${isRequired}`,
                }
            }
        },
    }, {
        paranoid: true,
    });

    User.beforeCreate(hashPassword);

    return User;
};
