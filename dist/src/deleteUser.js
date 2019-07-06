"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
exports.deleteUser = function (id) {
    var index = data_1.users.reduce(function (acc, u, i) {
        if (u.uuid === id)
            acc = i;
        return acc;
    }, -1);
    console.log('index: ', index);
    if (index !== -1)
        data_1.users.splice(index, 1);
    return index !== -1;
};
