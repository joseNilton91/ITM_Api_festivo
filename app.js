const express = require('express');
const mongoose = require('mongoose');
const festivosRouter = require('./routers/festivosRouters');
const app = express();

mongoose.connect('mongodb://localhost:27017/festivos', {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
        console.log('!Conexión correctamente¡.');
    })
    .catch((err) => {
        console.error('Error conectando a MongoDB:', err.message);
    });
app.use(express.json());
app.use('/festivos', festivosRouter);
const puerto = 3031;
app.listen(puerto, () => {
    console.log(`API festivos escuchando en el puerto: ${puerto}`);
});
module.exports = app;
