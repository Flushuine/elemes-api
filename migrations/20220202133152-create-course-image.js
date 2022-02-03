'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('course_images', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			courseId: {
				type: Sequelize.INTEGER
			},
			courseImage: {
				type: Sequelize.TEXT
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('course_images')
	}
}