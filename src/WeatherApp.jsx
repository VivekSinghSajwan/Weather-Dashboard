import SearchBox from "./SearchBox"
import DisplayBox from "./DisplayBox";
import { useState } from "react";

function WeatherApp() {

    let [weatherInfo,setWeatherInfo] = useState({
        city: "City",
        humidity: "--",
        pressure: "--", 
        temp: "--",
        temp_max: "--",
        country: "Country",
        temp_min: "--",
        sunrise: "--",
        sunset: "--"
    })

    function updateWeatherInfo(newObj){
        setWeatherInfo(newObj);
    }

    return (
        <div className="WeatherApp">
            <SearchBox updateInfo={updateWeatherInfo}/>
            {weatherInfo.city != "City" && <DisplayBox infoObj={weatherInfo}/>}
        </div>
    )
}

export default WeatherApp;