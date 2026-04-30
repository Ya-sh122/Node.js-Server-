const express = require('express');
const router = express.Router();
const c = require('../controllers/playerController');

router.post('/', c.addPlayer);
router.get('/', c.getAll);
router.get('/search', c.search);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;