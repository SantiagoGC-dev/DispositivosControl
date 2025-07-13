const db = require('../db');

exports.getLuces = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, estado AS status, intensidad FROM luces');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener luces' });
  }
};

exports.toggleLuz = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT estado FROM luces WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Luz no encontrada' });

    const nuevoEstado = rows[0].estado === 'encendida' ? 'apagada' : 'encendida';
    await db.query('UPDATE luces SET estado = ?, ultima_actividad = NOW() WHERE id = ?', [nuevoEstado, id]);
    res.json({ id, nuevoEstado });
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar estado de la luz' });
  }
};
