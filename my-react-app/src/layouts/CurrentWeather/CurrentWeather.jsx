import React from 'react'
import "./CurrentWeather.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CurrentWeather() {
    const [selectedCity, setSelectedCity] = useState('Sydney');
    const [weatherData, setWeatherData] = useState(null);
    const [temperature, setTemperature] = useState('');
    const [windSpeed, setWind] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');
    const[text,setWeatherCondition] = useState('');

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    useEffect(() => {

        const cityCoordinates = {
            Sydney: { longtitude: 151.20932, latitude:-33.86785  },
            Paris: { longtitude: 2.3522, latitude: 48.8566 },
            Beijing: { longtitude: 116.41, latitude: 39.92 },
            Tokyo: { longtitude: 139.759455, latitude:35.682839  },
            Melbourne:{longtitude:145,latitude:-38},
            Perth:{longtitude:115.52,latitude:-31.52},
            Canberra:{longtitude:149.07,latitude:-35.17},
            Brisbane:{longtitude:153.02,latitude:-27.28},
            NewYork:{longtitude:-74.00,latitude:40.43}
            // 添加其他城市的坐标
        };
        

        // 从cityCoordinates对象获取所选城市的经纬度
        const {longtitude,latitude  } = cityCoordinates[selectedCity];

        // 设置密钥
        const apiKey = 'f28f14e55f8f453b9ea95843ee302ea1';

        // 构建API请求URL
        const apiUrl = `https://devapi.qweather.com/v7/weather/now?location=${longtitude},${latitude}&key=f28f14e55f8f453b9ea95843ee302ea1`;

        // // 使用axios进行API请求
        // axios.get(apiUrl)
        //     .then(response => {
        //         setWeatherData(response.data);
        //         setTemperature(response.data.now.temp);
        //         setWind(response.data.now.windSpeed);
        //         setHumidity(response.data.now.humidity);
        //         setPressure(response.data.now.pressure);
        //         setWeatherCondition(response.data.now.text)
        //     })
        //     .catch(error => {
        //         console.error('Error fetching weather data:', error);
        //     });
    }, [selectedCity]);

    const weatherCondition = {
        "晴": "sunny",
        "多云": "cloudy",
        "少云": "cloudy",
        "晴间多云":"cloudy",
        "冻雨":"heavy_rain",
        "阵雨": "light_rain",
        "雨": "heavy_rain",
        "霾": "smog",
        "雷阵雨": "thunderstorm",
        "雪": "snow",
        "雨雪天气":"snow"

        // 其他天气情况的映射
    };
    
    return (
        
        <div className='weather'>
            <div className='top'>
                <div>
                    <label htmlFor="citySelect">Select a city: </label>
                    <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
                        <option value="Sydney">Sydney</option>
                        <option value="Paris">Paris</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Beijing">Beijing</option>
                        <option value = "NewYork">NewYork</option>
                        <option value = "Melbourne">Melbourne</option>
                        <option value = "Perth">Perth</option>
                        <option value = "Canberra">Canberra</option>
                        <option value = "Brisbane">Brisbane</option>
                    </select>
                </div>
                <img alt="weather" className='weather-icon' src={`/weather-icon/${weatherCondition[text]}.png`}/>
            </div>
            <div className='bottom'>
                <p className='temperature'>{temperature}°C</p>
                <div className='details'>
                    <div className='parameter-row'>
                        <span className='parameter-label'>City</span>
                        <span className='parameter-value'>{selectedCity}</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Wind</span>
                        <span className='parameter-value'>{windSpeed} km/h</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Humidity</span>
                        <span className='parameter-value'>{humidity}%</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Pressure</span>
                        <span className='parameter-value'>{pressure} KPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
}