const Festivo = require('../models/festivo');
const { obtenerDomingoPascua,
  agregarDias,
  siguienteLunes,
  calcularFestivos,
  fechasIguales,
  esFechaValida,
  obtenerFestivos, } = require('../services/calcular')

async function esFestivo(fecha) {
  const anio = fecha.getFullYear();
  const fechaPascua = obtenerDomingoPascua(anio);
  console.log(`Fecha consultada: ${fecha}`);
  console.log(`Fecha de Pascua: ${fechaPascua}`);
  const festivos = await Festivo.find();
  console.log(`Consultando festivos para la fecha: ${fecha.toISOString()}`);

  const festivosFijos = festivos.find(f => f.id === 1)?.festivos || [];
  for (const festivo of festivosFijos) {
    const fechaFestivo = new Date(anio, festivo.mes - 1, festivo.dia);
    if (fecha.getTime() === fechaFestivo.getTime()) {
      console.log(`Festivo fijo encontrado: ${festivo.nombre}`);
      return { esFestivo: true };
    }
  }

  const festivosPuente = festivos.find(f => f.id === 2)?.festivos || [];
  for (const festivo of festivosPuente) {
    const fechaFestivo = new Date(anio, festivo.mes - 1, festivo.dia);
    console.log(`Verificando festivo de Ley de Puente: ${festivo.nombre}, Fecha: ${fechaFestivo.toISOString()}`);
    if (fecha.getTime() === fechaFestivo.getTime()) {
      console.log(`Festivo encontrado: ${festivo.nombre}`);
      return { esFestivo: true };
    }
  }

  const festivosPascua = festivos.find(f => f.id === 3)?.festivos || [];
  for (const festivo of festivosPascua) {
    let fechaFestivo = calcularFechaDesdePascua(fechaPascua, festivo.diasPascua);
    console.log(`Festivo de Pascua: ${festivo.nombre}, Fecha calculada: ${fechaFestivo}`);
    if (fecha.getTime() === fechaFestivo.getTime()) {
      return { esFestivo: true };
    }
  }

  const festivosPascuaAjuste = festivos.find(f => f.id === 4)?.festivos || [];
  for (const festivo of festivosPascuaAjuste) {
    let fechaFestivo = calcularFechaDesdePascua(fechaPascua, festivo.diasPascua);
    if (fecha.getTime() === fechaFestivo.getTime()) {
      console.log(`Festivo de Pascua con ajuste encontrado: ${festivo.nombre}`);
      return { esFestivo: true };
    }
  }

  return { esFestivo: false };
}
module.exports = { esFestivo };
