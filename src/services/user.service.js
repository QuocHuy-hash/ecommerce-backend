
const { BadRequestError } = require("../core/error.response");
const {  Followers ,Shops} = require("../models")

const follow_shop = async (userId, shopId) => {
    if (!userId || !shopId) {
        throw new BadRequestError("Invalid user or shop ID");
    }
    const shop = await Shops.findOne({ where: { id: shopId } });
    if (!shop) {
        throw new BadRequestError("Shop not found");
    }
    const existingFollow = await Followers.findOne({ where: { shopId, userId } });
    if (existingFollow) {
        throw new BadRequestError("You have already followed this shop");
    }
    const role = shop.role;
    let isShop = false;
    for (let i = 0; i < role.length; i++) {
        if (role[i] == "SHOP") {
            isShop = true;
            break;
        }
    }
if (!isShop) {
        throw new BadRequestError("You can only follow a shop");
    }    
    const follow = await Followers.create({ shopId, userId });
    return follow;
};
const getListFollowerForshop = async (userId) => {
    if (!userId) {
        throw new BadRequestError("Invalid shop ID");
    }

    const followers_ = await Followers.findAll({
        where: { shopId: userId }
    });

    const followersWithUsers = await Promise.all(followers_.map(async (follower) => {
        const user = await Shops.findOne({ where: { id: follower.userId } });
        if (user) {
            return {
                ...follower.dataValues,
                user: user
            };
        }
        return null;
    }));

    return followersWithUsers.filter(Boolean); // Lọc bỏ các giá trị null
}

const getListFollowerForUser = async (userId) => {
    if (!userId) {
        throw new BadRequestError("Invalid shop ID");
    }
    const followers = await Followers.findAll({
        where: { userId: userId },
        include: [
            { model: Shops, as: 'shops', attributes: ["firstName", "lastName", "email"] },
        ],
    }
    );
    return followers;

}
module.exports = { follow_shop, getListFollowerForshop, getListFollowerForUser }