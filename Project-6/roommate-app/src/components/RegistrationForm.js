import { useState } from "react";
import axios from 'axios';

const RegistrationForm = () => {

const [newUser, setNewUser] = useState();

    const handleInput = (e) => {
        const name = e.target.name;
        setNewUser({...newUser, [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/users/email-exists', {email: newUser.email}).then(res => {
            console.log(res.data);

           (!res.data) ? 
                axios.post('http://localhost:8000/users/register', newUser ).then(res => {
                    console.log(res.data);
                }) :
                console.log('Invalid');
        });
    }

    return(
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                Name: <input 
                type="text" 
                name="name" 
                required 
                onChange={(e) => handleInput(e)} />

                Email: <input 
                type="email" 
                name="email" 
                required 
                onChange={(e) => handleInput(e)} />

                Password: <input 
                type="password" 
                name="password" 
                required 
                onChange={(e) => handleInput(e)} />

                <input type="submit" name="submit"></input>
            </form>
        </div>
    );
}

export default RegistrationForm;