import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

export function all() {
    return axios.get(BASE_URL).then(response => response.data)
}

export function add(newPersonObject) {
    return axios.post(BASE_URL, newPersonObject).then(response => response.data)
}

export function remove(id) {
    return axios.delete(`${BASE_URL}/${id}`).then(response => response.data)
}

export function replaceNumber(newPersonObject) {
    return axios.put(`${BASE_URL}/${newPersonObject.id}`, newPersonObject).then(response => response.data)
}