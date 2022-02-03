import Sequelize from 'sequelize'
const { DataTypes } = Sequelize
import db from '../config/database.js'

const courseImage = db.define('course_image', {
	courseId: {
		type: DataTypes.INTEGER
	},
	courseImage: {
		type: DataTypes.TEXT
	}
}, {
	timestamps: false
})

export default courseImage