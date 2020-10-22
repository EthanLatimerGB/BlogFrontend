import axios from 'axios'
const baseUrl = '/api/users'

const fetchUsers = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const getSingleUser = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

export default {
    fetchUsers,
    getSingleUser
}