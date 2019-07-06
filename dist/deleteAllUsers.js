"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
exports.deleteAllUsers = function () {
    data_1.users.splice(0, data_1.users.length);
    return data_1.users.length === 0;
};
