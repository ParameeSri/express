module.exports = (req, res, next) => {
  res.status(404).json({
    message: '404 Page note Found'
  })
}