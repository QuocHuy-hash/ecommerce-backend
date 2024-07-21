const express = require('express');
const router = express.Router();
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');
const uploadController = require('../../controllers/uploads/upload.controller');
const { uploadDisk } = require('../../config/multer.config');

//authenticationr
router.use(authentication) //require login
router.post('/products/multiple', uploadDisk.single('images'), asyncHandle(uploadController.uploadFromLocal));
router.post('/products/delete', asyncHandle(uploadController.deleteImage));
// router.post('/products/multiple', uploadDisk.array('files', 3), asyncHandle(uploadController.uploadFromLocal));


module.exports = router;
