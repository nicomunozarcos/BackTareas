const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


//setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());

 
// routes
app.use('/api/login',require ('./routes/login'));
app.use('/api/users', require('./routes/users'));
app.use('/api/register', require('./routes/register'));
app.use('/api/actualizar-datos', require('./routes/actualizar-datos'));
//app.use('/api/pagina-inicio-notas', require('./routes/pagina-inicio-notas'));
//app.use('/api/pagina-inicio-tareas', require('./routes/pagina-inicio-tareas'));
app.use('/api/tableros-notas', require('./routes/tableros-notas'));
app.use('/api/tableros-tareas', require('./routes/tableros-tareas'));
//app.use('/api/notas', require('./routes/notas'));
app.use('/api/tareas', require('./routes/tareas'));



//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
