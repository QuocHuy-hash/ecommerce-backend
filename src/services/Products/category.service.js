'use strict';

const { BadRequestError } = require('../../core/error.response');
const {  ProductsType, db , Shops } = require('../../models');
const { sequelize } = require('../../models/index');

const getListCategory = async () => {
    const listCategory = await ProductsType.findAll({
        attributes: ['id', 'type_name']
    });
    return listCategory;
}
const getCategory = async (query) => {
    const { id } = query;
    console.log("query ", id);
    const category = await ProductsType.findByPk(id);
    return category;
}
const AddCategory = async (body, userId) => {
    const { type_name } = body;
    const foundUser = await Shops.findByPk(userId);
    if (!foundUser || !foundUser.role.includes('ADMIN')) {
        throw new BadRequestError('User not authorized to add category');
    }
    const checkCategory = await ProductsType.findOne({where: {type_name: type_name}});
    if(checkCategory) {
        throw new BadRequestError('Category already exists');
    }
    const newCategory = await ProductsType.create({type_name : type_name});
    return newCategory;
}
const deleteCategory = async (body, userId) => {
    const { id } = body;
    console.log(body);
    const foundUser = await Shops.findByPk(userId);
    console.log(foundUser);
    if (!foundUser || !foundUser.role.includes('ADMIN')) {
        throw new BadRequestError('User not authorized to add category');
    }
    const deleteCategory = await ProductsType.destroy({ where: { id: id }});
    return deleteCategory;
}
module.exports = {
    getListCategory,
    AddCategory,
    deleteCategory,
    getCategory
}