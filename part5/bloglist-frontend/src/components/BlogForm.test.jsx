import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm component', async () => {
	const createBlog = vi.fn()
	const user = userEvent.setup()

	render(<BlogForm createBlog={createBlog} />)

	await user.type(screen.getByLabelText('title'), 'Test Blog')
	await user.type(screen.getByLabelText('url'), 'http://testblog.com')
	await user.type(screen.getByLabelText('likes'), '5')
	await user.click(screen.getByText('submit'))

	expect(createBlog).toHaveBeenCalledTimes(1)
	expect(createBlog).toHaveBeenCalledWith({
		title: 'Test Blog',
		url: 'http://testblog.com',
		likes: '5'
	})
})

