'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('course_categories', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			categoryName: {
				allowNull: false,
				type: Sequelize.STRING(25)
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('course_categories')
	}
}