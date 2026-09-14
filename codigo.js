const claveApi = '0c0b36b905ed4e79ae913043261409';
const idioma = 'es';
const inpCiudad = document.getElementById('input-ciudad');

async function ObtenerClima() { 
    const ciudad = inpCiudad.value;

    if (!ciudad) {
        alert('Por favor, ingresa una ciudad');
        return;
    }

    // URL PERFECTA: Todo en una sola línea con los parámetros correctos
    const apiClimaActual = `https://api.weatherapi.com/v1/current.json?
q=${ciudad}&lang=${idioma}&key=${claveApi}`;
    try {
        const response = await fetch(apiClimaActual);
        const data = await response.json();

        if (data.error) 
            alert('Ciudad no encontrada. Intenta con otra.');
            return;
        

        mostrarClima(data);
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
} // <--- AQUÍ SE CIERRA CORRECTAMENTE ObtenerClima

// LA FUNCIÓN MOSTRAR CLIMA VA AFUERA, TOTALMENTE INDEPENDIENTE
function mostrarClima(data) {
    document.querySelector('.clima-icono').src = data.current.condition.icon;
    document.querySelector('.clima-texto').innerHTML = data.current.condition.text;
    document.querySelector('.temp').innerHTML = Math.round(data.current.temp_c) + '°c';
    document.querySelector('.ciudad').innerHTML = data.location.name;
    
    // Corregido el punto (.) para encontrar las clases de abajo
    document.querySelector('.humedad').innerHTML = data.current.humidity + '%';
    document.querySelector('.viento').innerHTML = data.current.wind_kph + ' km/h';

    // Esto activa visualmente tu tarjeta verde en la pantalla
    document.getElementById('clima-contenedor').style.display = 'block';
}
