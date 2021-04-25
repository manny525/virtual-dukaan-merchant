import { LOCAL_HOST } from '../../var';

const getPaid = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/push`, {
            method: "POST",
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

export default getPaid