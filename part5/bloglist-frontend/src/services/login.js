import axios from 'axios'

const BASE_URL = '/api/login'

let token = null

export function setToken(t) {
    token = `bearer ${t}`
}

export async function login({username, password}) {
    const response = await axios.post(
        BASE_URL,
        {username, password}
    )

    return response.data
}
