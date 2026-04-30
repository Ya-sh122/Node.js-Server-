const Player = require('../models/playerModel');
const { Op } = require('sequelize');

// ADD PLAYER
exports.addPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.json(player);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// GET ALL
exports.getAll = async (req, res) => {
    const data = await Player.findAll();
    res.json(data);
};

// SEARCH
exports.search = async (req, res) => {
    const name = req.query.name;

    const data = await Player.findAll({
        where: {
            name: { [Op.like]: `%${name}%` }
        }
    });

    res.json(data);
};

// UPDATE
exports.update = async (req, res) => {
    await Player.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ message: "Updated" });
};

// DELETE
exports.remove = async (req, res) => {
    await Player.destroy({
        where: { id: req.params.id }
    });
    res.json({ message: "Deleted" });
};