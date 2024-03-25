
const { createClient } = require('redis');
const logs = require('../loggers/logs');

const redisClient = createClient({
    legacyMode: true,

    socket: {
        port: 6379,
        host: 'redis',
    },

});




module.exports = redisClient;
