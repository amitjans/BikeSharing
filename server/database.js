const mongoose = require('mongoose');
const URI = 'mongodb+srv://amitjans:8KNysUAqsPqco3mO@cluster0-sniue.gcp.mongodb.net/bikesharing';
mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('Conectado a la Base de Datos'))
    .catch(error => console.error(error));
module.exports = mongoose;