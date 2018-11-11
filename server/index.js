const express = require('express');
const morgan = require('morgan');
const ejs = require("ejs");
const app = express();

const { mongoose } = require('./database');

//Configuracion
app.set('port', process.env.PORT || 3000);
app.engine("html", ejs.renderFile);
app.set('view engine', 'html');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas

//app.set('view engine', 'ejs');
//app.use(expressLayouts);
 
app.get('/', function(req, res) {
  res.render('../views/index.html');
});
app.use('/api/estacion', require('./routes/estacion.routes'));
app.use('/api/bicicleta', require('./routes/bicicleta.routes'));
app.use('/api/tipobici', require('./routes/tipobici.routes'));
app.use('/api/bicitaxi', require('./routes/bicitaxi.routes'));
app.use('/api/recorridobici', require('./routes/recorridobici.routes'));
app.use('/api/usuario', require('./routes/usuario.routes'));

//Servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})