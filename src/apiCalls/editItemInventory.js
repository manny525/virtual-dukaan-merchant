import { LOCAL_HOST } from '../../var';

const editItemInventory = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/inventory/updateItem`, {
            method: "PATCH",
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const inventory = await res.json()
        return inventory
    } catch(e) {
        console.log(e)
    }
}

export default editItemInventory