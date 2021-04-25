const getPincode = async (lat, lon) => {
    try {
        const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=6ed4de0702acb6&lat=${lat}&lon=${lon}&format=json`)
        return await res.json()
    } catch(e) {
        console.log(e)
    }
}

export default getPincode