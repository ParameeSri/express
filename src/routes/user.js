const router = require('express').Router()
const sequelize = app.get('sequelize')
const User = sequelize.models['user']
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
  const { username, password } = req.body
  console.log('password ==>', password)
  console.log('bcrypt ==>', bcrypt)
  try {
    const hashPassword = bcrypt.hashSync(password)
    console.log('hashPassword ==>', hashPassword)
    const u = await User.create({
      username,
      password: hashPassword
    })
    // const u = await User.create({
    //   username,
    //   password: hashPassword
    // })
    res.status(201).json({ username })
  } catch (e) {
    res.status(500).end()
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log('xxx ', req.body)
  try {
    const u = await User.findOne({
      where: {
        username
      }
    })

    if (!u) {
      return res.status(401).end()
    }
    if (bcrypt.compareSync(password, u.password)) {
      const token = jwt.sign({ username: u.username }, 'SECRET', {
        expiresIn: '2 hours'
      })
      console.log(token, 'xxx')
      res.status(200).json({ token })
    } else {
      res.status(401).end()
    }
  } catch (e) {
    res.status(500).end()
  }
})
module.exports = router
