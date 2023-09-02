import React from 'react';
import '../CSS/weather.css';


function Weather(){

    function check(){
    var city_name=document.getElementById('name');
    var api_key = '5322cebdccfe7e25a4de0eca4003268e';

    if(city_name.value.trim() === ''){
        alert('Please Enter Your City Name');
    }
    else
    {

    alert('Wait Fetching Your City Weather Record');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name.value}&appid=${api_key}`,{
    method:'GET',
    })
    .then((Response) => Response.json())
    .then((json) => {
        display(json);
    })
    .catch((error) => {
        console.log(error)
        alert('Check your Network Connection');
        var head=document.getElementById('title');
        head.innerText=`Check Network Connection`;
    });

    city_name.value='';
    }
    }

    function display(json){
        var tab = document.getElementById('tab2');
        var tbody=tab.querySelector('tbody');
        var head=document.getElementById('title');
        head.innerText=`WEATHER RECORD`;
        var sunrise1=new Date(json.sys.sunrise * 1000);
        var sunset1=new Date(json.sys.sunset * 1000);
        var temp= json.main.temp;  // this temperature unit in kelvin
        var temp2=json.main.feels_like;
        var celcius_temp=Math.round((temp-273.15));
        var feels_temp=Math.round((temp2-273.15));
        console.log('Temperature: ',temp, ' ', celcius_temp);
        var wind_direction;
        if (json.wind.deg<45)
        {
            wind_direction='North Side';
        }
        else
        if(json.wind.deg>46 && json.wind.deg<135){
            wind_direction='East Side';
        }
        else
        if(json.wind.deg>136 && json.wind.deg<225){
            wind_direction='South Side';
        }
        else
        if(json.wind.deg>226 && json.wind.deg<360){
            wind_direction='East Side';
        }
        var sunrise=sunrise1.toLocaleTimeString();
        var sunset=sunset1.toLocaleTimeString();
        var content1 = `
        <tr><td><strong>Name: </strong> ${json.name}</td></tr>
        <tr><td><strong>Weather: </strong> ${json.weather[0].description}</td></tr>
        <tr><td><strong>Humidity: </strong> ${json.main.humidity}</td></tr>
        <tr><td><strong>Sunrise: </strong> ${sunrise}</td></tr>
        <tr><td><strong>Sunset: </strong> ${sunset}</td></tr>
        <tr><td><strong>Temperature: </strong> ${celcius_temp} deg</td></tr>
        <tr><td><strong>Temperature Feels like: </strong> ${feels_temp} deg</td></tr>
        <tr><td><strong>Country: </strong> ${json.sys.country}</td></tr>
        <tr><td><strong>Wind Speed: </strong> ${json.wind.speed} m/s</td></tr>
        <tr><td><strong>Wind Direction: </strong> ${wind_direction}</td></tr>`;
        console.log(json, ' ', json.weather[0].description);
        tbody.innerHTML = content1;

    }

    return(
        <div className='Weather'>
            <h1 id='title1'>Finding Weather information in your City</h1>
            <div className='city'>
                <input type='text' id='name' placeholder='e.g:- Lahore' autoFocus='' /><br /><br/><br />
                <button onClick={check}>Check Weather</button>
                <div className='dis'>
                    <h1 id='title'> </h1>
                    <table id='tab2'>
                        <tbody>
                        </tbody>
                    </table>
            </div>
            </div>
        </div>
    )
}

export default Weather;

