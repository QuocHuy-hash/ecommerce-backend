const cloudinary = require('../../config/cloudinary.config');
const fs = require('fs');
const crypto = require('crypto');
// Function to generate a random ID
const generateRandomId = () => {
    return crypto.randomBytes(8).toString('hex');
};

//upload images
const uploadFromLocal = async (path, userId) => {
    const randomId = generateRandomId();
    const result = await cloudinary.uploader.upload(path, {
        folder: `shop-${userId}/products`,
        public_id: `thumbnail-${randomId}`,
        resource_type: 'image',
    });
    // Xóa file tạm sau khi upload lên Cloudinary
    fs.unlinkSync(path);
    return {
        image_url: result.secure_url,
        shopId: userId,
        thumb_url: await cloudinary.url(result.public_id, {
            height: 250,
            width: 250,
            crop: 'fill',
            quality: 'auto',
            format: 'jpg',
        })
    }
}

// delete image
const deleteImage = async (body, userId) => {
    const { publicId } = body;
    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
    });
    return result;

}

module.exports = { uploadFromLocal, deleteImage };