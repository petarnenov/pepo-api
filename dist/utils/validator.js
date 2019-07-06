"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = function (user) {
    if (user.createdAt > new Date())
        throw Error("Imposible creation date");
    return true;
};
