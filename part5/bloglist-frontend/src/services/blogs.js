import axios from 'axios'
import {token} from './login'

const baseUrl = '/api/blogs'

export const getAll = async () => {
	const request = axios.get(baseUrl)
	const response = await request

	return response.data
}

export const add = async ({title, url, likes}) => {
	const response = await axios.post(
		baseUrl,
		{title, url, likes},
		{
			headers: {
				Authorization: token
			}
		}
	)

	return response.data
}
