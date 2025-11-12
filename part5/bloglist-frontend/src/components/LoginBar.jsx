import {useContext} from 'react'
import Context from '../Context'

const LoginBar = () => {
    const {user, setUser} = useContext(Context)

    function handleLogout(event) {
        event.preventDefault()

        window.localStorage.removeItem('loggedUser')

        setUser(null)
    }

    return (
        <div style={{
            padding: '10px 25px',
            backgroundColor: 'green',
            color: 'lightgreen',
            fontFamily: 'monospace',
            fontSize: '14px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <p style={{
                margin: '0'
            }}>
                Welcome, {user.name}! {'('}@{user.username}{')'}
            </p>
            <button
            onClick={handleLogout}
            className='text-button'
            style={{
                color: 'inherit',
                fontFamily: 'inherit'
            }}
            >
                log out
            </button>
        </div>
    )
}

export default LoginBar
