import {useState, useEffect} from 'react'
import './App.css'

function App() {
	const [count, setCount] = useState(0)
	const [counter, setCounter] = useState(0)
	
	function exponential(n) {
		return Math.log(n + 1)
	}

	useEffect(() => {
		if (exponential(count) >= 100) {
			setCounter(counter + 1)

			if (counter === 1) {
				setCount(0)
				setCounter(0)
			}
		}
	}, [count])

	return (
	<>
		<button onClick={() => setCount(count + 1)}>
		{exponential(count)}
		</button>
		<button onClick={() => setCount(0)}>reset</button>
		<div id="prog-bar">
			<div style={{width: `${exponential(count)}%`}}></div>
		</div>
	</>
	)
}

export default App
