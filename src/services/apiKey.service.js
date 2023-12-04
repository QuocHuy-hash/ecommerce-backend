'use strict'

const { ApiKeyModel } = require("../models")
const crypto = require('crypto')
const findByID = async (key) => {
    console.log("key :: ", key);
    const newKey = await ApiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });
    console.log("newKey :: ", newKey);
    const objectKey = ApiKeyModel.findOne({
        where: {
            key,
            status: true
        }
    });
    return objectKey;
};

module.exports = {
    findByID
}