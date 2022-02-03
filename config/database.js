import dotenv from 'dotenv'
import Sequelize from 'sequelize'

dotenv.config()

const conn = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        dialect: 'mysql'
    }
)

export default conn