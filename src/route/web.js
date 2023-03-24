import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import apiController from "../controllers/apiController";
let router = express.Router();

let initWebRoutes = (app) => {

    // router.post('/api/new-account', apiController.newAccount);
    // router.get('/records/:page/:limit', apiController.getAccount);
    // router.get('/records-update/:page/:limit/:key', apiController.getAccountKey);
    // router.get('/delete/:key', apiController.deleteaccount);


    router.get('/get_formula_data', apiController.get_formula_data);
    router.get('/getresult', apiController.getresult);
    return app.use("/", router);
}
module.exports = initWebRoutes;