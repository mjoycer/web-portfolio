import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import TaskForm from './components/TaskForm';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  console.log(tasks);


  let doneTasks = tasks.filter((task) => task.status === "Done");
  let pendingTasks = tasks.filter((task) => task.status === "Pending");

  return (
    <div className="App">
      <h1>My To-do App</h1>
      <div className="container">
        <TaskForm />
        <div className="taskContainer">
          <h2>Pending</h2>
          {pendingTasks.length === 0 ?
            <p>No Pending Tasks</p>
            : pendingTasks.map(task => <li key={uuidv4()}>{task.name}<img src="https://image.flaticon.com/icons/png/512/148/148767.png" alt="Done" onClick={() => dispatch({ type: 'PENDING_TO_DONE', payload: task.id })} /><img src="https://image.flaticon.com/icons/png/512/148/148766.png" alt="Delete" onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })} /></li>)}
        </div>
        <div className="taskContainer">
          <h2>Done</h2>
          {doneTasks.length === 0 ?
            <p>No Done Tasks</p>
            : doneTasks.map(task => <li key={uuidv4()}>{task.name}<img src="https://image.flaticon.com/icons/png/512/148/148766.png" alt="Delete" onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })} /></li>)}
        </div>
      </div>
    </div>
  );
}

export default App;
