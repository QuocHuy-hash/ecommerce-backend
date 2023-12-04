'use strict'
const { Shops } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const { KeyTokenService, removeKeyById } = require('./key.token.service');
const { createTokenPair } = require('../auth/authUtil');
const { getInfoData } = require('../utils');
const { BadRequestError } = require('../core/error.response');
const { findByEmail } = require('./shop.service');

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

/*
       1 - check email in dbs
       2 - match password
       3 - create AT vs RT and save
       4 - generate tokens
       5 - get data return login
   */
const login = async ({ email, password, refreshToken = null }) => {
    //1.
    console.log(" email 111");

    const foundShop = await findByEmail({ email });
    console.log(" foundShop ", foundShop);
    if (!foundShop) {
        throw new BadRequestError('Shop not registed');
    }
    //2.
    const match = await bcrypt.compare(password, foundShop.password);
    if (!match) {
        throw new AuthFailureError('Authentication error');
    }
    console.log("match", match);

    //3.
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');

    //4.
    const tokens = await createTokenPair({ userId: foundShop.id, email }, publicKey, privateKey);

    await KeyTokenService({
        userId: foundShop.id,
        refreshToken: tokens.refreshToken,
        privateKey, publicKey
    })
    return {
        shop: getInfoData({ filled: ['id', 'name', 'email'], object: foundShop }),
        tokens
    }
}
const AccessService = async (shop) => {
    const { email, password, firstName, lastName, role } = shop;

    const passwordHash = await bcrypt.hash(password, 10);

    // Check if the email already exists in the database
    const existingUser = await Shops.findOne({ where: { email: email } });

    // If the email already exists, return an error
    if (existingUser) {
        throw new BadRequestError('Error : Shop already register');
    }
    const newShop = await Shops.create({
        email, password: passwordHash, firstName, lastName, role: [RoleShop.ADMIN, RoleShop.SHOP]
    });
    if (newShop) {
        //create publicKey and Private Key
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //     modulusLength: 4096,
        //     publicKeyEncoding: {
        //         type: 'pkcs1',
        //         format: 'pem'
        //     },
        //     privateKeyEncoding: {
        //         type: 'pkcs1',
        //         format: 'pem'
        //     }
        // })
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService({
            userId: newShop.id,
            publicKey,
            privateKey,
            refreshToken: '111'
        });
        console.log(" keyStore", keyStore);
        if (!keyStore) {
            console.log(" keyStore error");
            return;
        }

        const tokens = await createTokenPair({ userId: newShop.id, email }, publicKey, privateKey);
        console.log("create token success", tokens);

        return {
            code: '201',
            metadata: {
                shop: getInfoData({ fileds: ['id', 'email'], object: newShop }),
                tokens
            }
        }
    }
    console.log(" null");

};

const logout = async (keyStore) => {
    const id = keyStore.id;
    const deleteKey = await removeKeyById(id);
    console.log({ deleteKey });
    return deleteKey;
}
module.exports = {
    AccessService,
    login,
    logout
}