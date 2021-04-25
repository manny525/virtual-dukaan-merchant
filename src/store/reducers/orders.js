const initalState = {
    orders: []
}

const ordersReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_ORDERS': {
            console.log(action.orders)
            return {
                orders: [...action.orders]
            }
        }
        case 'UPDATE_ORDERS': {
            const orders = state.orders.filter((order) => order._id !== action.order._id)
            orders.push(action.order)
            return {
                orders
            }
        }
        default:
            return state
    }
}

export default ordersReducer