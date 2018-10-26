const express = require('express');
const morgan = require('morgan');
const app = express();

const { mongoose } = require('./database');

//Configuracion
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/estacion', require('./routes/estacion.routes'));
app.use('/api/bicicleta', require('./routes/bicicleta.routes'));
app.use('/api/usuario', require('./routes/usuario.routes'));

//Servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})