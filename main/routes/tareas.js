const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/:TT_ID', (req, res) => {
  const TT_ID = req.params.TT_ID;

  const sqlQuery = 'SELECT * FROM tareas WHERE TA_FK_TT_ID = ?';
  conexion.query(sqlQuery, [TT_ID], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    return res.json(results);
  });
});

module.exports = router;
