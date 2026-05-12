import {useState, useContext} from 'react'
import * as blogService from '../services/blogs'

import Context from '../Context'

const styles = {
	accordion: {
		border: '4px solid dodgerblue',
		borderRadius: '5px',
		marginBottom: '10px',
		transition: '0.3s ease-in-out'
	},
	accordionHeader: {
		width: '100%',
		position: 'relative',
		padding: '15px 35px',
		cursor: 'pointer'
	},
	accordionContent: {
		padding: '25px 35px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	accordionToggleButton: {
		position: 'absolute',
		top: '50%',
		right: '25px',
		transform: 'translateY(-50%)',
		color: 'dodgerblue',
		fontFamily: 'monospace',
		fontWeight: 'bold',
		fontSize: '25px',
		pointer: 'cursor',
		userSelect: 'none'
	},
	likeButton: {
		color: 'white',
		fontSize: '24px',
		outline: 'none',
		border: 'none',
		background: 'crimson',
		cursor: 'pointer',
		borderRadius: '7px',
	},
	likeContainer: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px'
	}
}

const Blog = ({blog}) => {
	const [visible, setVisible] = useState(false)
	const [addLikeRequestReady, setAddLikeRequestReady] = useState(true)

	const {setBlogs} = useContext(Context)

	async function addLike(blog) {
		if (!addLikeRequestReady) {
			return
		}

		setAddLikeRequestReady(false)
		
		const returnedBlog = (await blogService.incrementLike(blog))

		setAddLikeRequestReady(true)
		
		setBlogs(prevBlogs => prevBlogs.map(b => b.id === blog.id ? returnedBlog : b))
	}

	function deleteBlog() {
		if (visible) {
			if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
				blogService.deleteBlog(blog)

				setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id))
			} 
		}
	}

	return (
		<div
			style={styles.accordion}
			onClick={() => deleteBlog()}
		>
			<div
				onClick={() => setVisible(!visible)}
				style={styles.accordionHeader}
				id='accordion-header'
			>
				<span style={styles.accordionToggleButton}>
					{visible ? '-' : '+'}
				</span>
				<h4
					style={{
						margin: '0',
						userSelect: 'none'
					}}
				>
					{blog.title}
				</h4>
			</div>
			{visible && (
				<div style={styles.accordionContent}
				>
					<p
						style={{
							margin: '0'
						}}
					>
						{blog.url}
					</p>
					<div style={styles.likeContainer}>
						<span>{blog.likes}</span>
						<button
							style={styles.likeButton}
							onClick={() => addLike(blog)}
							disabled={!addLikeRequestReady}
						>
							+
						</button>
					</div>
				</div>
			)}
		</div>  
	)
}

export default Blog
