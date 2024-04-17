"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.customMessage || "Ocorreu um erro inesperado!";
    res.status(status).send({ error: message });
};
exports.errorHandler = errorHandler;
