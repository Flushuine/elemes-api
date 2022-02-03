import redis from 'ioredis'

const client = redis.createClient()

client.on('error', function(error) {
    console.error('Error encountered: ', error)
})

client.on('connect', function(error) {
    console.log('Redis connection established.')
})

export default client