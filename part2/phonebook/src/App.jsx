import {useEffect, useState} from 'react'
import axios from 'axios'

const Table = ({persons}) => {
	return (
		<table>
			<tbody>
				{persons.map(person =>
					<tr key={person.name}>
						<td>name: {person.name}</td>
						<td>number: {person.number}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

const PersonForm = ({onSubmit, inputs}) => {
	return (
		<form onSubmit={onSubmit}>
			{Object.entries(inputs).map(([label, input]) => (
				<div key={label}>
					{label}: <input value={input.value} onChange={input.handler}/>
				</div>
			))}
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Filter = ({onChange, persons}) => {
	return (
		<>
		<input onChange={onChange}/>
		<Table persons={persons}/>
		</>
	)
}

const Persons = ({persons}) => {
	return (
		<Table persons={persons}/>
	)
}

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newPerson, setNewPerson] = useState({
		name: '',
		number: ''
	})
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		axios
			.get('http://127.0.0.1:3001/persons')
			.then(response => {
				console.log()
				setPersons(response.data)
			})
	}, [])

	function handleNameInput(event) {
		setNewPerson({
			name: event.target.value,
			number: newPerson.number
		})
	}

	function handleNumberInput(event) {
		setNewPerson({
			name: newPerson.name,
			number: event.target.value
		})
	}
	
	function addNewPerson(event) {
		event.preventDefault()

		if (persons.some(i => i.name === newPerson.name)) {
			alert(`${newPerson.name} is already added to phonebook.`)
		} else {
			setPersons([...persons, newPerson])
		}
	}

	function doSearch(event) {
		const query = event.target.value.toLowerCase()

		setSearchResults(persons.filter(i => i.name.toLowerCase().includes(query)))
	}

	return (
	<div>
		<h2>Phonebook</h2>
		<div>
			<h3>Filter</h3>
			<Filter onChange={doSearch} persons={searchResults}/>
		</div>
		<div>
			<h3>Add a New Person</h3>
			<PersonForm
				inputs={{
					name: {handler: handleNameInput, value: newPerson.name},
					number: {handler: handleNumberInput, value: newPerson.number}
				}}
				onSubmit={addNewPerson}
			/>
		</div>
		<div>
			<h3>Persons</h3>
			<Persons persons={persons}/>
		</div>
	</div>
	)
}

export default App
