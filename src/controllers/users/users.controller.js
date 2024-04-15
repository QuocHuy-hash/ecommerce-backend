'use strict'

const { CreatedResponse, SuccessResponse } = require("../../core/success.response");
const { follow_shop, getListFollowerForshop, getListFollowerForUser } = require("../../services/user.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class UsersController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }

    handleFollow = async (req, res, next) => {
        this.setUserId(req);
        const { shopId } = req.body;
        new CreatedResponse({
            message: 'refreshToken Success',
            metadata: await follow_shop(this.userId, shopId),
        }).send(res)

    }
    getListFollowerForshop = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'refreshToken Success',
            metadata: await getListFollowerForshop(this.userId),
        }).send(res)

    }
    getListFollowerForUser = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'refreshToken Success',
            metadata: await getListFollowerForUser(this.userId),
        }).send(res)

    }
}

module.exports = new UsersController();