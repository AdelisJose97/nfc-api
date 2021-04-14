const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken._id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const { _id: userId } = decodedToken
  request.userId = userId
  next()
}
