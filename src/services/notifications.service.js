const { Pushnotification, Sequelize } = require('../models');

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
module.exports = {
    createNotiMessage,
    listNotiByUser
}


