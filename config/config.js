require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "mysql"
},
"test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
},
"production": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "mysql"
}
};