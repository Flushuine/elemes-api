'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('roles', [
            {
                roleName: 'Admin'
            },
            {
                roleName: 'User'
            } 
        ])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('roles', null, {})
	}
};
