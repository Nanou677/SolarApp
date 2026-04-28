const express = require('express');
const router = express.Router();
const { calculer, getHistorique } = require('../controllers/calculController');

router.post('/calculer/:famille_id', calculer);
router.get('/historique/:famille_id', getHistorique);

module.exports = router;