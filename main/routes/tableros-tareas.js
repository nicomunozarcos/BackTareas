const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/:ID', (req, res) => {
  const ID = req.params.ID;

  const sqlQuery = 'SELECT * FROM organizador_tareas.tableros_tareas WHERE TT_FK_US_ID = ?';
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

  const sqlQuery = 'INSERT INTO tableros_tareas (TT_NOMBRE, TT_FK_US_ID) VALUES (?, ?)';
  conexion.query(sqlQuery, [nombreTablero, ID], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    return res.status(200).json({ message: 'Tablero creado exitosamente' });
  });
});

router.delete('/:ID', (req, res) => {
  const tableroId = req.params.ID;

  conexion.query('DELETE FROM tableros_tareas WHERE TT_ID = ?', [tableroId], (error, results) => {
    if (error) {
      console.error('Error al borrar el tablero:', error);
      res.status(500).json({ error: 'Error al borrar el tablero' });
    } else {
      console.log('Tablero borrado exitosamente');
      res.json({ message: 'Tablero borrado exitosamente' });
    }
  });
});

module.exports = router;
