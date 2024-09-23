const express = require('express');
const router = express.Router();
const { esFestivo } = require('../controllers/festivoController');

router.get('/verificar/:anio/:mes/:dia', async (req, res) => {
    const { anio, mes, dia } = req.params;

    const anioNum = parseInt(anio);
    const mesNum = parseInt(mes);
    const diaNum = parseInt(dia);

    if (isNaN(anioNum) || isNaN(mesNum) || isNaN(diaNum)) {
        return res.status(400).json({ error: 'Fecha no valida' });
    }

    const diasEnMes = new Date(anioNum, mesNum, 0).getDate();
    if (diaNum < 1 || diaNum > diasEnMes) {
        return res.status(400).json({ error: 'Fecha no valida' });
    }

    const fecha = new Date(anioNum, mesNum - 1, diaNum);

    if (isNaN(fecha.getTime())) {
        return res.status(400).json({ error: 'Fecha no valida' });
    }

    const resultado = await esFestivo(fecha);

    return res.json({
        fecha: fecha.toISOString().split('T')[0],
        resultado: resultado.esFestivo ? "Es Festivo" : "No es festivo"
    });
});

module.exports = router;