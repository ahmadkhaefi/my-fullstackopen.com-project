import axios from 'axios'
import {useState, useEffect, useContext, createContext} from 'react'
import {getWeatherInfo} from './services/weather'

const appContext = createContext()

const MatchingCountries = () => {
	const {
		filteredCountries: countries,
		setCountryToDisplay
	} = useContext(appContext)

	function showCountry(country) {

		return () => {
			setCountryToDisplay(country)
		}
	}

	return (
		<ul>
			{countries.map(i => 
				<li key={i.name.common}>
					{i.name.common}
					<button onClick={showCountry(i)}>
						show
					</button>
				</li>
			)}
		</ul>
	)
}

const Country = () => {
	const [weatherInfo, setWeatherInfo] = useState(null)

	const {countryToDisplay: country} = useContext(appContext)

	useEffect(() => {
		getWeatherInfo(country.capital[0]).then(weather => {
			setWeatherInfo(weather)
		})
	}, [country])

	return (
		<div>
			<h1>
			{country.name.common}
			</h1>
			<div>
				Capital {country.capital}
			</div>
			<div>
				Area {country.area}
			</div>
			<h2>Languages</h2>
			<ul>
				{Object.values(country.languages).map(i => 
					<li key={i}>{i}</li>
				)}
			</ul>
			<img width={200} src={country.flags.svg}/>
			<h2>Weather in {country.capital}</h2>
			{weatherInfo ? (
				<div>
					<p>
						Temperature {Math.floor(weatherInfo.main.temp - 273.15)} °C
					</p>
					<img width={75} src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}/>
					<p>Wind {weatherInfo.wind.speed} m/s</p>
				</div>
			) : null}
		</div>
	)
}

const Filter = () => {
	const [query, setQuery] = useState('')
	const [allCountries, setAllCountries] = useState([])

	const {setFilteredCountries} = useContext(appContext)

	useEffect(() => {
		const allCountriesURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

		axios
			.get(allCountriesURL)
			.then(response => response.data)
			.then(countries => setAllCountries(countries))
	}, [])

	useEffect(() => {
		if (allCountries.length === 0) return
	
		setFilteredCountries(allCountries.filter(i => 
			i.name.common.toLowerCase().includes(query.toLowerCase())
		))

		return () => {
			setFilteredCountries([])
		}
	}, [query, allCountries])

	return (
		<div>
			<label>find countries</label>
			<input value={query} onChange={event => setQuery(event.target.value)}/>
		</div>
	)
}

function App() {
	const [filteredCountries, setFilteredCountries] = useState([])
	const [countryToDisplay, setCountryToDisplay] = useState(null)

	useEffect(() => {
		if (filteredCountries.length === 1) {
			setCountryToDisplay(filteredCountries[0])
		}

		return () => {
			setCountryToDisplay(null)
		}
	}, [filteredCountries])
	
	return (
		<appContext.Provider
			value={{
				filteredCountries,
				setFilteredCountries,
				countryToDisplay,
				setCountryToDisplay
			}}
		>
			<div>
				<Filter/>
				{
					countryToDisplay ?
					<Country/> :
					filteredCountries.length > 10 ?
					<p>Too many matches</p> :
					<MatchingCountries/> 
				}
				</div>
		</appContext.Provider>
	)
}

export default App
