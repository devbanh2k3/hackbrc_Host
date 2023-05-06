import ApiService from '../services/ApiService';

let newAccount = async (req, res) => {
    const io = res.io;

    let DataAccount = await ApiService.handleNewAccount(req.body, io)
    return res.status(200).json({
        errCode: DataAccount.errCode,
        message: DataAccount.message,
    })
}
let getAccount = async (req, res) => {
    let DataAccount = await ApiService.getAllAccount(req.params)
    return res.status(200).json({
        errCode: DataAccount.errCode,
        message: DataAccount.message,
        currentPage: DataAccount.currentPage,
        totalPages: DataAccount.totalPages,
        data: DataAccount.dataAccount
    })
}

let getAccountKey = async (req, res) => {
    //key
    let DataAccount = await ApiService.getAccountWhrer(req.params)
    return res.status(200).json({
        errCode: DataAccount.errCode,
        message: DataAccount.message,
        currentPage: DataAccount.currentPage,
        totalPages: DataAccount.totalPages,
        data: DataAccount.dataAccount
    })
}
// tạo api phân trang
let deleteaccount = async (req, res) => {
    console.log(req.params);
    let DataAccount = await ApiService.deleteUserById(req.params.key)
    return res.status(200).json({

        message: DataAccount

    })


}


let get_formula_data = async (req, res) => {
    let DataAccount = await ApiService.getToken()
    return res.status(200).send(DataAccount)


}

let getresult = async (req, res) => {
    let DataAccount = await ApiService.getresult(req.query.url, req.query.end)
    return res.status(200).send(DataAccount)
}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
let check_key = async (req, res) => {
    let check_key = await ApiService.check_key(req.query.key)
    sleep(4000).then(() => {
        // Do something after the sleep!
        return res.status(200).send(check_key)
    });

}
module.exports = {
    check_key: check_key,
    getresult: getresult,
    deleteaccount: deleteaccount,
    getAccountKey: getAccountKey,
    newAccount: newAccount,
    getAccount: getAccount,
    get_formula_data: get_formula_data,
}