import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Notes from './components/Notes';
import { useDispatch, useSelector } from 'react-redux';
import Chores from './components/Chores';
import Bills from './components/Bills';
import NewNoteForm from './components/NewNoteForm';
import { Route, Router } from 'react-router';


const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  useEffect(() => {
    axios.get('http://localhost:8000/users').then(res => {
      console.log(res.data);
      dispatch({ type: 'SET_USERS', payload: res.data });
    });

    axios.get('http://localhost:8000/notes').then(res => {
      dispatch({ type: 'SET_NOTES', payload: res.data });
    });

    axios.get('http://localhost:8000/chores').then(res => {
      dispatch({ type: 'SET_CHORES', payload: res.data });
    });

    axios.get('http://localhost:8000/bills').then(res => {
      dispatch({ type: 'SET_BILLS', payload: res.data });
    });
  }, [currentUser]);



  return (

    <div className="App">
        {/* <RegistrationForm /> */}

        <Route path="/login" component={LoginForm} />
        <Route path="/notes" component={Notes} />

        {/* <NewNoteForm /> */}
        <Notes />
        <Chores />
        <Bills />
    </div>
  );
}

export default App;
