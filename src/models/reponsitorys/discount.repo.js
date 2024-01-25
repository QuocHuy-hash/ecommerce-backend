const findAllDiscount = async ({
    limit = 50, page = 1, attributes, model, where
}) => {
    const skip = (page - 1) * limit;
    const response = await model.find(where).skip(skip).limit(limit).attributes(attributes);
    return response;
}
const checkDiscountExists = async (model, where) => {
    return await model.findOne(where)
}
module.exports = {
    findAllDiscount,
    checkDiscountExists
}
