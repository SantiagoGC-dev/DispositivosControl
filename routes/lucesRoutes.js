const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all lights
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM luces');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener luces:', error);
    res.status(500).send('Error al obtener luces');
  }
});

// Toggle light
router.post('/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Obtener estado actual
    const [rows] = await pool.query('SELECT estado FROM luces WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).send('Luz no encontrada');

    const estadoActual = rows[0].estado;
    const nuevoEstado = (estadoActual === 'encendida') ? 'apagada' : 'encendida';

    // 2. Actualizar estado
    await pool.query('UPDATE luces SET estado = ?, ultima_actividad = NOW() WHERE id = ?', [nuevoEstado, id]);

    res.json({ id, nuevoEstado });
  } catch (error) {
    console.error('Error al cambiar estado de luz:', error);
    res.status(500).send('Error al cambiar estado de luz');
  }
});

module.exports = router;
