import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Context from '../Context'
import Blog from './Blog'
import * as blogService from '../services/blogs'

test('Blog component', async () => {
	const blog = {
		id: '123',
		title: 'Test Blog',
		url: 'http://testblog.com',
		likes: 5
	}

	const mockContextValue = {
		setBlogs: vi.fn()
	}

	const {container} = render(
		<Context.Provider value={mockContextValue}>
			<Blog blog={blog} />
		</Context.Provider>
	)

	expect(screen.getByText('Test Blog')).toBeDefined()
	expect(screen.queryByText('http://testblog.com')).toBeNull()
	expect(screen.queryByText('5')).toBeNull()

	container.querySelector('#accordion-header')

	const user = userEvent.setup()

	await user.click(container.querySelector('#accordion-header'))

	expect(screen.getByText('Test Blog')).toBeDefined()
	expect(screen.getByText('http://testblog.com')).toBeDefined()
	expect(screen.getByText('5')).toBeDefined()
})	

// Mock the incrementLike function directly not as props of Blog component
vi.mock('../services/blogs', () => ({
	incrementLike: vi.fn()
}))

test('addLike function', async () => {
	const blog = {
		id: '123',
		title: 'Test Blog',
		url: 'http://testblog.com',
		likes: 5
	}

	const mockContextValue = {
		setBlogs: vi.fn()
	}

	const user = userEvent.setup()

	const {container} = render(
		<Context.Provider value={mockContextValue}>
			<Blog blog={blog} />
		</Context.Provider>
	)

	const accordionHeader = container.querySelector('#accordion-header')

	await user.click(accordionHeader)

	const likeButton = screen.getByRole('button', {name: '+'})

	await user.click(likeButton)
	await user.click(likeButton)

	expect(blogService.incrementLike.mock.calls).toHaveLength(2)

})
