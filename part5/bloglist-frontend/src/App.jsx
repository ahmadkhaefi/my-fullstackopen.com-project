import {useState, useEffect} from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import LoginBar from './components/LoginBar'
import BlogForm from './components/BlogForm'
import Notif from './components/Notif'
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
					{!user && <Login/>}
					{user && <>
						<h2>blogs</h2>
						<h3>Create an New Blog</h3>
						<BlogForm/>
						<h3>Blogs</h3>
						{blogs.map(blog =>
							<Blog key={blog.id} blog={blog}/>
						)}
					</>}
				</div>
			</div>
		</Context.Provider>
	)
}

export default App
