const initalState = {
    requests: []
}

const serviceRequestReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_SERVICE_REQUESTS': {
            return {
                requests: [...action.requests]
            }
        }
        case 'UPDATE_SERVICE_REQUEST': {
            const requests = state.requests.filter((request) => request._id !== action.request._id)
            requests.push(action.request)
            return {
                requests
            }
        }
        default:
            return state
    }
}

export default serviceRequestReducer