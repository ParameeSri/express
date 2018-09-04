const Sequelize = require('sequelize')
const sequelize = app.get('sequelize')

module.exports = () => {
  const fields = {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    gender: Sequelize.STRING,
    birth_date: Sequelize.DATE
  }

  const options = {
    timestamps: false
  }

  sequelize.define('customer', fields, options)
}
