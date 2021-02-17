'use strict';

const db = require('../controller/fileDB');
const { getDateStamp } = require('../utils');
const logger = require('../middlewares/logger');
const { v4: uuidv4 } = require('uuid');

const dbController = {};


dbController.addTaskToDB = (task) => {
    task.id = uuidv4();
    logger.info(`Adding task to file DB.`);
    if(db.has(getDateStamp()).value()) {
        db.get(getDateStamp()).push(task).write();
    } else {
        const today = {};
        today[getDateStamp()] = [];
        db.assign(today).write();
        db.get(getDateStamp()).push(task).write();
    }
    return task;
};
dbController.getTasks = (dateStamp) => {
    if(!db.has(dateStamp)) return null;
    return db.get(dateStamp).value();
}
dbController.deleteTasks = (id, dateStamp) => {
    if(!db.has(dateStamp)) return undefined;
    const deletedArr = db.get(dateStamp).remove(task => task.id == id).write();
    return deletedArr[0];
}
module.exports = dbController;