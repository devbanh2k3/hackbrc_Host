import express from "express";
// const socketio = require('socket.io');
const http = require('http');
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/conectDB';
import cors from 'cors';

require('dotenv').config();   // giup chayj dc dong process.env
process.env.TZ = "Asia/Tehran";

let app = express();
const server = http.createServer(app);
// const io = socketio(server, {
//     cors: {
//         origin: '*',
//     }
// });
// app.use((req, res, next) => {
//     res.io = io;
//     next()
// })

app.use(cors({ origin: '*' }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();



let port = process.env.PORT || 8900;  //Port === undefined => Port = 6060

server.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port);
})