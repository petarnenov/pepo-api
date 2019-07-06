"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
exports.addUser = function (user) {
    try {
        data_1.users.push(user);
        return true;
    }
    catch (err) {
        return false;
    }
};
