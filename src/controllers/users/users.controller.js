
const { Users } = require('../../models');

const createUser = async (req, res) => {
    try {
        console.log("emaiul:", req.body.email);
        // Check if the email already exists in the database
        const existingUser = await Users.findOne({ where: { email: req.body.email } });

        // If the email already exists, return an error
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        const user = await Users.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error('error:', error.message);
        res.status(400).send(error);
    }
};

module.exports = {
    createUser
};