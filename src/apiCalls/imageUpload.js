import axios from 'axios';
import { LOCAL_HOST } from '../../var';

const imageUpload = async (payload) => {
    console.log(payload);
    try {
        const data = await axios.post(`http://${LOCAL_HOST}/users/uploadImage`, payload);
        console.log(data.data.url)
        return data.data.url;
    } catch (e) {
        console.log(e)
    }
}

export default imageUpload;