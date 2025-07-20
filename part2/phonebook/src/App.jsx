import {useEffect, useState, useContext, createContext} from 'react'
import * as personService from './services/persons'
import Notification from './components/Notification'

const appContext = createContext()

const TableItem = ({person}) => {
	const {persons, setPersons, setMessage} = useContext(appContext)

	function deletePerson() {
		if (confirm(`Are you sure you want to delete "${person.name}" (id: ${person.id})`)) {
			personService
				.remove(person.id)
				.then(returnedPerson => {
					setPersons(persons.filter(person => person.id !== returnedPerson.id))
				})
				.catch(error => {
					if (error.response.status) {
						setMessage({
							content: `${person.name} is already deleted.`,
							type: 'error'
						})
					}
				})
		}
	}

	return (
		<>
		<td>name: {person.name}</td>
		<td>number: {person.number}</td>
		<td>
			<button onClick={deletePerson} className='text-button'>delete</button>
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

	const {
		persons,
		setPersons,
		message,
		setMessage
	} = useContext(appContext)

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
						setMessage({content: 'Person updated successfully', type: 'success'})
					})
					.catch(error => {
						if (error.response.status === 404) {
							setMessage({
								content: `${newPerson.name} is already deleted.`,
								type: 'error'
							})
						}
					})
			}
		} else {
			personService
				.add(newPerson)
				.then(returnedPerson => {
					setPersons([...persons, returnedPerson])
					setNewPerson({name: '', number: ''})
					setMessage({content: 'Person added successfully', type: 'success'})
				})
		}
	}
	
	return (
		<form onSubmit={addNewPerson} className='person-form'>
			<div>
				<label>name</label>
				<input
				value={newPerson.name}
				onChange={handleNameInput}
				placeholder='name'
				/>
			</div>
			<div>
				<label>number</label>
				<input
				value={newPerson.number}
				onChange={handleNumberInput}
				placeholder='number'
				/>
			</div>
			<div>
				<button type="submit" className='block-button'>add</button>
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
		<input onChange={doSearch} placeholder="search for persons"/>
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
	const [message, setMessage] = useState({
		type: '',
		content: ''
	})

	useEffect(() => {
		personService
			.all()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	return (
		<appContext.Provider
		value={{
			persons,
			setPersons,
			message,
			setMessage
		}}
		>
			<div>
				<h1>Phonebook</h1>
				<Notification message={message} setMessage={setMessage}/>
				<div>
					<h3>Filter</h3>
					<Filter/>
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
