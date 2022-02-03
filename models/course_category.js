import Sequelize from 'sequelize'
const { DataTypes } = Sequelize
import db from '../config/database.js'

const courseCategory = db.define('course_category', {
	categoryName: {
		unique: true,
		type: DataTypes.STRING(25)
	}
}, {
	timestamps: false
})

export default courseCategory