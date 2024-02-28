// controllers/OrdersController.js

const { SuccessResponse, OkResponse } = require("../../core/success.response");
const { listNotiByUser } = require("../../services/notifications.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class NotificationController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }


    listNotiByUser = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({

            message: 'listNotiByUser successfully',
            metadata: await listNotiByUser(req.body, this.userId),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}
module.exports = new NotificationController();