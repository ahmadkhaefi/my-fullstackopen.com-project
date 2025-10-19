export function dummy(blogs) {
    return 1
}

export function totalLikes(blogs) {
    return blogs.reduce((acc, item) => item.likes + acc, 0)
}

export function favoriteBlog(blogs) {
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
}

export function mostBlogs(blogs) {
    const authorCounts = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})

    const topAuthor = Object
        .entries(authorCounts)
        .reduce(
            (max, blog) => {
                return blog[1] > max.blogs ? {author: blog[0], blogs: blog[1]} : max
            },
            {author: null, blogs: 0}
        )

    return topAuthor        
}

export function mostLikes(blogs) {
    const authorLikeCounts = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes

        return acc
    }, {})

    const topAuthor = Object
        .entries(authorLikeCounts)
        .reduce(
            (max, blog) => {
                return blog[1] > max.likes ? {author: blog[0], likes: blog[1]} : max
            },
            {author: null, likes: 0}
        )

    return topAuthor
}
