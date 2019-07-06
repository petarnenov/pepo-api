"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var uuid_1 = require("uuid");
var addUser_1 = require("./addUser");
var getUser_1 = require("./getUser");
var getAllUsers_1 = require("./getAllUsers");
var deleteUser_1 = require("./deleteUser");
var deleteAllUsers_1 = require("./deleteAllUsers");
var user_1 = require("./user");
var winston_1 = require("winston");
var expressWinston = require("express-winston");
var counter_1 = require("./counter");
var data_1 = require("./data");
var app = express();
var router = express.Router();
var port = process.env.PEPO_API_PORT || 8888;
app.use(expressWinston.logger({
    format: winston_1.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston_1.transports.File({
            dirname: 'logs',
            filename: 'all.log',
            level: 'silly'
        })
        // new transports.File({
        // 	dirname: 'logs',
        // 	filename: 'combined.log',
        // 	level: 'info'
        // })
    ]
}));
exports.run = function () {
    router.all('*', function (req, res, next) {
        counter_1.counter.increase();
        console.log("request : " + counter_1.counter.getCounter());
        console.table(data_1.users);
        next();
    });
    //TODO: handle GET method
    router.get('/', function (req, res) {
        res.status(200);
        res.send({ data: 'Hello from pepo-api ;)' });
    });
    router.get('/main', function (req, res) {
        res.status(200);
        res.sendFile(path.join(__dirname + '/view/index1.html'));
    });
    //TODO: handle POST method
    router.post('/user', function (req, res) {
        console.info(req.body.createdAt);
        var user = new user_1.User(uuid_1.v1(), req.body.name, req.body.email, req.body.phoneNumbers, req.body.createdAt);
        if (addUser_1.addUser(user)) {
            res.status(200);
            res.send({ data: { uuid: user.uuid } });
        }
        else {
            res.status(500).send();
        }
    });
    router.get('/user/:id', function (req, res, next) {
        var id = req.params.id;
        if (id) {
            var user = getUser_1.getUser(id);
            if (user) {
                res.status(200);
                res.send({ data: user });
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    });
    router.delete('/user', function (req, res, next) {
        var id = req.body.uuid;
        if (id) {
            var isDeletedUser = deleteUser_1.deleteUser(id);
            if (isDeletedUser) {
                res.status(200);
                res.send({ data: isDeletedUser });
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    });
    router.get('/allUsers', function (req, res, next) {
        var allUsers = getAllUsers_1.getAllUsers();
        if (allUsers) {
            res.status(200);
            res.send({ data: allUsers });
        }
        else {
            next();
        }
    });
    router.delete('/allUsers', function (req, res, next) {
        var isDeletedAllUsers = deleteAllUsers_1.deleteAllUsers();
        if (isDeletedAllUsers) {
            res.status(200);
            res.send({
                data: data_1.users
            });
        }
        else {
            next();
        }
    });
    router.purge('/', function (req, res) {
        throw Error('error purging some mistakes');
    });
    //TODO: handle all others
    router.get('*', function (req, res) {
        res.status(404).send();
    });
    //Store all HTML files in view folder.
    app.use(express.static(__dirname + '/view'));
    app.use(express.json());
    app.use('/', router);
    app.listen(port, function () {
        console.log("Server runnig on port: " + port + "...");
    });
};
