const express = require('express');
const router = express.Router();
const { getByFamille, create, remove } = require('../controllers/appareilController');

router.get('/famille/:famille_id', getByFamille);
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;