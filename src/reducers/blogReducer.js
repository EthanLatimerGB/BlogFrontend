import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch(action.type){
    case'INIT-BLOGS':
        return action.data
    case'CREATE-BLOG':
        return [...state, action.data]
    case'DELETE-BLOG':
        return state.filter((blog) => blog.id !== action.data.id)
    case'UPDATE-COMMENT':
        return state.map((blog) => {
            return blog.id === action.data.id ? action.data.response : blog
        })
    default:
        return state
    }
}

export const initialiseBlogs = () => {
    return async dispatch => {
        const response = await blogService.getAll()
        dispatch({
            type: 'INIT-BLOGS',
            data: response
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.create(blog)
        dispatch({
            type: 'CREATE-BLOG',
            data: response
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE-BLOG',
            data: id
        })
    }
}

export const updateBlogComments = (blog, comment) => {
    return async dispatch => {
        const response = await blogService.createComment(blog, comment)
        dispatch({
            type: 'UPDATE-COMMENT',
            data: {
                id: blog.id,
                response,
            }
        })
    }
}

export default blogReducer