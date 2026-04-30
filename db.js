const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cricketer_db', 'root', 'Root123', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

module.exports = sequelize;