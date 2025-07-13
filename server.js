const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();  

// Importar rutas
const lucesRoutes = require('./routes/lucesRoutes');
const puertasRoutes = require('./routes/puertasRoutes');
const authRoutes = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/auth', authRoutes);
app.use('/lights', lucesRoutes);
app.use('/doors', puertasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en http://0.0.0.0:${PORT}`);
});
