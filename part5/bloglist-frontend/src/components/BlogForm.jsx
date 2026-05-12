import {useState} from 'react'

import Context from '../Context'

const BlogForm = ({createBlog}) => {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [likes, setLikes] = useState('')

	async function createBlogHandler(event) {
		event.preventDefault()

		await createBlog({title, url, likes})

		setTitle('')
		setUrl('')
		setLikes('')
	}

	return (
		<div>
			<form onSubmit={createBlogHandler} style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'start'
			}}>
				<label>
					title
					<input
						type="text"
						name="title"
						placeholder="title"
						style={{
							display: 'block',
							marginBottom: '10px'
						}}
						value={title}
						onChange={event => setTitle(event.target.value)}
					/>
				</label>
				<label>
					url
					<input
						type="text"
						name="url"
						placeholder="url"
						style={{
							display: 'block',
							marginBottom: '10px'
						}}
						value={url}
						onChange={event => setUrl(event.target.value)}
					/>
				</label>
				<label>
					likes
					<input
						type="number"
						name="likes"
						placeholder="likes"
						style={{
							display: 'block',
							marginBottom: '10px'
						}} 
						value={likes}
						onChange={event => setLikes(event.target.value)}
					/>
				</label>
				<button
					type="submit"
					className="button"
					style={{
						display: 'block',
						marginBottom: '10px',
						marginTop: '10px'
					}}
				>submit
				</button>
			</form>            
		</div>
	)
}

export default BlogForm
