import Sequelize from 'sequelize'
const { DataTypes } = Sequelize
import db from '../config/database.js'

const User = db.define('user', {
    roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2
    },
    fullName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
		type: DataTypes.STRING(25),
		allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    activeFlag: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
})

export default User