import {useState, useContext} from 'react'

import Context from '../Context'

import * as blogService from '../services/blogs'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const {blogs, setBlogs, setNotif} = useContext(Context)

    async function sendBlog(event) {
        event.preventDefault()

        const newBlog = await blogService.add({title, url, likes})
        
        setBlogs([...blogs, newBlog])
        setTitle('')
        setUrl('')
        setLikes('')
        setNotif({
            message: 'Blog has been successfully created.',
            type: 'success'
        })
    }

    return (
        <div style={{
            marginBottom: '25px'
        }}>
            <form onSubmit={sendBlog} style={{
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
