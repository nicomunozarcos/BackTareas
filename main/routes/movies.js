const { Router } = require('express');
const router = Router();
const _ = require ('underscore');

const movies = require('../sample.json');
//console.log(movies);

router.get('/', (req, res) =>{
    res.json(movies);
});

router.post('/', (req, res) =>{
    const {title, director, year}= (req.body);
    if (title && director && year) {
        const id = movies.length + 1;
        const newMovie = {id, ...req.body, };
        movies.push(newMovie);
        res.json(movies);
    }else{
        res.status(500).json({error: 'There was an error'});
    }
    res.send('recibido');
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, director, year}= req.body;
    if (title && director && year) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
            }
        })
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error'});
    }

});

router.delete('/:id', (req, res) => {
    _.each(movies, (movie, i) =>{
        const {id} = req.params;
        if (movie.id == id) {
            movies.splice(i, 1);
        }
    });
    res.send(movies);
})

module.exports = router;

router.post("/datoscliente", (req, res) => {
    // datos del objeto
    const datosclientes = {
      nombre: req.body.nombre,
      dni: req.body.dni,
      telefono: req.body.telefono,
      email: req.body.email,
      direccion: req.body.direccion,
      cp: req.body.cp,
      poblacion: req.body.poblacion,
      provincia: req.body.provincia,
      factura: req.body.factura,
      iban: req.body.iban,
      condiciones: req.body.condiciones,
      compras: req.body.compras,
    };
  
    const url = 'http://localhost:3000/api/articulos/datoscliente';
  
    // opciones de la solicitud HTTP POST
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    };
    // solicitud HTTP POST
    const request = https.request(url, options, response => {
      response.on("data", data => {
        console.log(JSON.parse(data));
        res.status(response.statusCode).send(data);
      });
    });
    // manejo de errores de la solicitud
    request.on("error", error => {
      console.error(error);
      res.status(500).send(error);
    });
    // enviar los datos del objeto en el cuerpo de la solicitud
    request.write(JSON.stringify(datosclientes));
    request.end();
  });
  