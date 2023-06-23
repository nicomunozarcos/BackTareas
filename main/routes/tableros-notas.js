const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/:ID', (req, res) => {
  const ID = req.params.ID;

  const sqlQuery = 'SELECT * FROM organizador_tareas.tableros_notas WHERE TN_FK_US_ID = ?';
  conexion.query(sqlQuery, [ID], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    return res.json(results);
  });
});

router.post('/:ID', (req, res) => {
  const ID = req.params.ID;
  const { nombreTablero } = req.body;

  const sqlQuery = 'INSERT INTO tableros_notas (TN_NOMBRE, TN_FK_US_ID) VALUES (?, ?)';
  conexion.query(sqlQuery, [nombreTablero, ID], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    return res.status(200).json({ message: 'Tablero creado exitosamente' });
  });
});

module.exports = router;

