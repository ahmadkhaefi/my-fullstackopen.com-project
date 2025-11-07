import {test, describe} from 'node:test'
import {deepStrictEqual, strictEqual} from 'node:assert'
import {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes} from '../utils/list_helper.js'
import * as helper from './helper.js'

test('dummy returns one', () => {
    const blogs = []

    strictEqual(dummy(blogs), 1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        strictEqual(totalLikes(helper.listWithOneBlog), 2)
    })

    test('calculate all likes', () => {
        strictEqual(totalLikes(helper.blogs), 29)
    })
})

describe('favorite blog', () => {
    test('the favorite blog in a single-blog list', () => {
        deepStrictEqual(favoriteBlog(helper.listWithOneBlog), helper.listWithOneBlog[0])
    })

    test('favorite blog in a generic list', () => {
        deepStrictEqual(favoriteBlog(helper.blogs), helper.blogs[1])
    })
})

describe('author with most blogs', () => {
    test('author with most blogs', () => {
        deepStrictEqual(
            mostBlogs(helper.blogs),
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
            mostLikes(helper.blogs),
            {
                author: 'Edsger W. Dijkstra',
                likes: 12
            }
        )
    })
})
