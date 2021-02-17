'use strict';

const router = require('express').Router();
const db = require('../controller/fileDB');
const dbService = require('../controller/databaseService');

/**
 * Create a new update.
 */
router.post('/create', (req, res) => {
    const taskRequest = req.body;
    const createdTask = dbService.addTaskToDB(taskRequest);
    res.status(200).json(createdTask);
    
});

const validateQueryDate = (req, res, next) => {
    if(req.query.date.length != 8)
    {
        res.status(400).json({msg:'Invalid date stamp format detected.'});
    } else {
        next();
    }
};

router.get('/', validateQueryDate, (req, res) => {
    const tasks = dbService.getTasks(req.query.date);
    if(tasks == null) {
        res.json({
            msg: "No tasks found in DB."
        });
    } else {
        const resposne = {};
        resposne[req.query.date] = tasks;
        res.json(resposne);
    }
});
router.post('/delete', (req, res) => {
    const id = req.body.id;
    const dateStamp = req.body.date;
    const deletedTask = dbService.deleteTasks(id, dateStamp);
    if(deletedTask !== undefined)
        res.status(200).json(deletedTask);
    else
        res.status(404).json({msg: "Task not found in DB."});
});
module.exports = router;