"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Counter = /** @class */ (function () {
    function Counter() {
        this.counter = 1;
    }
    Counter.prototype.increase = function () {
        this.counter++;
    };
    Counter.prototype.getCounter = function () {
        return this.counter;
    };
    return Counter;
}());
exports.counter = new Counter();
