import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const getOne = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

const setToken = newToken => {
    token = `bearer ${newToken}`
    return token
}

const create = async (newObject) => {
    const config = {
        headers: { authorization: token }
    }
    const request = await axios.post(baseUrl, newObject, config)

    return request.data
}

const putLike = async (changedObject, url) => {
    const config = {
        headers: { authorization: token }
    }
    const request = await axios.put(url, changedObject, config)
    return request.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { authorization: token }
    }

    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
}

const incrementBlogLikes = async (blog) => {
    const foundUser = await getOne(blog.id)

    const changedBlog = {
        title: foundUser.title,
        author: foundUser.author,
        url: foundUser.url,
        likes: ++foundUser.likes,
    }

    const request = await putLike(changedBlog, `/api/blogs/${blog.id}`)
    return request
}

export default { getAll, setToken, create, putLike, getOne, deleteBlog, incrementBlogLikes }