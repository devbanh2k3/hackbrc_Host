import db from '../models/index';
var request = require('request');
import axios from '../services/axios';
var cookie = require('cookie');
import moment from 'moment/moment';
// let handleNewAccount = (data, io) => {
//     return new Promise(async (resolve, reject) => {
//         console.log(data);
//         try {

//             let userData = {};
//             //let isExist = await checkExitAccount(data.machinename + data.serialnumber + data.profilename);
//             let account = await db.allaccount.findOne({
//                 where: { key: data.machinename + data.serialnumber + data.profilename }
//             })
//             if (account) {
//                 //đưa vào database update
//                 await db.updateaccount.create({
//                     key: data.machinename + data.serialnumber + data.profilename,
//                     machinename: data.machinename,
//                     serialnumber: data.serialnumber,
//                     profilename: data.profilename,
//                     checkbm: data.checkbm,
//                     birthday: data.birthday,
//                     uid: data.uid,
//                     countaccount: data.countaccount,
//                     Ideal: data.Ideal,
//                     status: 'update',
//                     pickdate: data.pickdate,
//                     country: data.country,
//                     ip: data.ip,
//                     update: data.update,
//                 })

//                 account.set({
//                     update: account.dataValues.update + 1
//                 })

//                 await account.save();
//                 userData.errCode = 0;
//                 userData.message = 'update account succeed';
//                 io.emit('test', 'update account succeed');
//                 //tìm theo key và update thông số
//             }
//             else {
//                 await db.allaccount.create({
//                     key: data.machinename + data.serialnumber + data.profilename,
//                     machinename: data.machinename,
//                     serialnumber: data.serialnumber,
//                     profilename: data.profilename,
//                     checkbm: data.checkbm,
//                     birthday: data.birthday,
//                     uid: data.uid,
//                     countaccount: data.countaccount,
//                     Ideal: data.Ideal,
//                     status: 'New',
//                     pickdate: data.pickdate,
//                     country: data.country,
//                     ip: data.ip,
//                     update: data.update,
//                 })
//                 userData.errCode = 0;
//                 userData.message = 'create new account succeed';
//                 io.emit('test', 'create new account succeed');
//             }

//             resolve(userData);

//         } catch (e) {
//             reject(e);
//         }
//     })
// }
let checkExitAccount = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await db.allaccount.findOne({
                where: { key: key }
            })
            if (account) {
                resolve(account)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}




let getAllAccount = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            const page = parseInt(params.page, 10) || 1;
            const limit = parseInt(params.limit, 10) || 10;
            const offset = (page - 1) * limit;
            let dataAccount = await db.allaccount.findAndCountAll({
                limit: limit,
                offset: offset,
                raw: true,
                order: [
                    ['updatedAt', 'DESC'],
                    ['update', 'DESC'],

                ]
            });
            data.errCode = 0;
            data.message = "succeed";
            data.currentPage = page;
            data.totalPages = Math.ceil(dataAccount.count / limit),
                data.dataAccount = dataAccount;
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}
let FindTableAccount = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let dataAccount = await db.updateaccount.findOne({
                raw: true,
                where: { key: params.key }
            });
            data.errCode = 0;
            data.message = "succeed";
            data.currentPage = page;
            data.totalPages = Math.ceil(dataAccount.count / limit),
                data.dataAccount = dataAccount;
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}
let getAccountWhrer = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            const page = parseInt(params.page, 10) || 1;
            const limit = parseInt(params.limit, 10) || 10;
            const offset = (page - 1) * limit;
            let dataAccount = await db.updateaccount.findAndCountAll({
                limit: limit,
                offset: offset,
                raw: true,
                order: [
                    ['updatedAt', 'DESC'],
                ],
                where: { key: params.key }
            });
            data.errCode = 0;
            data.message = "succeed";
            data.currentPage = page;
            data.totalPages = Math.ceil(dataAccount.count / limit),
                data.dataAccount = dataAccount;

            let account = await db.allaccount.findOne({
                where: { key: params.key }
            })
            account.set({
                update: 0
            })
            await account.save();
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.allaccount.findOne({
                where: { key: userId }
            })
            if (user) {
                await user.destroy();
                resolve('done');
            }
            else {
                resolve('no done');
            }


        } catch (e) {
            reject(e);
        }
    })
}
let get_formula_data = (cookie, token, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            var options = {
                'method': 'POST',
                'url': 'https://www.hackbcr.com/get_formula_data',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': cookie,
                    'X-CSRF-TOKEN': token
                },
                form: {
                    'url': url
                }
            };
            request(options, async function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
                await resolve(response.body);
            });

            //resolve('no done');

        } catch (e) {
            reject(e);
        }
    })
}
let getresult = (url, end) => {

    return new Promise(async (resolve, reject) => {
        try {


            let data = await getToken();
            var options = {
                'method': 'POST',
                // /getresult
                'url': 'https://www.hackbcr.com/baccarat/' + end,
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'PostmanRuntime/7.31.3',
                    'Cookie': data.token.trim(),
                    'x-csrf-token': data.csrf.trim()
                },
                form: {
                    'url': url
                }
            };
            request(options, async function (error, response) {
                if (error) throw new Error(error);
                // console.log(response.body);
                // console.log(url, data.token, data.csrf)
                await resolve(response.body);
            });

            //resolve('no done');

        } catch (e) {
            reject(e);
        }
    })
}



let getToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            //kiểm tra token trên database
            try {
                let token = await db.tokendb.findOne(
                    {
                        where: { id: 1 }
                    }
                )
                if (token != null) {
                    let tokenCheck = token.token;
                    let someDate = cookie.parse(tokenCheck)
                    var dateToCompare = new Date(someDate.expires);
                    var currentDate = new Date();
                    // console.log(dateToCompare, "JJJJ", currentDate)
                    // if (dateToCompare.getTime() < currentDate.getTime()) {
                    //     console.log("đã trôi qua");
                    // }
                    // else {
                    //     console.log("chưa trôi qua");
                    // }


                    if (dateToCompare.getTime() > currentDate.getTime()) {
                        resolve(token);
                    }
                    else {
                        console.log('đã vào đây')
                        let datareponse = {};
                        let data = await axios.get('https://www.hackbcr.com');
                        //lấy token
                        let regexp = 'name="csrf-token" content="(.*?)"';
                        var r = data.match(regexp);
                        datareponse.token = r.count < 1 ? null : r[1];
                        //lấy cookie
                        let regexp1 = 'hackbcr_session(.*?)path=/;';
                        var r1 = data.match(regexp1);
                        datareponse.cookie = r1.count < 1 ? null : 'hackbcr_session' + r1[1];

                        token.token = datareponse.cookie;
                        token.csrf = datareponse.token;
                        await token.save();
                        let checklogin = await Check_login(token, token.csrf);
                        let token1 = await db.tokendb.findOne(
                            {
                                where: { id: 1 }
                            })
                        resolve(token1);

                        // resolve("hết hạn");
                    }

                }
                else {
                    // tiến hành lấy token mới 
                    resolve('no token');
                }
            } catch (e) {
                reject(e);
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getresult2 = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let datare = []
            let data = await axios.get('http://hackbcr.org/api/services/app/Table/GetTablesByLobbyId?lobbyId=2')
            let index = 1;
            data.result.forEach(element => {
                datare.push({ room_name1: element.name, room_name: index, b_data: element.resultsString })
                index++;
            });

            resolve(JSON.stringify(datare));

        } catch (e) {
            reject(e);
        }
    })
}

let Check_login = (token, csrf) => {
    return new Promise(async (resolve, reject) => {
        try {
            //let data = await getToken();
            var options = {
                'method': 'POST',
                'url': 'https://www.hackbcr.com/check_login',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'PostmanRuntime/7.31.3',
                    'Cookie': token,
                    'X-CSRF-TOKEN': csrf
                },
                form: {
                    'url': 'ag'
                }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                //console.log(response.body);
                resolve(response.body);
            });

            //resolve('no done');

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {

    // deleteUserById: deleteUserById,
    getToken: getToken,
    // getAllAccount: getAllAccount,
    // getAccountWhrer: getAccountWhrer,
    // get_formula_data: get_formula_data,
    getresult: getresult
}