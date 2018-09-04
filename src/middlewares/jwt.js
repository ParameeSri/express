const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log(req.headers)
  if (!req.headers['authorization']) {
    return res.status(401).end()
  }
  const authToken = req.headers['authorization']

  try {
    jwt.verify(authToken, 'SECRET')
    next()
  } catch (err) {
    res.status(403).end()
  }
}
