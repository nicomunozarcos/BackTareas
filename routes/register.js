const express = require('express');
const router = express.Router();
const conexion = require('../conexion');


router.use(express.json());

router.post('/', (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  // Realizar la inserción en la base de datos
  const sql = 'INSERT INTO usuarios (US_NOMBRE, US_EMAIL, US_PASSWORD) VALUES (?, ?, ?)';
  conexion.query(sql, [fullName, email, password], (error, results) => {
    if (error) {
      console.error('Error al agregar usuario:', error);
      res.sendStatus(500);
    } else {
      console.log('Usuario agregado correctamente');
      res.sendStatus(200);
    }
  });
});

module.exports = router;