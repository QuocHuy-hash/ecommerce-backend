const nodemailer = require('nodemailer');
require('dotenv').config();
const { createClient } = require('redis');
const { BadRequestError } = require('../../core/error.response');
const { updateverifyShop } = require('../shop.service');
const redisClient = createClient({
    // console.log("connect redis success");
});

redisClient.on('error', err => console.log('Redis Client Error', err));
const sendMail = async (body) => {
    await redisClient.connect();
    try {
        const { to, subject, text } = body;
        let transporter = nodemailer.createTransport({
            host: "localhost:3055",
            port: 3055,
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        const otp = Math.floor(100000 + Math.random() * 900000);
        // Save the OTP
        await redisClient.set(to, otp);
        await redisClient.expire(to, 120);
        const mailOptions = {
            from: 'admin.ecommerce@gmail.com',
            to: to,
            subject: subject,
            text: `Input OTP [ ${otp} ]For Account ${text} Into Confirm Your Accoount  `,
        };
        let info = await transporter.sendMail(mailOptions);
        console.log("Send mail successfuly");
        return info;
    } catch (error) {
        console.log("error ::", error);
    } finally {
        await redisClient.quit();
    }
};
const verifyOtp = async (body) => {
    const { email, otp } = body;

    // Get the OTP from the store
    await redisClient.connect();
    const storedOtp = await redisClient.get(email);
    console.log(storedOtp);
    if (storedOtp && storedOtp === otp) {
        await updateverifyShop({ email, verify: 1 });
        redisClient.del(email); // Delete OTP after verification
        await redisClient.quit();
        return true;
    } else {
        await redisClient.quit();
        throw new BadRequestError("Invalid OTP");
    }

};
module.exports = { sendMail, verifyOtp }