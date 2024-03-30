
const { createClient } = require('redis');
const logs = require('../loggers/logs');

const redisClient = createClient({
    legacyMode: true,

    socket: {
        port: 6379,
        host: '127.0.0.1',
    },

});




module.exports = redisClient;
