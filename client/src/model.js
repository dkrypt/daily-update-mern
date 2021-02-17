import { action } from 'easy-peasy';

export default {
    tasks: [],
    task: "",
    dateString: "",
    selectedDate: "",
    taskEstimate: "",
    setTask: action((state, task) => {
        state.task = task;
    }),
    setDateString: action((state, dateString) => {
        state.dateString = dateString;
    }),
    setSelectedDate: action((state, date) => {
        state.selectedDate = date;
    }),
    setTaskEstimate: action((state, taskEstimate) => {
        state.taskEstimate = taskEstimate;
    }),
    setTasks: action((state, task) => {
        state.tasks.push(task);
    }),
    deleteTask: action((state, id) => {
        console.log('Deleting');
        state.tasks = state.tasks.filter((v) => v.id != id);
    }),
    clearTasks: action((state) => {
        state.tasks = [];
    })
}