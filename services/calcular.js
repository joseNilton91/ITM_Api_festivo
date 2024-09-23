function obtenerDomingoPascua(anio) {
    let mes, dia, A, B, C, D, E, M = 0, N = 0;
    if (anio >= 1583 && anio <= 1699) {
        M = 22;
        N = 2;
    } else if (anio >= 1700 && anio <= 1799) {
        M = 23;
        N = 3;
    } else if (anio >= 1800 && anio <= 1899) {
        M = 23;
        N = 4;
    } else if (anio >= 1900 && anio <= 2099) {
        M = 24;
        N = 5;
    } else if (anio >= 2100 && anio <= 2199) {
        M = 24;
        N = 6;
    } else if (anio >= 2200 && anio <= 2299) {
        M = 25;
        N = 0;
    }
    A = anio % 19;
    B = anio % 4;
    C = anio % 7;
    D = ((19 * A) + M) % 30;
    E = ((2 * B) + (4 * C) + (6 * D) + N) % 7;

    if (D + E < 10) {
        dia = D + E + 22;
        mes = 3; // Marzo
    } else {
        dia = D + E - 9;
        mes = 4; // Abril
    }
    // Excepciones especiales
    if (dia === 26 && mes === 4) dia = 19;
    if (dia === 25 && mes === 4 && D === 28 && E === 6 && A > 10) dia = 18;

    return new Date(anio, mes - 1, dia);
}
function agregarDias(fecha, dias) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha;
}
function siguienteLunes(fecha) {
    const diaSemana = fecha.getDay();
    if (diaSemana > 1) { // Si no es lunes
        return agregarDias(fecha, 9 - diaSemana);
    } else if (diaSemana < 1) {
        return agregarDias(fecha, 1);
    }
    return fecha;
}
function calcularFestivos(festivos, anio) {
    const pascua = obtenerDomingoPascua(anio);
    return festivos.map(festivo => {
        switch (festivo.tipo.id) {
            case 1:
                festivo.fecha = new Date(anio, festivo.mes - 1, festivo.dia);
                break;
            case 2:
                festivo.fecha = siguienteLunes(new Date(anio, festivo.mes - 1, festivo.dia));
                break;
            case 3:
                festivo.fecha = agregarDias(pascua, festivo.diasPascua);
                break;
            case 4:
                festivo.fecha = siguienteLunes(agregarDias(pascua, festivo.diasPascua));
                break;
        }
        return festivo;
    });
}
function obtenerFestivos(anio) {
    let festivos = repositorio.findAll();
    festivos = calcularFestivos(festivos, anio);
    return festivos.map(festivo => ({ nombre: festivo.nombre, fecha: festivo.fecha }));
}
function fechasIguales(fecha1, fecha2) {
    return fecha1.getTime() === fecha2.getTime();
}
function esFechaValida(strFecha) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(strFecha)) return false;
    
    const fecha = new Date(strFecha);
    return !isNaN(fecha.getTime());
}
module.exports = {
    obtenerDomingoPascua,
    agregarDias,
    siguienteLunes,
    calcularFestivos,
    fechasIguales,
    esFechaValida,
    obtenerFestivos,
};