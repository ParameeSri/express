const express = require('express')
const router = express.Router()

const sequelize = app.get('sequelize')
const Customers = sequelize.models['customer']

router.get('/', async (req, res) => {
  try {
    // const sql = ` select * from products `
    // const result = await sequelize.query(sql)
    const result = await Customers.all({
      where: {
        id: 1
      }
    })
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
router.post('/', (req, res) => {
  res.status(201).end()
})

module.exports = router
