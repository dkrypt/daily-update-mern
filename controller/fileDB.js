'use strict';

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/updates.json');
const db = lowdb(adapter);

// Write defaults.
db.defaults({}).write();


module.exports = db;