import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const LoginForm = () => {
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleInput = (e) => {
        const name = e.target.name;

        setUser({...user, [name]: e.target.value});
    }

    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/users/login', user).then(res => {
                dispatch({type: 'LOGIN', payload: res.data.auth});
                dispatch({type: 'SET_CURRENT_USER', payload: res.data.data});
                console.log(res.data.data);
                history.push('/');
        });
    }

    console.log(user);

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit ={handleSubmit}>
                Email: 
                <input 
                type="email" 
                name="email" 
                onChange={(e) => handleInput(e)} 
                required />
                Password: 
                <input 
                type="password" 
                name="password" 
                onChange={(e) => handleInput(e)} 
                required />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default LoginForm;