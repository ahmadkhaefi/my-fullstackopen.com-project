import {useState} from 'react'

const Button = ({onClick, children}) => {
	return (
		<button
		onClick={onClick}
		style={{
			outline: 0,
			border: '1px solid #eee',
			backgroundColor: '#fafafa',
			borderRadius: '5px',
			cursor: 'pointer',
			padding: '5px 10px',
			marginLeft: '5px'
		}}
		>
			{children}
		</button>
	)
}

const StatisticLine = ({text, value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const all = good + bad + neutral

	if (all > 0) {
		return (
			<table>
				<tbody>
					<StatisticLine text="Good" value={good}/>
					<StatisticLine text="Neutral" value={neutral}/>
					<StatisticLine text="Bad" value={bad}/>
					<StatisticLine text="All" value={all}/>
					<StatisticLine text="Average" value={(good - bad) / all}/>
					<StatisticLine text="Positive" value={`${(good / all) * 100}%`}/>
				</tbody>
			</table>
		)
	} else {
		return <p>No feedback given.</p>
	}
} 

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	function goodButton() {
		setGood(good + 1)
	}

	function neutralButton() {
		setNeutral(neutral + 1)
	}

	function badButton() {
		setBad(bad + 1)
	}

	return (
		<div>
			<div>
				<h1>Give Feedback</h1>
				<Button onClick={goodButton}>GOOD</Button>
				<Button onClick={neutralButton}>NEUTRAL</Button>
				<Button onClick={badButton}>BAD</Button>
			</div>
			<div>
				<h1>Statistics</h1>
				<Statistics good={good} neutral={neutral} bad={bad}/>
			</div>
		</div>
	)
}

export default App
