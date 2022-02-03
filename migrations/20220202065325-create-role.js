'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('roles', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			roleName: {
				allowNull: false,
				type: Sequelize.STRING(20)
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('roles')
	}
}