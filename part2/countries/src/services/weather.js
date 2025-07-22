import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY

export function getWeatherInfo(city) {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
        .then(response => response.data)
}
