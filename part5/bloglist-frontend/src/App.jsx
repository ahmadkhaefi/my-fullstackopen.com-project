import {useState, useEffect} from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import LoginBar from './components/LoginBar'
import BlogForm from './components/BlogForm'
import Notif from './components/Notif'
import Togglable from './components/Togglable'

import Context from './Context'

import * as blogService from './services/blogs'
import * as loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState()
	const [notif, setNotif] = useState()

	useEffect(() => {
		async function fetchBlogs() {
			const blogs = await blogService.getAll()

			setBlogs(blogs)
		}

		fetchBlogs()
	}, [])

	useEffect(() => {
		if (!user) {
			const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

			console.log(loggedUser)

			if (loggedUser) {
				setUser(loggedUser)
				loginService.setToken(loggedUser.token)
			}
		}
	}, [user])

	const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

	async function createBlog({title, url, likes}) {
		const newBlog = await blogService.add({title, url, likes})
		
		setBlogs([...blogs, newBlog])
		setNotif({
			message: 'Blog has been successfully created.',
			type: 'success'
		})
	}

	return (
		<Context.Provider value={{
			user,
			setUser,
			blogs,
			setBlogs,
			notif,
			setNotif
		}}>
			<div>
				{user && <LoginBar/>}
				<div style={{
					padding: '35px'
				}}>
					<Notif/>
					{user ? (
						<>
							<h2>Blogs</h2>
							<Togglable label='Create New Blog'>
								<h3>Create an New Blog</h3>
								<BlogForm createBlog={createBlog}/>
							</Togglable>
							<h3>Recent blogs by @{user.username}</h3>
							{sortedBlogs.map(blog =>
								<Blog key={blog.id} blog={blog}/>
							)}
						</>
					) : (
						<Login/>
					)}
				</div>
			</div>
		</Context.Provider>
	)
}

export default App
