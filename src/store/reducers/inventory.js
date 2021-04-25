const initalState = {}

const inventoryReducer = (state = initalState, action) => {
    switch(action.type) {
        case 'SET_INVENTORY':
            return {
                inventory: action.inventory
            }
        default: 
            return state
    }
}

export default inventoryReducer