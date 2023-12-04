const { Keytoken } = require('../models');

const KeyTokenService = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
        console.log(" userId", userId);
        let token = await Keytoken.findOne({ where: { userId } });

        if (token) {
            // Cập nhật bản ghi nếu nó đã tồn tại
            token.publicKey = publicKey;
            token.privateKey = privateKey;
            token.refreshToken = refreshToken;
            token.refreshTokenUsed = []; // Đặt lại mảng này nếu cần
            await token.save();
        } else {
            // Tạo bản ghi mới nếu không tìm thấy
            token = await Keytoken.create({
                userId,
                publicKey,
                privateKey,
                refreshToken,
            });
        }

        return token ? token.publicKey : null;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
};
const findByUserId = async (userId) => {
    return await Keytoken.findOne({ where: { userId } });
}
const removeKeyById = async (id) => {
    console.log("id::", id);
    return await Keytoken.destroy({ where: { id } });
}
module.exports = {
    KeyTokenService,
    findByUserId,
    removeKeyById
};