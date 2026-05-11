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

export const incrementLike = async blog => {
	const {id, likes} = blog
	const response = await axios.patch(
		`${baseUrl}/${id}`,
		{likes: likes + 1},
		{
			headers: {
				Authorization: token
			}
		}
	)

	return response.data
}

export const deleteBlog = async blog => {
	const {id} = blog

	await axios.delete(
		`${baseUrl}/${id}`,
		{
			headers: {
				Authorization: token
			}
		}
	)
}
