const initalState = {
    id: '',
    token: ''
}

const userReducer = (state = initalState, action) => {
    switch(action.type) {
        case 'SET_USER': 
            return {
                user: action.user
            }
        default: 
            return state
    }
}

export default userReducer