import { v4 as uuidv4 } from 'uuid';

const inititalState = {
    tasks: [
        { id: uuidv4(), name: "Watch Video", status: "Done" },
        { id: uuidv4(), name: "Code Along", status: "Pending" },
        { id: uuidv4(), name: "Take a bath", status: "Pending" }
    ]
};

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            let newTask = [];
                newTask = { id: uuidv4(), name: action.payload, status: "Pending" };
            return { ...state, tasks: [...state.tasks, newTask] }
        case 'DELETE_TASK':
            let updatedList = state.tasks.filter(task => task.id !== action.payload)
            return {...state, tasks: updatedList}
        case 'PENDING_TO_DONE':
            let newTaskList = state.tasks.map((task) => { if (task.id === action.payload) task.status = "Done"; return task; })
            return{...state, tasks: newTaskList}
        default:
            return (state);
    }
}

export default reducer;