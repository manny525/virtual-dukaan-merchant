const orderTypeSelector = (orders, type) => {
    if (type === 'new') {
        console.log(type)
        console.log(orders)
    }
    return orders.filter((order) => {
        return order.status === type
    })
}

export default orderTypeSelector