const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

const verifyToken = (request, response, next) => {
    const token = getTokenFrom(request);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err){
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        request.decoded = decoded
        next()
    })
}


module.exports = { verifyToken }