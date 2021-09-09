import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Notes = () => {
    const notes = useSelector(state => state.notes);
    const users = useSelector(state => state.users);
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    
    const removeNote = (e) => {
        axios.delete(`http://localhost:8000/notes/${e.target.value}`).then(res => {
            axios.get('http://localhost:8000/notes').then(res => {
                dispatch({type: 'SET_NOTES', payload: res.data});
                console.log(res.data);
            });
        });
    }

    return (
        <>
            <h2>Notes</h2>
            {(notes.length > 0 && currentUser !== []) ?
                notes.map(note => {
                    let author = users.find(user => user._id === note.author);
                    let current = users.find(user => user.email === currentUser.email);
                    return (
                        <>
                            {(current._id === author._id || current.role === 'leader') ?
                                <button value={note._id} onClick={(e) => removeNote(e)}>Remove</button> : null}
                            <h3>{author.name}</h3>
                            <p>{note.message}</p>
                            <p>{note.createdAt}</p>
                        </>
                    );
                }) : <h2>No notes :)</h2>
            }
        </>
    );
}
export default Notes;