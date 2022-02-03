import dotenv from 'dotenv'
import Sequelize from 'sequelize'
dotenv.config()

const conn = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_NAME,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
)

export default conn