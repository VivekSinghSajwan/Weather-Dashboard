import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './SearchBox.css';
import { useState } from 'react';

function SearchBox({ updateInfo }) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "your_api_key";

    let [city, setCity] = useState('');
    let [error, setError] = useState(false);

    async function getWeatherData() {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            let jsonResponse = await response.json();
            let weatherData = {
                city: city,
                humidity: jsonResponse.main.humidity,
                pressure: jsonResponse.main.pressure,
                temp: jsonResponse.main.temp,
                temp_max: jsonResponse.main.temp_max,
                temp_min: jsonResponse.main.temp_min,
                country: jsonResponse.sys.country,
                sunrise: jsonResponse.sys.sunrise,
                sunset: jsonResponse.sys.sunset,
                flag: `https://flagcdn.com/w80/${jsonResponse.sys.country.toLowerCase()}.png`,
            };
            console.log(weatherData);
            return weatherData;
        } catch (err) {
            console.error(err);
            setError(true);
        }
    }

    function handleChange(e) {
        setCity(e.target.value);
        if (error) setError(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let info = await getWeatherData();
        if (info) {
            updateInfo(info);
            setCity('');
        }
    }

    return (
        <div className="SearchBox">
            <h1>Weather Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div className="SearchBar">
                    <TextField onChange={handleChange} id="outlined-basic"label="City Name" variant="outlined" value={city} required/>
                </div>
                <br />
                <div className="SearchButton">
                    <Button variant="contained" type="submit">
                        Search
                    </Button>
                </div>
            </form>
            {error && <Alert variant="filled" severity="error" sx={{ mx: 45, mt: 2}}>Invalid Place !!!</Alert>}
        </div>
    );
}

export default SearchBox;
