import {useState} from 'react'

const Togglable = props => {
	const [visible, setVisible] = useState(false)

	const {children, label} = props

	return (
		<div>
			{visible ? (
				<div>
					{children}
					<button
						className='button'
						style={{
							marginTop: '10px'
						}}
						onClick={() => setVisible(false)}
					>cancel</button>
				</div>
			) : <button className='button' onClick={() => setVisible(true)}>{label}</button>}
		</div>
	)
}

export default Togglable
