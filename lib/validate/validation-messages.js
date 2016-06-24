"use strict";
function getValidationMessages(title, validation, color) {
    if (validation && validation.length) {
        validation.forEach(function (e, index) {
            console.log(color((index + 1) + ". " + title + ": \"" + e.name + "\" " + e.msg + ".\n        Example: " + e.example + "\n"));
        });
        return false;
    }
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getValidationMessages;
