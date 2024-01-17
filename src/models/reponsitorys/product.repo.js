
const createProduct = async (data) => {
    console.log({ data });
    const where = { where: { product_id: productID } }
    const existing = await ModelClass.findOne(where);
    if (existing) {
        return await ModelClass.update(data, where);
    }
    return await ModelClass.create(data);
}

module.exports = { createProduct };
