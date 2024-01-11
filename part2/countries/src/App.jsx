import { useState, useEffect } from 'react'
import axios from 'axios'



const RenderAll = (props) => {
  const filterFunc = (country) => country.name.common.toLowerCase().includes(props.search.toLocaleLowerCase())
  const resultList = props.allCountries.filter(filterFunc)

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
          {resultList.map(rec => <li key={rec.name.common}>{rec.name.common}</li>)}
        </ul>
      </div>
    );
  }
}

const RenderSingle = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(rec => <li key={rec}>{rec}</li>)}
      </ul>
      <img src={country.flag}/>
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
      <RenderAll allCountries={allCountries} search={search}/>
    </div>
  )
}

export default App
