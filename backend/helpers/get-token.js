const getToken = (req) => {
    const bearerToken = req.headers.authorization
    const token = bearerToken.split(' ')[1]
    return token
}

export default getToken