const Sequelize = require('sequelize')
const sequelize = app.get('sequelize')

module.exports = () => {
  const fields = {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_name_th: Sequelize.STRING,
    product_name_en: Sequelize.STRING,
    unit_en: Sequelize.STRING,
    unit_th: Sequelize.STRING,
    price: Sequelize.DOUBLE
  }

  const options = {
    timestamps: false
  }

  sequelize.define('product', fields, options)
}
