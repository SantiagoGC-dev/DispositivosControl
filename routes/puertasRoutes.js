const express = require('express');
const router = express.Router();
const puertasController = require('../controllers/puertasController');

router.get('/', puertasController.getPuertas);
router.post('/:id/toggle', puertasController.togglePuerta);

module.exports = router;
