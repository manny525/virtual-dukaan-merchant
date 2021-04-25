import { LOCAL_HOST } from '../../var';

const updateServiceStatus = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/services/status`, {
            method: "PATCH",
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return await res.json()
    } catch(e) {
        console.log(e)
    }
}

export default updateServiceStatus