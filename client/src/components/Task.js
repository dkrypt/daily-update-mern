import React from 'react'
import {useStoreActions, useStoreState} from 'easy-peasy';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { AiFillDelete } from 'react-icons/ai';

const notification = {
    title: "Deleted!",
    message: "Task deleted.",
    type: "warning",
    insert: "top",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
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
}
export default function Task({task}) {
    // State variables.
    // Setters
    const deleteTask = useStoreActions(actions => actions.deleteTask);
    // Getters
    const dateString = useStoreState(state => state.dateString);
    /**
     * Handler function for on click event of deleting task
     * @param {String} id 
     */
    const deleteTaskFromBackend = (id) => {
        deleteTask(id);
        store.addNotification(notification);
        let body = {id, date: `${dateString}`}
        axios.post('/update/delete', body)
            .then(response => {
                if(response.data.msg === 'Task not found in DB.')
                    console.log('Error 404 Not able to find this task in DB');
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="task-list-row">
            <div className="estimate-cell">
                {task.estimate} Hrs.
            </div>
            <div className="task-row">
                <div className="task-cell">
                    {task.task}
                </div>
                <div className="delete-task" onClick={() => deleteTaskFromBackend(task.id)}>
                    <AiFillDelete />
                </div>
            </div>
        </div>
    )
}
