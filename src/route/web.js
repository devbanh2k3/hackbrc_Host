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

    //     P6XDJ-74DGX-DKY4Q-G4Y7D-R3FP7
    // 4DYTK-86XKM-CRWKB-QVG9J-G3PPY
    // GDKNP-MPXX6-QTVBT-Q36W7-8HR36

    router.get('/get_formula_data', apiController.get_formula_data);
    router.get('/getresult', apiController.getresult);

    router.get('/check_key', apiController.check_key);
    return app.use("/", router);
}
module.exports = initWebRoutes;