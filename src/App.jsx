import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data,setData] = useState(null);
  const [CityName,setCityName] = useState('');
  const [Cargando,setCargando] = useState(false);



 const obtenerClima = async() =>{
  setCargando(true)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&units=metric&appid=c9e5dc89be5b552ae0b30be74837da4a`)
 
  .then((res)=>{
    console.log(res.data)
    setData(res.data)
    setCargando(false)
    
  })
.catch((error) => {
   alert("pais o ciudad no encontrada")
   console.log(error)
   setCargando(false)
})

useEffect(() =>{
  obtenerClima()
 },[])



  
 }


  return (
    
    <div className="App">
        <div className='container'>

          


          <h1>App Del Clima</h1>

          

            <input type="text" className='input' name='text' placeholder='ingrese un pais / ciudad' onChange={(e) => {setCityName(e.target.value)}} list='lista' required/>

            <datalist name="" id="lista" className='lista'>
                <option value="Argentina"></option>
                <option value="Brasil"></option>
                <option value="Colombia"></option>
                <option value="Costa Rica"></option>
                <option value="España"></option>
                <option value="Estados Unidos"></option>
                <option value="Mexico"></option>
                <option value="Perú"></option>
            </datalist>


          <button className='btn' onClick={() => {obtenerClima()
          }}>obtener clima</button>

           
          {Cargando && <div class="ui-loader loader-blk">
    <svg viewBox="22 22 44 44" class="multiColor-loader">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
    </svg>
</div>}
        

          
          { data ? (
            
          <>
            <div className='clima'>
              
              <h3>Temperatura Actual: {data.main.temp}°C </h3>
              <h3>Sensacion Termica: {data.main.feels_like} °C</h3>
              <h3>Humedad: {data.main.humidity} %</h3>
              <h3>Viento: {data.wind.speed} m/s</h3>
              <h3>Nubosidad: {data.clouds.all} %</h3>
              <h3>Descripcion: {data.weather[0].description}</h3>

              <div className='icon'>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}></img>
              </div>
              </div>
              
              </>
          ):(
           <>
           <p className='by'>Creado Por <a className='by' href="https://github.com/Tobiassl" target='_blank'>Tobias Potel</a></p></>
          )}

        </div>

    </div>
    
    
    
  )
}

export default App
