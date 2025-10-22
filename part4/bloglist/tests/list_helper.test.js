import {test, describe} from 'node:test'
import {deepStrictEqual, strictEqual} from 'node:assert'
import {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes} from '../utils/list_helper.js'
import {blogs, listWithOneBlog} from './test_helper.js'

test('dummy returns one', () => {
    const blogs = []

    strictEqual(dummy(blogs), 1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        strictEqual(totalLikes(listWithOneBlog), 2)
    })

    test('calculate all likes', () => {
        strictEqual(totalLikes(blogs), 29)
    })
})

describe('favorite blog', () => {
    test('the favorite blog in a single-blog list', () => {
        deepStrictEqual(favoriteBlog(listWithOneBlog), listWithOneBlog[0])
    })

    test('favorite blog in a generic list', () => {
        deepStrictEqual(favoriteBlog(blogs), blogs[1])
    })
})

describe('author with most blogs', () => {
    test('author with most blogs', () => {
        deepStrictEqual(
            mostBlogs(blogs),
            {
                author: 'Robert C. Martin',
                blogs: 2
            }
        )
    })
})

describe('author with most likes', () => {
    test('author with most likes', () => {
        deepStrictEqual(
            mostLikes(blogs),
            {
                author: 'Edsger W. Dijkstra',
                likes: 12
            }
        )
    })
})
