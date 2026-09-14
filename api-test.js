const claveApi = '0c0b36b905ed4e79ae913043261409';
const idioma = 'es';
const ciudad = 'Huancayo';

const apiClimaActual = `https://api.weatherapi.com/v1/current.json?
q=${ciudad}&lang=${idioma}&key=${claveApi}`;

const response = await fetch(apiClimaActual);
let data = await response.json();
console.log(data.location);
console.log(data.location.localtime);
console.log(data.current.condition)
