const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const conexion = require('../conexion');
const { select } = require('underscore');

// GETroutes Movil==============================================================================================
// ============================================================================================== ==============================================================================================

router.get('/movil', async (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  const Movilsql = 'SELECT AR_MINUTOS, AR_MEGAS, AR_TARIFA_PUBLICO, AR_COD_ARTICULO, AR_ID_DENOMINACION FROM telmi.articulos WHERE AR_ID_FAMILIA = 03 AND AR_NO_PUBLICABLE_CLIENTE = 0';
  await conexion.query(Movilsql, (error, resultado) => {
    if (error) {
      console.error('Error al obtener los valores:', error);
    } else {
      const productosMovil = JSON.stringify(resultado);
      res.json(productosMovil);
    };
  });
});

// GETroutes Fijo e Internet ==============================================================================================
// ============================================================================================== ==============================================================================================


router.get('/:codigoarticulocodificado', async (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  const {codigoarticulocodificado} = req.params;
  const codigoarticulo = decodeURIComponent(codigoarticulocodificado);
  let consultaSQL;
  const articulo = `SELECT AR_ID_DENOMINACION, AR_TARIFA_PUBLICO, AR_COD_ARTICULO, AR_ID_SUBFAMILIA, AR_ID_FAMILIA, AR_NO_PUBLICABLE_CLIENTE FROM telmi.articulos WHERE AR_COD_ARTICULO = '${codigoarticulo}'`;
  console.log(codigoarticulo);
  const articuloResult = await conexion.query(articulo);
  console.log(articuloResult);
  if ((articuloResult[0].AR_ID_SUBFAMILIA === '01002')) {
    consultaSQL = `SELECT AR_ID_DENOMINACION, AR_TARIFA_PUBLICO, AR_COD_ARTICULO, AR_ID_SUBFAMILIA, AR_ID_FAMILIA, AR_NO_PUBLICABLE_CLIENTE FROM telmi.articulos WHERE AR_NO_PUBLICABLE_CLIENTE = 0 AND (AR_ID_SUBFAMILIA = 01002 OR AR_ID_FAMILIA = 06)`;
  } else if ((articuloResult[0].AR_COD_ARTICULO === 'FIBRA-100MBV3')) {
    consultaSQL = `SELECT AR_ID_DENOMINACION, AR_TARIFA_PUBLICO, AR_COD_ARTICULO, AR_ID_SUBFAMILIA, AR_ID_FAMILIA, AR_NO_PUBLICABLE_CLIENTE FROM telmi.articulos WHERE AR_COD_ARTICULO = 'FIBRA-100MBV3' OR AR_COD_ARTICULO = 'VOZFIBRA1000-400'`;
  } else if ((articuloResult[0].AR_COD_ARTICULO === 'FIBRA-200MBV3')) {
    consultaSQL = `SELECT AR_ID_DENOMINACION, AR_TARIFA_PUBLICO, AR_COD_ARTICULO, AR_ID_SUBFAMILIA, AR_ID_FAMILIA, AR_NO_PUBLICABLE_CLIENTE FROM telmi.articulos WHERE AR_COD_ARTICULO = 'FIBRA-200MBV3' OR AR_COD_ARTICULO = 'VOZFIBRA700-200'`;
  } else if ((articuloResult[0].AR_COD_ARTICULO === 'FIBRA-300MBV3')) {
    consultaSQL = `SELECT AR_ID_DENOMINACION, AR_TARIFA_PUBLICO, AR_COD_ARTICULO, AR_ID_SUBFAMILIA, AR_ID_FAMILIA, AR_NO_PUBLICABLE_CLIENTE FROM telmi.articulos WHERE AR_COD_ARTICULO = 'FIBRA-300MBV3' OR AR_COD_ARTICULO = 'VOZFIBRA400-100'`;
  }
  await conexion.query(consultaSQL, (error, resultado) => {
    if (error) {
      console.error('Error al obtener los valores:', error);
    } else {
       const productos = JSON.stringify(resultado);
      res.json(productos);
    };
  });
});


// POST routes  ==============================================================================================
// ============================================================================================== ==============================================================================================

router.post("/datoscliente", (req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  
  const datosRecibidos = req.body.compras;

  // Convertir la cadena de texto a un objeto JSON
  const objetoJSON = JSON.parse(datosRecibidos);
  console.log(objetoJSON);

  const datoscliente = req.body;
  res.json(datoscliente);

});


module.exports= router;