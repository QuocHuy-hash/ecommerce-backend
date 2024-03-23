
const { createClient } = require('redis');
const logs = require('../loggers/logs');
const path = require('path');
const redisClient = createClient({
    legacyMode: true,
    socket: {
        port: 6379,
        host: 'redis',
    }
    // url: 'redis://default:12345678@redis:6379'
});

redisClient.on('error', err => console.log('Redis Client Error', err),
    logs.error(path.basename(__filename), 'message:', { context: 'MyContext', requestId: '12345', })
);


(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.log('Redis connection error', err);
    }
})();

module.exports = redisClient;
