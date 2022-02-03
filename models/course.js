import Sequelize from 'sequelize'
const { DataTypes } = Sequelize
import db from '../config/database.js'

const Course = db.define('course', {
	courseCategoryId: {
		type: DataTypes.INTEGER
	},
	courseName: {
		type: DataTypes.STRING(70)
	},
	courseDescription: {
		type: DataTypes.TEXT
	},
	coursePrice: {
		type: DataTypes.FLOAT
	},
	sold: {
		type: DataTypes.INTEGER
	},
	createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
})

export default Course