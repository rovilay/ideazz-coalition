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
            type: Sequelize.STRING,
            allowNull: false,
        },
        ease: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        confidence: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        average: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
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
