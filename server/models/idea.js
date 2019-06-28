import {
    isRequired,
    invalidMetricsAverageError,
    integerErrorMsg,
    minMaxError,
    avgMinMaxError,
    genericErrorMessage
} from '../helpers/defaults';
import { calcIdeaMetricsAvg } from '../helpers/utils';

module.exports = (sequelize, DataTypes) => {
    const Idea = sequelize.define('Idea', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: `idea's title ${isRequired}`
                },
                customValidator(value) {
                    if (!value) {
                        throw Error(`idea's title ${isRequired}`);
                    }
                }
            }
        },
        confidence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: `confidence metric ${isRequired}`
                },
                isInt: {
                    msg: `confidence ${integerErrorMsg}`
                },
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
                notNull: {
                    msg: `ease metric ${isRequired}`
                },
                isInt: {
                    msg: `ease ${integerErrorMsg}`
                },
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
                notNull: {
                    msg: `impact metric ${isRequired}`
                },
                isInt: {
                    msg: `impact ${integerErrorMsg}`
                },
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
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: {
                    msg: `${genericErrorMessage}. check your metrics rating`
                },
                isFloat: {
                    msg: invalidMetricsAverageError
                },
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
    }, {
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['UserId', 'deletedAt']
        }]
    });

    Idea.beforeValidate(calcIdeaMetricsAvg);
    // Idea.beforeUpdate(calcIdeaMetricsAvg);

    Idea.associate = function (models) {
        Idea.belongsTo(models.User, {
            foreignKey: 'UserId',
            targetKey: 'id',
        });
    };


    return Idea;
};
