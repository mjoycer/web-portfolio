import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewNoteForm = () => {
    const [newNote, setNewNote] = useState();
    const currentUser = useSelector(state => state.currentUser);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleInput =(e) => {
        setNewNote(e.target.value);
    }

    let current = users.find(user => user.email === currentUser.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();

        axios.post('http://localhost:8000/notes' , {author: current._id, message: newNote}).then(res => {
                axios.get('http://localhost:8000/notes').then(res => {
                dispatch({type: 'SET_NOTES', payload: res.data});
            })}
        );
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <textarea onChange={(e) => handleInput(e)}/>
                <input type="submit" value="Post" />
            </form>
        </>
    )

}

export default NewNoteForm;