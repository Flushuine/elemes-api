import redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

client.on('error', function(error) {
    console.error('Error encountered: ', error)
})

client.on('connect', function(error) {
    console.log('Redis connection established.')
})

export default client