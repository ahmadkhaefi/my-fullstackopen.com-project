import {test, describe} from 'node:test'
import {deepStrictEqual, strictEqual} from 'node:assert'
import {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes} from '../utils/list_helper.js'

test('dummy returns one', () => {
    const blogs = []

    strictEqual(dummy(blogs), 1)
})

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        strictEqual(totalLikes(listWithOneBlog), 5)
    })

    test('calculate all likes', () => {
        strictEqual(totalLikes(blogs), 36)
    })
})

describe('favorite blog', () => {
    test('the favorite blog in a single-blog list', () => {
        deepStrictEqual(favoriteBlog(listWithOneBlog), listWithOneBlog[0])
    })

    test('favorite blog in a generic list', () => {
        deepStrictEqual(favoriteBlog(blogs), blogs[2])
    })
})

describe('author with most blogs', () => {
    test('author with most blogs', () => {
        deepStrictEqual(
            mostBlogs(blogs),
            {
                author: "Robert C. Martin",
                blogs: 3
            }
        )
    })
})

describe('author with most likes', () => {
    test('author with most likes', () => {
        deepStrictEqual(
            mostLikes(blogs),
            {
                author: "Edsger W. Dijkstra",
                likes: 17
            }
        )
    })
})
