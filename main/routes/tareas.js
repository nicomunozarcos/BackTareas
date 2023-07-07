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

router.get('/', (req, res) => {
  const { prioridad, usuarioId } = req.query;

  const sqlQuery = 'SELECT * FROM tareas WHERE TA_PRIORIDAD = ? AND TA_FK_ID_USUARIO = ? AND TA_COLUMNA <> 3';
  conexion.query(sqlQuery, [prioridad, usuarioId], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    return res.json(results);
  });
});

router.post('/', (req, res) => {
  const {
    prioridad,
    nombre,
    observaciones,
    fechaCreacion,
    fechaFinalizacion,
    departamento,
    idusuario,
    idtabla,
    columna,
  } = req.body;

  const tarea = {
    prioridad,
    nombre,
    observaciones,
    fechaCreacion,
    fechaFinalizacion,
    departamento,
    idusuario,
    idtabla,
    columna,
  };

  const query = 'INSERT INTO tareas (TA_PRIORIDAD, TA_ASUNTO, TA_OBSERVACIONES, TA_FECHAINI, TA_FECHAFIN, TA_FK_ID_DEPARTAMENTO, TA_FK_ID_USUARIO, TA_FK_TT_ID, TA_COLUMNA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  conexion.query(query, Object.values(tarea), (err, result) => {
    if (err) {
      console.error('Error al guardar la tarea en la base de datos', err);
      res.sendStatus(500);
      return;
    }

    console.log('Tarea guardada en la base de datos');
    res.sendStatus(200);
  });
});



router.patch('/:id', (req, res) => {
  const tareaId = req.params.id;
  const nuevaColumna = req.body.columna;

  const query = 'UPDATE tareas SET TA_COLUMNA = ? WHERE TA_ID = ?';

  conexion.query(query, [nuevaColumna, tareaId], (error, results) => {
    if (error) {
      console.error('Error al actualizar la tarea:', error);
      return res.status(500).json({ error: 'Error al actualizar la tarea' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea actualizada correctamente' });
  });
});

router.delete('/tablero/:id', (req, res) => {
  const tableroId = req.params.id;

  // Eliminar las tareas asociadas al tablero
  const deleteTareasQuery = 'DELETE FROM tareas WHERE TA_FK_TT_ID = ?';
  conexion.query(deleteTareasQuery, [tableroId], (error, results) => {
    if (error) {
      console.error('Error al eliminar las tareas:', error);
      return res.status(500).json({ error: 'Error al eliminar las tareas' });
    }
    res.json({ message: 'Tareas del tablero eliminadas correctamente' });
  });
});

router.delete('/:id', (req, res) => {
  const tareaId = req.params.id;

  // Eliminar las tareas asociadas al tablero
  const deleteTareasQuery = 'DELETE FROM tareas WHERE TA_ID = ?';
  conexion.query(deleteTareasQuery, [tareaId], (error, results) => {
    if (error) {
      console.error('Error al eliminar las tareas:', error);
      return res.status(500).json({ error: 'Error al eliminar las tareas' });
    }
    res.json({ message: 'Tarea eliminada correctamente' });
  });
});

router.put('/actualizar-columna', (req, res) => {
  const { tareaId, nuevaColumna } = req.body;
  console.log(tareaId);

  const sqlQuery = 'UPDATE tareas SET TA_COLUMNA = ? WHERE TA_ID = ?';
  conexion.query(sqlQuery, [nuevaColumna, tareaId], (err, results) => {
    if (err) {
      console.error('Error al actualizar la tarea:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    return res.json({ success: true });
  });
});

router.patch('/', (req, res) => {
  const { diasRestantes } = req.body;

  const query = 'UPDATE tareas SET TA_PRIORIDAD = ? WHERE TA_FECHAFIN IS NOT NULL AND TA_FECHAFIN != "" AND ABS(DATEDIFF(CURDATE(), DATE(TA_FECHAFIN))) < ? AND TA_PRIORIDAD != ?';

  conexion.query(query, [diasRestantes], (error, results) => {
    if (error) {
      console.error('Error al actualizar las tareas:', error);
      res.status(500).json({ error: 'Error al actualizar las tareas' });
    } else {
      console.log('Tareas actualizadas correctamente');
      res.status(200).json({ message: 'Tareas actualizadas correctamente' });
    }
  });
});

module.exports = router;

