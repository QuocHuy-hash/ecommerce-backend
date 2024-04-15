const { Pushnotification, Sequelize, Followers, Products } = require('../models');
const { Op } = require('sequelize');

const { BadRequestError, NotFoundError } = require('../core/error.response');

const TypeNoti = {
    ADD: 'ADD_PRODUCT_SHOP',
    VOUCHER: 'PROMOTION'

}
const createNotiMessage = async (body) => {
    const { type, receivedId, senderId, product_name, product_shop } = body;
    console.log({ body });
    let noti_content;
    if (type == 'ADD_PRODUCT_SHOP') {
        noti_content = `Shop- ${product_shop} vừa thêm 1 sản phẩm mới: ${product_name}`
    } else if (type == "PROMOTION") {
        noti_content = `Shop- ${product_shop} vừa thêm 1 VOUCHER mới: ${product_name}`
    }
    const newNoti = new Pushnotification({
        noti_type: type,
        noti_content: noti_content,
        noti_senderId: senderId,
        noti_receivedId: receivedId,
        noti_product_name: product_name,
        noti_shop_name: product_shop
    });
    return newNoti.save();
}

const listNotiByUser = async (body, userId) => {
    const type = 'ALL';
    const isRead = 0;
    const match = { noti_receivedId: userId };

    if (type !== 'ALL') {
        match['noti_type'] = type;
    }
    const userNotifications = await Pushnotification.findAll({
        where: {
            noti_receivedId: { [Sequelize.Op.in]: [userId] }
        },
    });

    console.log(userNotifications);
    return userNotifications;
}
const sendNotifications = async (body, shopId) => {
    const { type } = body;
    const message = await Pushnotification.findOne({
        where: { noti_type: type, status: 0, noti_senderId: shopId }
    });

    if (!message) {
        throw new NotFoundError("No message found or message already sent");
    }

    const followers = await Followers.findAll({
        where: {
            shopId: shopId,
            ...(type === TypeNoti.VOUCHER && { actions: ['like', 'buy', 'comment'] }),
        },
    });

    const notificationPromises = followers.map(follower => ({
        type: message.noti_type,
        senderId: shopId,
        product_name: message.noti_product_name,
        noti_content: message.noti_content,
        product_shop: message.noti_shop_name,
        receivedId: follower.userId,
    }));

    console.log(`Notifications sent for ${type}`);

    await Promise.all([
        Pushnotification.update({ status: 1 }, { where: { id: message.id } }),
        ...notificationPromises.map(notification => Pushnotification.create(notification))
    ]);

    return notificationPromises;
};
const getNotificationByShop = async (userId) => {

    if (!userId) {
        throw new BadRequestError("Invalid Shop Id");
    }
    const notification = await Pushnotification.findAll({ where: { noti_senderId: userId } });
    return notification;
}
module.exports = {
    createNotiMessage,
    listNotiByUser,
    sendNotifications,
    getNotificationByShop
}


