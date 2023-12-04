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

module.exports = { findByEmail }