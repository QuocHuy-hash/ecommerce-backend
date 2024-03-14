
const { createClient } = require('redis');
const redisClient = createClient({
    url: 'redis://default:12345678@14.225.207.2:6379'

});

redisClient.on('error', err => console.log('Redis Client Error', err));

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.log('Redis connection error', err);
    }
})();

module.exports = redisClient;
