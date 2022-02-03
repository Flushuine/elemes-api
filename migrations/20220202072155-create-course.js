'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('courses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			courseCategoryId: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			courseName: {
				allowNull: false,
				type: Sequelize.STRING(70)
			},
			courseDescription: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			coursePrice: {
				allowNull: false,
				type: Sequelize.FLOAT
			},
			sold: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('courses')
	}
}