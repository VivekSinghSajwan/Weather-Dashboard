import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import ThunderstormRoundedIcon from '@mui/icons-material/ThunderstormRounded';
import './DisplayBox.css'

function DisplayBox({infoObj}){

    const HOT_URL = "https://plus.unsplash.com/premium_photo-1689298478069-cc04a1763866?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const RAIN_URL = "https://plus.unsplash.com/premium_photo-1664303020217-29f776002c7c?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    function convertUnixToTime(timestamp) {
        if(timestamp == "--")
            return timestamp;
        const date = new Date(timestamp * 1000); // multiply by 1000 because JS works in milliseconds
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const formattedTime = hours % 12 || 12; // convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return formattedTime + ':' + minutes.slice(-2) + ' ' + ampm;
    }
    
    return (
        <div className="DisplayBox">
            <div className="displayPic">
                <img src={infoObj.humidity > 50 ? RAIN_URL : (infoObj.temp > 15 ? HOT_URL : COLD_URL)} alt="Hot Weather" />
            </div>
            <div className="displayInfo">
                <div className="cityName">
                    <h2>
                        {infoObj.humidity > 50 ? <ThunderstormRoundedIcon/> : (infoObj.temp > 15 ? <WbSunnyRoundedIcon/> : <AcUnitRoundedIcon/>)} &nbsp;
                        {infoObj.city}, {infoObj.country}
                        {infoObj.country!='country' && <img src={infoObj.flag} style={{ width: "30px", marginLeft: "10px" }} />}
                    </h2>
                    
                </div>
                <div className="cityDetails">
                    <div className="suntime">
                        <p><strong>Sunrise:</strong> {convertUnixToTime(infoObj.sunrise)}</p>
                        <p><strong>Sunset:</strong> {convertUnixToTime(infoObj.sunset)}</p>
                    </div>
                    <div className="details">
                        <p><strong>Temperature:</strong> {infoObj.temp}°C</p>
                        <p><strong>Humidity:</strong> {infoObj.humidity}%</p>
                        <p><strong>Pressure:</strong> {infoObj.pressure} hPa</p>
                        <p><strong>Max Temp:</strong> {infoObj.temp_max}°C</p>
                        <p><strong>Min Temp:</strong> {infoObj.temp_min}°C</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default DisplayBox;