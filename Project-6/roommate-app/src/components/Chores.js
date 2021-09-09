import { useDispatch, useSelector } from "react-redux";

const Chores = () => {
    const chores = useSelector(state => state.chores);
    const users = useSelector(state => state.users);
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    console.log(currentUser._id);

    return (
        <div className="choresContainer">
            <h2>Chores</h2>
            { 
                chores.map(chore => {
                    let taggedUsers = users.filter(user => (chore.users.includes(user._id)));
                    if (chore.users.includes(currentUser._id)){
                    return (
                        <div className="choresContainer">
                            <h5>{chore.name}</h5>
                            {taggedUsers.map(user => <p>{user.name}</p>)}
                            <p>{chore.deadline}</p>
                            <p>{chore.status}</p>
                        </div>
                    )};
                })
            }
        </div>
    );
}

export default Chores;