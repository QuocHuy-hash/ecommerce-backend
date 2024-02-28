'use strict'

const { Shops } = require("../models")

const findByEmail = async ({ email }) => {
    // Specify the attributes you want to retrieve
    const attributes = ['id', 'email', 'password', 'firstName', 'lastName', 'status', 'role'];
    // Use the attributes in the findOne query
    return await Shops.findOne({
        where: { email: email },
        attributes: attributes, // Only select the specified attributes
    });
}
const findById = async ({ shopId }) => {
    // Specify the attributes you want to retrieve
    const attributes = ['id', 'email',];
    // Use the attributes in the findOne query
    return await Shops.findOne({
        where: { id: shopId },
        attributes: attributes, // Only select the specified attributes
    });
}
module.exports = { findByEmail, findById }