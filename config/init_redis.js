import redis from 'ioredis'

const client = redis.createClient({
    url: 'redis-11451.c1.asia-northeast1-1.gce.cloud.redislabs.com:11451'
})

client.on('error', function(error) {
    console.error('Error encountered: ', error)
})

client.on('connect', function(error) {
    console.log('Redis connection established.')
})

export default client