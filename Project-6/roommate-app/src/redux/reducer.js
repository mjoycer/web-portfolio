const initialState = {
    users: [],
    notes: [],
    chores: [],
    bills: [],
    currentUser: [],
    loggedInUser: localStorage.getItem('token') ? { token: localStorage.getItem('token') } : {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return{...state, currentUser: action.payload}
        case 'LOGIN':
            localStorage.setItem('token', action.payload);
            return{...state, loggedInUser: {token: action.payload} }
        case 'SET_USERS':
            return{...state, users: action.payload};
        case 'SET_NOTES':
            return{...state, notes: action.payload};
        case 'SET_CHORES':
            return{...state, chores: action.payload};
        case 'SET_BILLS':
            return{...state, bills: action.payload};
        default:
            return(state);
    };
};

export default reducer;