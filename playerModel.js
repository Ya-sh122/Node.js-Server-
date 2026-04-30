const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Player = sequelize.define('Player', {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    photo: { type: DataTypes.STRING },
    career: { type: DataTypes.TEXT },
    fifties: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'players',
    timestamps: false
});

module.exports = Player;