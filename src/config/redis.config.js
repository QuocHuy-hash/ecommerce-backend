
const { createClient } = require('redis');
const redisClient = createClient({
    host: '14.225.207.2',
    port: 6379,
});

redisClient.on('error', err => console.log('Redis Client Error', err));

module.exports = redisClient;