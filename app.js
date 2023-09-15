const input = document.querySelector('.input_text');
const button = document.querySelector('.btn');
const img = document.querySelector('.img');
const imgCountry = document.querySelector('.country');
const display = document.querySelector('.display');

const spanTextClima = document.querySelector('.clima');
const spanNameLocation = document.querySelector('.name');
const spanTextHumedad = document.querySelector('.humedad');
const spanTextViento = document.querySelector('.viento');

const APIKEY = 'ccf99b6dca26359e28390bd47ee4a0c1';
let value;
let weatherData;

async function getWeather(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIKEY}`;
    await fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`La solicitud falló con estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            weatherData = data;
        })
        .catch(error => {
            console.error(error);
        });
}

async function setData(){
    await getWeather();
    display.classList.remove('display');
    const country = weatherData.sys.country.toLowerCase()

    spanTextClima.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°c`;
    spanNameLocation.innerHTML = weatherData.name;
    spanTextHumedad.innerHTML = `${weatherData.main.humidity} %`;
    spanTextViento.innerHTML = `${weatherData.wind.speed} m/s`;

    imgCountry.src = `https://flagcdn.com/16x12/${country}.png`

    switch (weatherData.weather[0].main) {
        case 'Clouds':
            img.src = './img/clouds.png';
            break;
        case 'Clear':
            img.src = './img/clear.png';
            break;
        case 'Rain':
            img.src = './img/rain.png';
            break;
        case 'Drizzle':
            img.src = './img/drizzle.png';
            break;
        case 'Mist':
            img.src = './img/mist.png';
            break;
        case 'Snow':
            img.src = './img/snow.png';
            break;
        default:
    }
}

button.addEventListener('click', async(e) => {
    e.preventDefault();
    value = input.value;

    setData();
    input.value = '';
});
