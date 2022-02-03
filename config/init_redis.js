import redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()

const client = redis.createClient({
    url: process.env.REDISURL
})

client.on('error', function(error) {
    console.error('Error encountered: ', error)
})

client.on('connect', function(error) {
    console.log('Redis connection established.')
})

export default client