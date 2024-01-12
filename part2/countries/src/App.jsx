import { useState, useEffect } from 'react'
import axios from 'axios'
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY



const RenderAll = (props) => {
  const filterFunc = (country) => country.name.common.toLowerCase().includes(props.search.toLocaleLowerCase())
  const resultList = props.allCountries.filter(filterFunc)
  
  const [clickedCountry, setClickedCountry] = useState(null)
  const handleClick = (country) => {
    console.log('clicked', country)
    setClickedCountry(country)
  }

  if(resultList.length === 0){
    return <p>no results</p>
  } else if (resultList.length === 1){
    return <RenderSingle country={resultList[0]}/>
  } else if(resultList.length > 10){
    return <p>too many results, specify filter</p>
  } else {
    return (
      <div>
        <ul>
          {resultList.map(rec => {
            return (
              <li key={rec.name.common}>
                {rec.name.common}
                <button onClick={() => handleClick(rec)}>
                  show
                </button>
              </li>
            )
          })}
        </ul>
        {clickedCountry && <RenderSingle country={clickedCountry}/>}
      </div>
    );
  }
}

const RenderSingle = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(rec => <li key={rec}>{rec}</li>)}
      </ul>
      <img src={country.flag}/>
      <Weather capitalInfo={country.capitalInfo} capital={country.capital[0]}/>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      search country
      <input onChange={props.handler}/>
    </div>
  );
}


const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null)
  const lat = props.capitalInfo.latlng[0];
  const lon = props.capitalInfo.latlng[1];

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const response = axios.get(url).then(response => {
      setWeatherData(response.data)
      setImgUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    })
  }, [lat, lon])

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Weather in {props.capital}</h2>
          <p>Temperature: {weatherData.main.temp} Celcius</p>
          <img src={imgUrl}></img>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};




function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])

  const handleSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    const request = axios.get(url).then(response => {
      setAllCountries(response.data.sort((a,b) => a.name.common.localeCompare(b.name.common)))
    })
  }, [])

  return (
    <div>
      <Filter search={search} handler={handleSearch}/>
      <RenderAll allCountries={allCountries} search={search} />
    </div>
  )
}

export default App
