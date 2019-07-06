"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
exports.getUser = function (id) {
    var filteredUsers = data_1.users.filter(function (u) { return u.uuid === id; });
    var user = filteredUsers ? filteredUsers[0] : null;
    return user;
};
