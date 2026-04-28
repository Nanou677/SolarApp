const express = require('express');
const router = express.Router();
const { getAll, getById, create, remove } = require('../controllers/familleController');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;