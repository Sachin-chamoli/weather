import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputCity, setInputCity] = useState("");
  const [main, setMain]= useState({});
  const [name, setName] = useState('');

  async function getWeatherDetails(city){
    if(!city) {
      
      return
    }
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
    console.log("hello useeffect");
   
    getWeatherDetails();
  }, [inputCity])

  const handleInput = (e) =>{
    setInputCity(e.target.value);
  }
  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }

  const currLocation = () =>{
    navigator.geolocation.getCurrentPosition(async (position) => {
     let  lat = position.coords.latitude;
     let  long = position.coords.longitude;
     console.log(lat,long)
      const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cc76b116d96d38e2b9c1c3c76abafbb1`;
          let data1 = await fetch(url1);
          let parsedData1 = await data1.json();  

          if(!parsedData1.main) {
            setName('No data found')
            setMain({})
            return
          }
          setMain(parsedData1.main);
         setName(parsedData1.name) ;
    });

  }

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className='rounded shadow py-1 px-2  heading'>Weather App</h1>

    <div className="d-grid col-4 mt-4">
    <input type="text" className='form-control'  onChange={handleInput} />
    </div>
    <div className='d-flex justify-content-center mt-2'>
    <button className='btn my-1 btn-success mx-2 ' type='button' onClick={handleSearch} >Search</button>
    <button className='btn my-1 btn-success mx-2' type='button' onClick={currLocation} >Current Location</button>
    </div>
  </div>

  <div className="col-md-12 text-center mt-5">
      <div className="shadow rounded weatherResultBox " >
        <img className="weatherIcon" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt='u'  />

        <p className='weatherCity'>{name}</p>
        <p className="weatherTemp"><i className="fa-solid fa-temperature-half"></i>{((main.temp)-273.15).toFixed(2)} °C</p>
        <p className="weatherPressure">Pressure : {main.pressure} millibars</p>
        <p className="weatherHumidity">Humidity : {main.humidity}%</p>

      </div>
    </div>  
  
  </div>
  );
}

export default App;
