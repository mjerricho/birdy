// how data looks before login
export const initialState ={
    user: null
};

// where we can push information to data layout
export const actionTypes ={ 
    SET_USER: "SET_USER",
};

const reducer =(state, action) => {
    console.log("reducer", action);
    // listen to action just dispatched 
    switch (action.type) {
        case actionTypes.SET_USER:
            //how we intend to change the data layout
            return {
                ...state, // keep everything else
                user: action.user
            };

        default:
            return state;
    }
}

export default reducer;