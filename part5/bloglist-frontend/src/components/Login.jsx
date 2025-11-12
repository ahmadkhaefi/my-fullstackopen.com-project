import {useState, useContext} from 'react'
import Context from '../Context'
import {login} from '../services/login'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(Context) 

    async function handleLogin(event) {
        event.preventDefault()

        const user = await login({username, password})

        console.log({username, password})

        setUser(user)
    }

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <label>
                    username
                    <input
                        name='username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        type='text'
                        style={{
                            display: 'block',
                            marginBottom: '10px'
                        }}
                    />
                </label>
                <label>
                    password
                    <input
                        name='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        type='password'
                        style={{
                            display: 'block',
                            marginBottom: '10px'
                        }}
                    />
                </label>
                <button type='submit' style={{display: 'block'}}>
                    submit
                </button>
            </form>
        </div>
    )
}

export default Login
