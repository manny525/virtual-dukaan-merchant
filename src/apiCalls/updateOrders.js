import { LOCAL_HOST } from '../../var';

const updateOrders = async (token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/orders/merchant`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        const orders = await res.json()
        console.log(orders)
        return orders
    } catch (e) {
        console.log(e)
    }
}

export default updateOrders;