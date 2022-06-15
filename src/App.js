import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputCity, setInputCity] = useState("");
  const [main, setMain]= useState({});
  const [name, setName] = useState('');

  async function getWeatherDetails(city){
    if(!city) return
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc76b116d96d38e2b9c1c3c76abafbb1`;
        
        let data = await fetch(url);

        let parsedData = await data.json();  
        if(!parsedData.main) {
          setName('No data found')
          setMain({})
          return
        }
       setName(parsedData.name) ;
       setMain(parsedData.main);
      
  }

  useEffect(()=>{
    getWeatherDetails();
  }, [inputCity])

  const handleInput = (e) =>{
    setInputCity(e.target.value);
  }
  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className='heading'>Weather App</h1>

  
    <div className="d-grid col-4 mt-4">
    <input type="text" className='form-control'  onChange={handleInput} />
    </div>
    <button className='btn my-3 btn-success' type='button' onClick={handleSearch} >Search</button>
  </div>

  <div className="col-md-12 text-center mt-5">
      <div className="shadow rounded weatherResultBox" style={{width:'30vw', height:'70vh'}}>
        <img className="weatherIcon" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt='u'  />

        <p className='weatherCity'>{name}</p>
        <p className="weatherTemp"><i class="fa-solid fa-temperature-half"></i>{((main.temp)-273.15).toFixed(2)} °C</p>
        <p className="weatherPressure">Pressure : {main.pressure} millibars</p>
        <p className="weatherHumidity">Humidity : {main.humidity}%</p>

      </div>
    </div>  
  
  </div>
  );
}

export default App;
