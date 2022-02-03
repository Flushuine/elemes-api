import Sequelize from 'sequelize'
const { DataTypes } = Sequelize
import db from '../config/database.js'

const Role = db.define('role', {
	roleName: {
		type: DataTypes.STRING(20),
        unique: true
	}
}, {
    timestamps: false
})

export default Role