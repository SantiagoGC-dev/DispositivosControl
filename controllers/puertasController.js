const pool = require('../db');

exports.getPuertas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM puertas');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener puertas:', error);
    res.status(500).send('Error al obtener puertas');
  }
};

exports.togglePuerta = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Obtener estado actual
    const [rows] = await pool.query('SELECT estado FROM puertas WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).send('Puerta no encontrada');

    const estadoActual = rows[0].estado;
    const nuevoEstado = (estadoActual === 'abierta') ? 'cerrada' : 'abierta';

    // 2. Actualizar
    await pool.query(
      'UPDATE puertas SET estado = ?, ultima_actividad = NOW() WHERE id = ?',
      [nuevoEstado, id]
    );

    res.json({ id, nuevoEstado });
  } catch (error) {
    console.error('Error al cambiar estado de puerta:', error);
    res.status(500).send('Error al cambiar estado de puerta');
  }
};
