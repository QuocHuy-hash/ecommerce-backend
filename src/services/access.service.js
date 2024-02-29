'use strict'
const { Shops } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const { KeyTokenService, removeKeyById, findByRefreshTokenUsed, updateRefreshToken } = require('./key.token.service');
const { createTokenPair, verifyJWT } = require('../auth/authUtil');
const { getInfoData } = require('../utils');
const { BadRequestError } = require('../core/error.response');
const { findByEmail } = require('./shop.service');
const { loginSuccess, setAuthorizationHeaders } = require('../auth/checkAuth');
const { sendMail } = require('./sendMailer/send.mail.service');

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
    USER: 'USER'
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

    const foundShop = await findByEmail({ email });

    if (!foundShop) {
        throw new BadRequestError('Shop not registed');
    }
    if (!foundShop.verify) throw new BadRequestError('Shop is not verify account')
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
    });
    //Send Mail

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
        email, password: passwordHash, firstName, lastName, role: [RoleShop.USER]
    });
    if (newShop) {

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService({
            userId: newShop.id,
            publicKey,
            privateKey,
            refreshToken: '111'
        });
        if (!keyStore) {
            return;
        }
        const tokens = await createTokenPair({ userId: newShop.id, email }, publicKey, privateKey);
        const subject = 'Verify Your Account'
        sendMail({ to: email, subject, text: email })
        return {
            code: '201',
            metadata: {
                shop: getInfoData({ fileds: ['id', 'email'], object: newShop }),
                tokens
            }
        }
    }

};

const logout = async (keyStore) => {
    const id = keyStore.id;
    const deleteKey = await removeKeyById(id);
    console.log({ deleteKey });
    return deleteKey;
}

const handleRefreshToken = async (refreshToken) => {

    /* 
        check this token used
    */
    console.log("refreshToken", refreshToken);

    const foundToken = await findByRefreshTokenUsed(refreshToken);
    console.log("foundToken", foundToken);
    //neu co
    if (foundToken) {
        // decode xem may la thang nao?
        const { userId, email } = await verifyJWT(refreshToken, foundToken.privateKey);
        console.log({ userId, email });
        // xoa tat ca token trong keyStore
        await KeyTokenService.removeKeyById(userId);
        throw new ForbidenError('Something wrong happend !! please relogin');
    }

    // NO
    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) {
        throw new AuthFailureError('Shop not registed ');
    }

    // verify token
    const { userId, email } = await verifyJWT(refreshToken, holderToken.privateKey);
    // check user id
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
        throw new AuthFailureError('Shop not registed 2');
    }

    //create 1 cap token moi
    const tokens = await createTokenPair({ userId, email }, holderToken.publicKey, holderToken.privateKey);

    console.log('check holderToken', holderToken)

    await updateRefreshToken(tokens.refreshToken, refreshToken);



    return {
        user: { userId, email },
        tokens
    }
}
module.exports = {
    AccessService,
    login,
    logout,
    handleRefreshToken
}