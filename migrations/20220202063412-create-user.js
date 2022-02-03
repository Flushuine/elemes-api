'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		roleId: {
			allowNull: false,
			type: Sequelize.INTEGER
		},
		fullName: {
			allowNull: false,
			type: Sequelize.STRING(50)
		},
		email: {
			allowNull: false,
			type: Sequelize.STRING(25)
		},
		password: {
			allowNull: false,
			type: Sequelize.STRING(255)
		},
		activeFlag: {
			type: Sequelize.BOOLEAN
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
		await queryInterface.dropTable('users')
	}
}