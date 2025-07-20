import {useEffect, useState} from 'react'

export default ({message, setMessage}) => {
    useEffect(() => {
        const clearMessageTimeout = setTimeout(() => {
            if (message?.content) {
                setMessage(null)
            }
        }, 3000)

        return () => {
            clearTimeout(clearMessageTimeout)
        }
    }, [message])
    
    if (message?.message) {
        return null
    }

    return (
        <div className={message?.type}>
            {message?.content}
        </div>
    )
}
