const { Router } = require('express');
const router = Router();
const conexion = require('../conexion');

// GETroutes Contratos==============================================================================================
// ============================================================================================== ==============================================================================================

router.get('/', async (req, res) =>{

    res.header("Access-Control-Allow-Origin", "*");

    const Contratossql = 'SELECT * FROM telmi.contratos;';
    await conexion.query(Contratossql, (error, resultado) => {
      if (error) {
        console.error('Error al obtener los valores:', error);
      } else {
        const Contratos = JSON.stringify(resultado);
        res.json(Contratos);
      };
    });
  });
  
  module.exports = router;