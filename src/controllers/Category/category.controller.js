const { SuccessResponse ,CreatedResponse} = require("../../core/success.response");
const { AddCategory, getListCategory, deleteCategory, getCategory } = require("../../services/Products/category.service");

const HEADER = {
    CLIENT_ID: 'x-client-id',
};
class CategoryController {

    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }
    createCategory = async (req, res, next) => {
        this.setUserId(req);
        new CreatedResponse({
            message: 'AddCategory successfully',
            metadata: await AddCategory(req.body, this.userId)
        }).send(res)
    }
    getListCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'getListCategory successfully',
            metadata: await getListCategory()
        }).send(res)
    }
    getCategory = async (req, res, next) => {
        try {
             console.log("req.query ", req.query);
        new SuccessResponse({
            message: 'getListCategory successfully',
            metadata: await getCategory(req.query)
        }).send(res)
        } catch (error) {
            console.log("error ", error);
        }
      
    }
    deleteCategory = async (req, res, next) => {
       
        this.setUserId(req);
        new SuccessResponse({
            message: 'deleteCategory successfully',
            metadata: await deleteCategory(req.body, this.userId)
        }).send(res)
    }
}
module.exports = new CategoryController();