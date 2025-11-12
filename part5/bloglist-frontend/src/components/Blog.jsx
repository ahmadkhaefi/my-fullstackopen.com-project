const Blog = ({blog}) => (
	<div>
		{blog.title} by @{blog.author.username}
	</div>  
)

export default Blog
