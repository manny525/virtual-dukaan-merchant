import { LOCAL_HOST } from '../../var';

const updateServices = async (token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/services/merchant`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        const orders = await res.json();
        return orders
    } catch (e) {
        console.log(e)
    }
}

export default updateServices;