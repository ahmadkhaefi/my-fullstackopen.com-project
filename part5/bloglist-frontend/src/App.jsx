import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Context from './Context'
import * as blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState()

	useEffect(() => {
		async function fetchBlogs() {
			const blogs = await blogService.getAll()

			setBlogs(blogs)
		}

		fetchBlogs()
	}, [])

	return (
		<Context.Provider value={{
			user, setUser
		}}>
			<div style={{
				padding: '35px'
			}}>
			{!user && <Login/>}
				{user && <>
					<h2>blogs</h2>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog}/>
					)}
				</>}
			</div>
			{user && (
				<div>
					hello @{user.username}
				</div>
			)}
		</Context.Provider>
	)
}

export default App
