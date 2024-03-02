// //redis check order
const redisClient = require('../config/redis.config');
const { promisify } = require('util');
const { reservationInventory } = require('../models/reponsitorys/eventorys.repo');


// promisify(redisClient.connect());

const acquireLock = async (productId, quantity) => {

    await redisClient.connect();

    const key = `lock_v2024_${productId}`;
    const retryTimes = 10;
    const expireTime = 10;
    for (let i = 0; i < retryTimes; i++) {
        const result = await redisClient.set(key, expireTime);
        console.log("result :: ", result);
        if (result === 'OK') {
            // Thực hiện các thao tác với inventory
            const isReservation = await reservationInventory(productId, quantity);
            console.log("isReservation : ", isReservation);
            if (isReservation) {
                await redisClient.expire(key, expireTime);
                return key;
            }
            return null;
        } else {
            await new Promise((resolve) => {
                setTimeout(resolve, 50)
            });
        }
    }

}

const releaseLock = async (keyLock) => {
    try {
        if (!keyLock) {
            throw new Error("Missing keyLock argument");
        }

        const result = await redisClient.del(keyLock);
        if (result !== 1) {
            console.error(`Error releasing lock for key '${keyLock}' (result: ${result})`);
        }
    } catch (error) {
        console.error("Error releasing lock:", error);
        throw error;
    } finally {
        await redisClient.quit();
    }
}

module.exports = {
    acquireLock,
    releaseLock
}
