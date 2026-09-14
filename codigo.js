const claveApi = '0c0b36b905ed4e79ae913043261409';
const idioma = 'es';
const inpCiudad = document.getElementById('input-ciudad');

async function ObtenerClima() { // Dejamos la 'O' mayúscula porque así la llamaste en tu HTML: onclick="ObtenerClima()"
    const ciudad = inpCiudad.value;

    if (!ciudad) {
        alert('Por favor, ingresa una ciudad');
        return;
    }

    // ¡CORREGIDO! Todo en una sola línea sin saltos extraños
    const apiClimaActual = `https://weatherapi.com{ciudad}&lang=${idioma}&key=${claveApi}`;

    try {
        const response = await fetch(apiClimaActual);
        const data = await response.json();

        // Si la API nos devuelve un error (ej. ciudad no encontrada)
        if (data.error) {
            alert('Ciudad no encontrada. Intenta con otra.');
            return;
        }

        mostrarClima(data);
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
}

// ¡CORREGIDO! La función va afuera de ObtenerClima para mantener el código ordenado
function mostrarClima(data) {
    document.querySelector('.clima-icono').src = data.current.condition.icon;
    document.querySelector('.clima-texto').innerHTML = data.current.condition.text;
    document.querySelector('.temp').innerHTML = Math.round(data.current.temp_c) + '°c';
    document.querySelector('.ciudad').innerHTML = data.location.name;
    
    // ¡CORREGIDO! Le agregamos el punto (.) para que busque la clase .humedad
    document.querySelector('.humedad').innerHTML = data.current.humidity + '%';
    document.querySelector('.viento').innerHTML = data.current.wind_kph + ' km/h';

    // Esto hace que la tarjeta se muestre si antes estaba oculta
    document.getElementById('clima-contenedor').style.display = 'block';
}
