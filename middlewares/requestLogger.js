'use strict';

module.exports = (req, res, next) => {
    const date = new Date();
    console.log(`[HTTP_REQUEST_INCOMING] ${date.toLocaleString()} : Recieved request from HOST = ${req.hostname}, URL = ${req.url}, METHOD = ${req.method}, HTTPv = ${req.httpVersion}`);
    next();
}