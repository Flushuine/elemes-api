import redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

const client = redis.createClient({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
    password: process.env.REDISPASSWORD
})

client.on('error', function(error) {
    console.error('Error encountered: ', error)
})

client.on('connect', function(error) {
    console.log('Redis connection established.')
})

export default client