// APIurl = "https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid=16587da786b7b0db6a80769d9185b9b8";

import humiditypng from '../assets/humidity.png'
import logo from '../assets/logo.png'

import axios from "axios";
import React, { useState, useEffect } from 'react'

const Weather = () => {

    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    const [data, setData] = useState({
        celcius: 29,
        name: 'Bengaluru',
        humidity: 62,
        speed: 1.2,
        sit: 'Clouds'
    });

    const getWeather = () => {
        if (city !== "") {
            let citynameerror = false;

            const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16587da786b7b0db6a80769d9185b9b8&units=metric`;

            axios.get(apiurl)
                .then(res => setData({
                    ...data, celcius: res.data.main.temp, name: res.data.name,
                    humidity: res.data.main.humidity, speed: res.data.wind.speed, sit: res.data.weather[0].main
                },
                    console.log(res),
                    console.log(res.data.weather[0].main)
                ))
                .catch(err => {

                    // (err.response.request.status == 404) ? alert("Enter a valid City") : alert("Valid City")

                    if (err.response.request.status == 404)  {
                        alert("Enter a valid City")
                        // setError("Enter a valid City ");
                        // console.log(err.response.request.status)
                    }
                    else
                        alert("Valid")
                        // setError(" ");

                    console.log(err)
                });

        }
    }

    // getWeather();

    return (
        <section className='bg-temp h-screen'>

        <div className='flexCenter'>
        <a href="https://githubak2002.github.io/akportfolio" target='blank'><img className=' my-3 p-2 mx-auto h-14 transition-all hover:scale-125 px-4' src={logo} alt="logo" /></a>
        <h1 className='text-xl'>Weather app</h1>
        </div>

            <div className='flex items-start justify-center '>
            <main className='sm:min-w-[380px]  border-black border p-3'>

                <div className='flexCenter'>

                    <input type="search" placeholder='Enter a city' className='w-full p-2 bg-transparent border-[1.1px] border-black rounded-lg mx-2' value={city} onChange={(event) => setCity(event.target.value)} />
                    <button className="text-xl py-2 ri-search-line mx-1" onClick={getWeather} />
                </div>

            {/* ========= Hlp ========= */}

                <div>
                <h1 className='p-3 text-red-600 text-lg'>{error}</h1></div>

                <div className='mt-6 flex flex-col justify-center items-center'>
                    <img src="https://www.transparentpng.com/thumb/temperature/cloudy-rain-weather-temperature-png-pictures-35.png" alt="default-weather-img" className='h-[140px]' />

                    <div className='flex mb-4 items-center'>
                        <h1 className='border-black border-r-2 px-2 text-3xl sm:text-5xl'>{data.celcius}° C</h1>
                        <h1 className='px-2  text-2xl sm:text-3xl'>{data.sit}</h1>
                    </div>
                    <h2 className='text-4xl sm:text-6xl px-[40px] mb-5'>{data.name}</h2>
                </div>

                <div className='m-4 flex justify-evenly items-center'>
                    <div className='mx-4 sm:flexCenter flex flex-col'>
                        {/* <i class="ri-water-percent-fill"></i> */}
                        <img src={humiditypng} alt="water drop clipart" className='w-6 h-auto m-2' />
                        <h1>Humidity <br /> {data.humidity} % </h1>
                    </div >

                    <div className='mx-4  sm:flexCenter flex flex-col'>
                        {/* <i lassName="ri-cloud-windy-line"></i> */}
                        <img src="https://www.transparentpng.com/thumb/wind/png-icon-wind-0.png" alt="png icon wind" className='m-1 h-auto w-8' />
                        <h1>Wind <br /> {data.speed} km/hr </h1>
                    </div>

                </div>

            </main>
            </div>
        </section>
    )
}

export default Weather