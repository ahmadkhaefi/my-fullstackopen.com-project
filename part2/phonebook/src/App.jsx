import {useEffect, useState, useContext, createContext} from 'react'
import * as personService from './services/persons'

const appContext = createContext()

const TableItem = ({person}) => {
	const {persons, setPersons} = useContext(appContext)

	function deletePerson() {
		if (confirm(`Are you sure you want to delete "${person.name}" (id: ${person.id})`)) {
			personService
				.remove(person.id)
				.then(returnedPerson => {
					setPersons(persons.filter(person => person.id !== returnedPerson.id))
				})
		}
	}

	return (
		<>
		<td>name: {person.name}</td>
		<td>number: {person.number}</td>
		<td>
			<button onClick={deletePerson}>delete</button>
		</td>
		</>
	)
}

const Table = ({personsToDisplay}) => {
	const {persons} = useContext(appContext)

	return (
		<table>
			<tbody>
				{personsToDisplay.map(person =>
					<tr key={person.id}>
						<TableItem person={person} persons={persons}/>
					</tr>
				)}
			</tbody>
		</table>
	)
}

const PersonForm = () => {
	const [newPerson, setNewPerson] = useState({
		name: '',
		number: ''
	})

	const {persons, setPersons} = useContext(appContext)

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
			const replacePersonNumber = confirm(
				`${newPerson.name} is already added to phonebook. Replace the old number with the new one?`
			)

			if (replacePersonNumber) {
				const personWithSameName = persons.find(person => person.name === newPerson.name)
				personWithSameName.number = newPerson.number

				personService
					.replaceNumber(personWithSameName)
					.then(returnedPerson => {
						setPersons(persons.filter(person => person.name === returnedPerson.name ? returnedPerson : person))
						setNewPerson({name: '', number: ''})
					})
			}
		} else {
			personService
				.add(newPerson)
				.then(returnedPerson => {
					setPersons([...persons, returnedPerson])
					setNewPerson({name: '', number: ''})
				})
		}
	}
	
	return (
		<form onSubmit={addNewPerson}>
			<div>
				name: <input value={newPerson.name} onChange={handleNameInput}/>
			</div>
			<div>
				number: <input value={newPerson.number} onChange={handleNumberInput}/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Filter = () => {
	const [query, setQuery] = useState('')

	const {persons} = useContext(appContext)

	function doSearch(event) {
		setQuery(event.target.value.toLowerCase())
	}

	const searchResults = persons.filter(i => i.name.toLowerCase().includes(query))

	return (
		<>
		<input onChange={doSearch}/>
		<Table persons={persons} personsToDisplay={searchResults}/>
		</>
	)
}

const Persons = () => {
	const {persons} = useContext(appContext)

	return (
		<Table persons={persons} personsToDisplay={persons}/>
	)
}

const App = () => {
	const [persons, setPersons] = useState([]) 

	useEffect(() => {
		personService
			.all()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	return (
		<appContext.Provider value={{persons, setPersons}}>
			<div>
				<div>
					<h3>Phonebook</h3>
					<div>
						<h3>Filter</h3>
						<Filter/>
					</div>
				</div>
				<div>
					<h3>Add a New Person</h3>
					<PersonForm/>
				</div>
				<div>
					<h3>Persons</h3>
					<Persons/>
				</div>
			</div>
		</appContext.Provider>
	)
}

export default App
