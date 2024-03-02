const cloudinary = require('../../config/cloudinary.config');

//upload images
const uploadFromLocal = async (path, userId) => {
    const result = await cloudinary.uploader.upload(path, {
        folder: `shop-${userId}/products`,
        public_id: 'thumbnail',
        resource_type: 'image',
    });
    return {
        image_url: result.secure_url,
        shopId: userId,
        thumb_url: await cloudinary.url(result.public_id, {
            height: 100,
            width: 150,
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