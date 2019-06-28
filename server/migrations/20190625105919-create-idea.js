/* eslint no-unused-vars:0 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Ideas', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        impact: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ease: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        confidence: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        average: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        UserId: {
            type: Sequelize.INTEGER,
            onDelete: 'set null',
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
        }
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Ideas')
};
