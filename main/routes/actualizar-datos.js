const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const { nombre, email, contraseña, userID } = req.body;
  console.log("Recibida una solicitud de actualización de datos");

  const sqlQuery = 'UPDATE usuarios SET US_NOMBRE = ?, US_EMAIL = ?, US_PASSWORD = ? WHERE US_ID = ?';
  const values = [nombre, email, contraseña, userID];
  console.log(values);

  conexion.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

module.exports = router;