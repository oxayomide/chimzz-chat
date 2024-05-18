const { DataTypes } = require('sequelize');
const sequelize = require('../config/pg'); // Adjust the path if necessary

const Message = sequelize.define('Message', {
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Message;
