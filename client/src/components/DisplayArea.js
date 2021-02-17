import React, {useEffect} from 'react';
import TaskList from './TaskList';
import axios from 'axios';
import {useStoreActions,useStoreState } from 'easy-peasy';
import NoTask from './NoTask';


/**
 * Utility method to get today's datestamp;
 */
const getDateStamp = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${day}${month}${year}`;
}
/**
 * Utility function for getting date object from datestamp.
 * @param {String} dateStamp 
 */
const getDate = (dateStamp) => {
    const stampArr = dateStamp.split('').map(c => parseInt(c));
    const date = new Date();
    date.setDate(`${stampArr[0]}${stampArr[1]}`);
    date.setMonth(`${stampArr[2]}${stampArr[3]}`);
    date.setFullYear(`${stampArr[4]}${stampArr[5]}${stampArr[6]}${stampArr[7]}`);
    return date;
}
export default function DisplayArea() {
    // State variables and actions.
    // Getters
    const tasks = useStoreState(state => state.tasks);
    const dateString = useStoreState(state => state.dateString);
    // Setters
    const setTasks = useStoreActions(actions => actions.setTasks);
    const clearTasks = useStoreActions(actions => actions.clearTasks);
    const setDateString = useStoreActions(actions => actions.setDateString);

    useEffect(() => {
        const today = getDateStamp();
        setDateString(today);
        axios.get(`/update/?date=${today}`)
            .then(response => {
                const allTasks = response.data[`${today}`];
                clearTasks();
                if(allTasks !== undefined)
                    allTasks.forEach(task => {
                        task.date = today;
                        setTasks(task);
                    });
            })
            .catch(err => window.alert(err));
    },[]);
    return (
        <div className="canvas-display">
            <div className="display-title">
                <p className="heading1">Tasks</p>
            </div>
            <div className="date-display">
                    <p className="heading2">Date: {getDate(dateString).toDateString()}</p>
            </div>
            <div className="task-list-container">
                {tasks.length > 0 ? <TaskList /> : <NoTask />}
            </div>
        </div>
    )
}
