const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://twik_a6ku_user:1gKvgGrLcxryqGHZ8OWviSp2N6eZOlbY@dpg-cp3vp421hbls73eq1lu0-a.oregon-postgres.render.com/twik_a6ku', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
