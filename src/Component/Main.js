import React, { useEffect ,useState,useRef} from "react";
import "../App.css";

const Main = () => {
const name=useRef(null);
const [temperature,setTemperature]=useState(45);
const[icon,setIcon]=useState("03d");
const[description,setdescription]=useState("Partly cloud");
const[humidity,setHumidity]=useState(48);
const [max_temp,setMax_temp]=useState(45);
const [min_temp,setMin_temp]=useState(12);
const [wind,setWind]=useState(67);
const[info,setInfo]=useState(null);
const [search,setSearch]=useState("Mumbai");




let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8ada6c990d54ea2fb524366392eb2f00`;
    
const fetchdata = async () => {

      let response = await fetch(url);
      let data = await response.json();
   
      console.log(data);
    
  setInfo(data);
  setTemperature(info.main.temp);
  setHumidity(info.main.humidity);
  setWind(info.wind.speed);
  setMax_temp(info.main.temp_max);
  setMin_temp(info.main.temp_min);
  setIcon(info.weather[0].icon);
  setdescription(info.weather[0].description);


}
useEffect(() => {
  fetchdata();
},[search]);
  return (
    <>
     <nav className="navbar">
            <h1 className="logo">Weatherly</h1>
          </nav>
          <hr/>
         <div className="container">
         
          <div className="search">
            <input type="search" id="search"  ref={name} placeholder="Search"  onChange={(event)=>{setSearch(event.target.value)}
            }/>
            <button className="search-btn"  onClick={(event)=>{event.preventDefault(); setSearch(name.current.value); if(name.current.value===""){
              alert('Enter Location')
            }} }><i className="fa-solid fa-magnifying-glass" ></i></button>
          </div>
          <h1 className="location">{search.toUpperCase()}</h1>
          <div className="info">
            <img src={`http://openweathermap.org/img/w/${icon}.png`} />
            <h1 className="temp">{temperature}°C</h1>||
            <h1 className="description">{description}</h1>
            </div>
            <div className="rest-info">
              <h4 className="max-temp">Max-temp:{max_temp} ℃</h4>
              <h4 className="min-temp">Min-temp: {min_temp}  ℃</h4>
              <h4 className="humidity">Humidity :{humidity} %</h4>
              <h4 className="windspeed">Wind: {wind} m/s</h4>
            </div>
          </div>
        
    </>
  );
}

export default Main
