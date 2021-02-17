import React from 'react'
import {useStoreState} from 'easy-peasy';
import Task from './Task';

export default function TaskList() {
    const tasks = useStoreState(state => state.tasks);
    return (
        <>
          <div className="header-row">
              <div className="table-header">Task Estimate</div>
              <div className="table-header">Task Description</div>
          </div>
          {tasks.map(task => <Task key={task.id} task={task} />)}
        </>
    )
}
