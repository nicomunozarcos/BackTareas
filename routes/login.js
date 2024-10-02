const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const bodyParser = require('body-parser');


router.post('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://apptareaskanban.netlify.app');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const { email, password } = req.body;
  console.log("Recibida una solicitud de inicio de sesión");
  console.log(req.body);

  const sqlQuery = 'SELECT * FROM usuarios WHERE US_EMAIL = ?';
  conexion.query(sqlQuery, [email], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];
    if (user.US_PASSWORD !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }


    return res.status(200).json({ message: 'Inicio de sesión exitoso', token: 'tu_token_de_acceso', fullName: user.US_NOMBRE, ID: user.US_ID });
  });
});

module.exports = router;