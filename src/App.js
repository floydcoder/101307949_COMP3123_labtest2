import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a53d72c70590c6472960bdd1789bf513`;

  const searchCity = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setCity('');
    }
  };

  return (
    <div className='app'>
      <div className='search'>
        <input
          type='text'
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder='Enter City'
          onKeyDown={searchCity}
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className='description'>
            {data.main ? <p className='bold'>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* BOTTOM */}
        {data.name != undefined && (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? (
                <p className='bold'>{data.main.feels_like.toFixed()}</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? (
                <p className='bold'>{data.wind.speed.toFixed()}</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
