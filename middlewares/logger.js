'use strict';

// const lowdb = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');

const INFO = 'INFO';
const DEBUG = 'DEBUG';
const ERROR = 'ERROR';



const log = {};
log.info = (msg) => {
    console.log(`${new Date().toISOString()} [${INFO}] : ${msg}`);
}
log.error = (msg) => {
    console.log(`${new Date().toISOString()} [${ERROR}] : ${msg}`);
}
log.debug = (msg) => {
    console.log(`${new Date().toISOString()} [${DEBUG}] : ${msg}`);
}

module.exports = log;