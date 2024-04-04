// controllers/OrdersController.js

const { SuccessResponse, OkResponse } = require("../../core/success.response");
const { loginWithFacebook } = require("../../services/oauth.service");

class OauthController {

    loginWithFacebook = async (req, res) => {
        try {
            new SuccessResponse({
                message: 'loginWithFacebook successfully',
                metadata: await loginWithFacebook(req.body),
                options: {
                    limit: 10,
                }
            }).send(res)
        } catch (error) {
            console.log("error",error);
        }
        
    }
   
}
module.exports = new OauthController();