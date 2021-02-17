import React, {useState} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import axios from 'axios';
import { store } from 'react-notifications-component';

const notification = {
    success: {
        title: 'Created',
        message: 'Task Created Successfully.',
        type: 'success',
        insert: 'top',
        container: 'bottom-left',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 3000,
            onScreen: true
        },
        slidingExit: {
            duration: 200,
            timingFunction: 'linear',
            delay: 0
        },
        slidingEnter: {
            duration: 200,
            timingFunction: 'ease-in',
            delay: 0
        }
    },
    emptyTaskDescription: {
        title: 'Empty Task Description.',
        message: 'Please enter a valid task description.',
        type: 'danger',
        insert: 'top',
        container: 'bottom-left',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 5000,
            onScreen: true
        },
        slidingExit: {
            duration: 200,
            timingFunction: 'linear',
            delay: 0
        },
        slidingEnter: {
            duration: 200,
            timingFunction: 'ease-in',
            delay: 0
        }
    },
    emtpyTaskEstimate : {
        title: 'Empty Task Estimate.',
        message: 'Please enter a valid task estimate.',
        type: 'danger',
        insert: 'top',
        container: 'bottom-left',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 5000,
            onScreen: true
        },
        slidingExit: {
            duration: 200,
            timingFunction: 'linear',
            delay: 0
        },
        slidingEnter: {
            duration: 200,
            timingFunction: 'ease-in',
            delay: 0
        }
    },
    apiError: (err) => { 
        return {
            title: 'API Error',
            message: `${err}`,
            type: 'danger',
            insert: 'top',
            container: 'bottom-left',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
                duration: 5000,
                onScreen: true
            },
            slidingExit: {
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            },
            slidingEnter: {
                duration: 200,
                timingFunction: 'ease-in',
                delay: 0
            }
        }
    }
}
export default function InputArea() {
    // State variables.
    // Setters
    const setTask = useStoreActions((actions) => actions.setTask);
    const setTaskEstimate = useStoreActions((actions) => actions.setTaskEstimate);
    const setSelectedDate = useStoreActions((actions) => actions.setSelectedDate);
    const setDateString = useStoreActions(actions => actions.setDateString);
    const setTasks = useStoreActions(actions => actions.setTasks);
    const clearTasks = useStoreActions(actions => actions.clearTasks);
    // Getters
    const task = useStoreState((state) => state.task);
    const selectedDate = useStoreState((state) => state.selectedDate);
    const taskEstimate = useStoreState((state) => state.taskEstimate);

    /**
     * On click handler function for submitting task.
     */
    const submitTask = () => {
        if(task=='') {
            store.addNotification(notification.emptyTaskDescription);
        } else if(taskEstimate == '') {
            store.addNotification(notification.emtpyTaskEstimate);
        } else {
            const reqPayload = {task, estimate: taskEstimate};
            axios.post(`/update/create`, reqPayload)
                .then(response => {
                    setTasks(response.data);
                    store.addNotification(notification.success);
                })
                .catch(err => {
                    window.alert(err);
                });
            setTask('');
            setTaskEstimate('');
        }
    }
    /**
     * Handler function for setting selected date.
     * @param {Object} e 
     */
    const setSelectedDateState = (e) => {
        const date = e.target.value;
        const fullYear = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        const dateStamp = `${day}${month}${fullYear}`;
        setSelectedDate(dateStamp);
        console.log(`Setting selectedDate = ${dateStamp}`);
    }
    /**
     * Handler function for getting Tasks for
     * selected date.
     */
    const getTasksForSelectedDate = () => {
        setDateString(selectedDate);
        axios.get(`/update/?date=${selectedDate}`)
            .then(resposne => {
                const tasks = resposne.data;
                console.log('This is response ='+JSON.stringify(tasks));
                clearTasks();
                if(tasks !== undefined)
                    tasks[`${selectedDate}`].forEach(task => {
                        task.date = selectedDate;
                        setTasks(task);
                    });
            })
            .catch(err => console.log(err));
    }
    /**
     * Utility method to get todays datestamp
     */
    const getDateStamp = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const year = date.getFullYear();
        return `${day}${month}${year}`;
    }
    /**
     * Handler function for getting today's tasks.
     */
    const getTodaysTasks = () => {
        const today = getDateStamp();
        setDateString(today);
        axios.get(`/update/?date=${today}`)
            .then(resposne => {
                const tasks = resposne.data;
                console.log('This is response ='+JSON.stringify(tasks));
                clearTasks();
                if(tasks !== undefined)
                    tasks[`${today}`].forEach(task => {
                        task.date = today;
                        setTasks(task);
                    });
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="canvas-container">
            <div className="canvas-card">
                <div className="heading">
                    <p>Add task</p>
                </div>
                <div className="bar">
                    <label className="form-label">Task Description</label>
                    <textarea value={task} name="task" rows="5" cols="40" onChange={(e) => setTask(e.target.value)}></textarea>
                </div>
                <div className="bar">
                    <label className="form-label">Task Estimate</label>
                    <div className="bar2">
                        <input value={taskEstimate} className="estimate-input" type="text" placeholder="Estimate in hours" onChange={(e) => setTaskEstimate(e.target.value)}></input>
                        <button onClick={submitTask}>Add Task</button>
                    </div>
                </div>
            </div>
            <div className="canvas-card card2">
                <div className="heading">
                    <p>Get tasks</p>
                </div>
                <div className="bar">
                    <label className="form-label">Select Date</label>
                    <div className="bar2">
                        <input className="calendar" data-date-inline-picker="false" data-date-open-on-focus="true" type="date" onSelect={setSelectedDateState}/>
                        <div className="gt-buttons">
                            <button className="b1" onClick={getTasksForSelectedDate}>Get Tasks</button>
                            <button className="b2" onClick={getTodaysTasks}>Get Todays Tasks</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
