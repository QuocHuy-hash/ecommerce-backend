'use strict'

const { CreatedResponse, SuccessResponse } = require("../core/success.response");
const { AccessService, login, logout } = require("../services/access.service");
class AccessController {
    login = async (req, res, next) => {
        new SuccessResponse({
            message: 'login Success',
            metadata: await login(req.body),
        }).send(res)

    }
    logout = async (req, res, next) => {
        new SuccessResponse({
            metadata: await logout(res.keyStore),
        }).send(res)
    }
    signUp = async (req, res, next) => {

        new CreatedResponse({
            message: 'Register OK',
            metadata: await AccessService(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }
}
module.exports = new AccessController();