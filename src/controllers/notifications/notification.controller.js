// controllers/OrdersController.js

const { SuccessResponse, OkResponse } = require("../../core/success.response");
const { listNotiByUser, sendNotifications, getNotificationByShop } = require("../../services/notifications.service");
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
                metadata: await listNotiByUser( this.userId),
                options: {
                    limit: 10,
                }
            }).send(res)
       
        
    }

    sendNotiByShop = async (req, res, next) => {
        this.setUserId(req);

        new SuccessResponse({

            message: 'sendNotiByShop successfully',
            metadata: await sendNotifications(req.body,this.userId),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    getNotificationByShop = async (req, res, next) => {
        this.setUserId(req);

        new SuccessResponse({

            message: 'get Notification By Shop successfully',
            metadata: await getNotificationByShop( this.userId),
            options: {
                limit: 10,
            }
        }).send(res)


    }
} 
module.exports = new NotificationController();