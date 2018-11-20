const express = require('express');
const morgan = require('morgan');
const ejs = require("ejs");
const app = express();
var path = require('path');

const { mongoose } = require('./server/database');

//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas 
app.get('/', function(req, res) {
  res.render('index');
});
app.use('/api/estaciones', require('./server/routes/estacion.routes'));
app.use('/api/bicicletas', require('./server/routes/bicicleta.routes'));
app.use('/api/tipobicis', require('./server/routes/tipobici.routes'));
app.use('/api/bicitaxis', require('./server/routes/bicitaxi.routes'));
app.use('/api/recorridobicis', require('./server/routes/recorridobici.routes'));
app.use('/api/usuarios', require('./server/routes/usuario.routes'));
app.use('/api/roles', require('./server/routes/rol.routes'));
app.use('/api/viajes', require('./server/routes/viaje.routes'));

//Servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})