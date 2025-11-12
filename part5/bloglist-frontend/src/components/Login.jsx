import {useState, useContext} from 'react'
import Context from '../Context'
import {login} from '../services/login'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUser, setNotif} = useContext(Context) 

    async function handleLogin(event) {
        event.preventDefault()

        try {
            const user = await login({username, password})

            setUser(user)
            setNotif(null)

            window.localStorage.setItem('loggedUser', JSON.stringify(user))            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setNotif({
                    message: 'Username or password is invalid.',
                    type: 'failure'
                })
            } else {
                throw error
            }
        }
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
                <button type='submit' style={{display: 'block'}} className='button'>
                    submit
                </button>
            </form>
        </div>
    )
}

export default Login
