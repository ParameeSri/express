const express = require('express') // ประกาศใช้ express
// const app = express()
app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const Sequelize = require('sequelize')
const options = {
  operatorsAliases: false
}
const sequelize = new Sequelize('mysql://root@127.0.0.1/tutor4dev', options)

app.set('sequelize', sequelize) // ฝากไว้กับตัว application

// setup models
require('./models/product')()
require('./models/customer')()
const user = require('./models/user')()
// user.sync() // มีแล้วไม่ต้องสร้าง
// user.sync({ force: true }) // drop table แล้วสร้างใหม่
// setup cors 
const cors = require('./middlewares/cors')
const prefilght = require('./middlewares/prefilght')
const jwt = require('./middlewares/jwt')
app.use(cors, prefilght)

const m1 = (req, res, next) => {
  console.log('m1')
  if (true) {
    next()
  } else {
    res.status(401).end()
  }
}

const m2 = (req, res, next) => {
  console.log('m2')
  if (true) {
    next()
  } else {
    res.status(401).end()
  }
}
app.use(m1)

app.get('/', (req, res) => { // การ define route
  res.json({
    status: true
  })
})

app.use('/api/product', jwt, require('./routes/product'))
app.use('/api/customer', m2, require('./routes/customer'))
app.use('/api/user', m2, require('./routes/user'))

app.use(require('./middlewares/404'))
app.listen(3000) // start node server ที่ port 3000