const input = document.querySelector('.input_text');
const button = document.querySelector('.btn');
const img = document.querySelector('.img');
const imgCountry = document.querySelector('.country');
const display = document.querySelector('.display');
const displayData = document.querySelector('.res_data');
const displayFooter = document.querySelector('.res_footer');
const displayHeader = document.querySelector('.res_name');
const spanTextClima = document.querySelector('.clima');
const spanNameLocation = document.querySelector('.name');
const spanTextHumedad = document.querySelector('.humedad');
const spanTextViento = document.querySelector('.viento');
const APIKEY = 'ccf99b6dca26359e28390bd47ee4a0c1';
let value;
let weatherData;

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIKEY}`;
    const response = await fetch(url);
    if (response.status === 404) {throw new Error('La ciudad no fue encontrada.'); }
    const data = await response.json();
    return data;
}

async function setData() {
    try {
        const weatherData = await getWeather();
        displayData.classList.remove('display');    
        displayFooter.classList.remove('display');
        display.classList.remove('display');
        displayHeader.classList.remove('error');
        imgCountry.classList.remove('set_img_error');

        const country = weatherData.sys.country.toLowerCase();

        spanTextClima.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°c`;
        spanNameLocation.innerHTML = weatherData.name;
        spanTextHumedad.innerHTML = `${weatherData.main.humidity} %`;
        spanTextViento.innerHTML = `${weatherData.wind.speed} m/s`;

        imgCountry.src = `https://flagcdn.com/16x12/${country}.png`;

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
    } catch (error) {
        console.error(error);
        display.classList.remove('display');
        spanNameLocation.innerHTML = 'No encontramos información para esa ubicación.';
        imgCountry.src = 'https://th.bing.com/th/id/R.a9d15d85b474d1b78468828323f5830b?rik=UCE5T9MBmBPxEA&pid=ImgRaw&r=0';
        displayData.classList.add('display');
        displayFooter.classList.add('display');
        displayHeader.classList.add('error');
        imgCountry.classList.add('set_img_error');
    }
}

button.addEventListener('click', async(e) => {
    e.preventDefault();
    value = input.value;

    await setData();
    input.value = '';
});
