'use strict'

const { verifyOtp, reSendMail } = require("../../services/sendMailer/send.mail.service");
const { SuccessResponse, OkResponse } = require("../../core/success.response");
class EmailController {
    verifyOtp = async (req, res, next) => {
        new SuccessResponse({
            message: 'verifyOtp Success',
            metadata: await verifyOtp(req.body,),
        }).send(res)

    }
    reSendMail = async (req, res, next) => {
        new SuccessResponse({
            message: 'reSend Mail Success',
            metadata: await reSendMail(req.body,),
        }).send(res)

    }
}

module.exports = new EmailController();