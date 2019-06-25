import {
    notNullErrorMsg,
    invalidMetricsAverageError,
    integerErrorMsg,
    minMaxError,
    avgMinMaxError
} from '../helpers/defaults';
import { calcIdeaMetricsAvg } from '../helpers/utils';

module.exports = (sequelize, DataTypes) => {
    const Idea = sequelize.define('Idea', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: `idea title ${notNullErrorMsg}`,
            }
        },
        confidence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: `confidence metric ${notNullErrorMsg}`,
                isInt: integerErrorMsg,
                min: {
                    args: 1,
                    msg: minMaxError
                },
                max: {
                    args: 10,
                    msg: minMaxError
                },
            }
        },
        ease: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: `ease metric ${notNullErrorMsg}`,
                isInt: integerErrorMsg,
                min: {
                    args: 1,
                    msg: minMaxError
                },
                max: {
                    args: 10,
                    msg: minMaxError
                }
            }
        },
        impact: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: `impact metric ${notNullErrorMsg}`,
                isInt: integerErrorMsg,
                min: {
                    args: 1,
                    msg: minMaxError
                },
                max: {
                    args: 10,
                    msg: minMaxError
                }
            }
        },
        average: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: `metrics average ${notNullErrorMsg}`,
                isInt: invalidMetricsAverageError,
                min: {
                    args: 3,
                    msg: avgMinMaxError
                },
                max: {
                    args: 10,
                    msg: avgMinMaxError
                }
            }
        },
    }, {
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['userId', 'deletedAt']
        }]
    });

    Idea.beforeCreate(calcIdeaMetricsAvg);
    Idea.beforeUpdate(calcIdeaMetricsAvg);

    Idea.associate = function (models) {
        Idea.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        });
    };

    return Idea;
};