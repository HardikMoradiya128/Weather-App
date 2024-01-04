import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Weather.css';

function Weather() {

    const [city, setCity] = useState('')
    const [search, setSearch] = useState('Surat')
    const [unit, setUnit] = useState('metric')
    const [hide, setHide] = useState('true')

    useEffect(() => {
        const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5'
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=${unit}`)
            .then((res) => {
                console.log(res);
                setCity(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [search, unit])

    const ToggleCel = () => {
        if (unit === "imperial") {
            setUnit("metric")
            setHide(true)
        }
    }
    const ToggleFer = () => {
        if (unit === "metric") {
            setUnit("imperial")
            setHide(false)
        }
    }

    const countrycode = (country) => {
        let regioNames = new Intl.DisplayNames(['en'], { type: 'region' })
        return regioNames.of(country)
    }

    return (
        <>
            <div className='Weather weather_bgcolor p-5'>
                <div className='container'>
                    <div className='search'>
                        <div className='searchInput'>
                            <input type="text" onChange={(event) => { setSearch(event.target.value) }} placeholder='Search city...' />
                        </div>
                        <div className='search_icon'>
                            <SearchIcon />
                        </div>
                    </div>

                    {
                        !city ? ""

                            :
                            <>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='info'>
                                            <div className='d-flex justify-content-between mt-4'>
                                                <h3 className='location'>
                                                    <LocationOnIcon sx={{ fontSize: "30px" }} /> {search}, {countrycode(city.sys.country)}
                                                </h3>
                                                <h3 className='weather_status'>
                                                    <span>{city.weather[0].main}</span>
                                                </h3>
                                            </div>

                                            <div className='d-flex justify-content-between mt-4'>
                                                <div className='weather_temp'>
                                                    {
                                                        hide ? <span>{city.main.temp} °C</span> : <span>{city.main.temp} °F</span>
                                                    }
                                                    <ToggleButtonGroup
                                                        color="primary"
                                                        value={unit}
                                                        exclusive
                                                        aria-label="Platform"
                                                    >
                                                        <ToggleButton value="metric" onClick={ToggleCel} sx={{ border: "none", fontSize: "30px", fontWeight: "600" }}><sup>°C</sup></ToggleButton>
                                                        <ToggleButton value="imperial" onClick={ToggleFer} sx={{ border: "none", fontSize: "30px", fontWeight: "600" }}><sup>°F</sup></ToggleButton>
                                                    </ToggleButtonGroup>
                                                </div>
                                                <div className='weather_img'>
                                                    <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="" />
                                                </div>
                                            </div>

                                            <h5 className='tempmin_max my-3'>
                                                {
                                                    hide ? <p>  High : {city.main.temp_min} °C
                                                        <span> &nbsp; | &nbsp; </span>
                                                        Low : {city.main.temp_max} °C</p>

                                                        : <p> High : {city.main.temp_min} °F
                                                            <span> &nbsp; | &nbsp; </span>
                                                            Low : {city.main.temp_max} °F</p>
                                                }
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                <div className='row text-center my-5'>
                                    <div className='col-3'>
                                        <div className="weather_card">
                                            <h5 class="card-title">Humidity</h5>
                                            <p class="card-text">{city.main.humidity} %</p>
                                        </div>
                                    </div>

                                    <div className='col-3'>
                                        <div className="weather_card">
                                            <h5 class="card-title">Real Feel</h5>
                                            {
                                                hide ? <p class="card-text">{city.main.feels_like} °C</p>
                                                    : <p class="card-text">{city.main.feels_like} °F</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='col-3'>
                                        <div className="weather_card">
                                            <h5 class="card-title">Wind</h5>
                                            <p class="card-text">{city.wind.speed} Km/h</p>
                                        </div>
                                    </div>

                                    <div className='col-3'>
                                        <div className="weather_card">
                                            <h5 class="card-title">Pressure</h5>
                                            <p class="card-text">{city.main.pressure} mb</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Weather
