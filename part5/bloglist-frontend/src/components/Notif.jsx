import {useContext, useEffect} from 'react'
import Context from '../Context'

const Notif = () => {
    // const [visible, setVisible] = useState(true)
    const {notif, setNotif} = useContext(Context)

    let backgroundColor
    let color

    switch (notif?.type) {
        case 'failure':
            backgroundColor = '#ffe9e9'
            color = '#ff2323'
            break
        case 'success':
            backgroundColor = '#dcfee1'
            color = '#04af04'
            break
        default:
            break
    }

    useEffect(() => {
        if (notif) {
            const timer = setTimeout(() => {
                setNotif(null)
            }, 3000)

            return () => {
                clearTimeout(timer)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notif])

    return notif && (
        <div
        style={{
            backgroundColor,
            color,
            borderRadius: '10px',
            padding: '25px'
        }}
        >
            {notif.message}
        </div>
    )
}

export default Notif
