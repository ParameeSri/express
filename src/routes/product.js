const express = require('express')
const router = express.Router()
const { Op } = require('Sequelize')

const sequelize = app.get('sequelize')
const Product = sequelize.models['product']

router.get('/', async (req, res) => {
  try {
    // const sql = ` select * from products `
    // const result = await sequelize.query(sql)
    console.log(1)
    const { price = 0 } = req.query
    const products = await Product.all({
      attributes: ['product_name_en', 'id'],
      where: {
        price: {
          [Op.lt]: price
        },
        id: {
          [Op.gt]: 50
        }
      },
      order: [
        ['id'],
        ['product_name_en', 'desc']
      ],
      limit: 10
    })
    res.json(products)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
router.post('/', async (req, res) => {
  console.log('req.body ==>', req.body)
  const customer = req.body
  try {
    const p = await Product.create(customer)
    res.status(201).json(p).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
router.post('/:id', async (req, res) => {
  const { id } = req.params
  try {
    // const sql = ` select * from products `
    // const result = await sequelize.query(sql)
    const result = await Product.findById(id)
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
router.put('/:id', async (req, res) => {
  const formData = req.body
  const { id } = req.params
  try {
    const p = await Product.findById(id)
    await p.update(formData)
    res.status(200).end()
  } catch (err) {
    res.status(500).end()
  }
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const p = await Product.findById(id)
    await p.destroy()
    res.status(200).end()
  } catch (err) {
    res.status(500).end()
  }
})

module.exports = router
