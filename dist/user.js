"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(uuid, name, email, phoneNumbers, createdAt) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phoneNumbers = Array.from(phoneNumbers);
        this.createdAt = new Date(+createdAt * 1000);
    }
    return User;
}());
exports.User = User;
