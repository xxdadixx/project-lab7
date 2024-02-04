// CRUDClassFunc.jsx

import axios from 'axios';

export const read = async () => {
    return await axios.get('http://localhost:5000/api/crudclass')
}

export const readId = async (id) => {
    return await axios.get(`http://localhost:5000/api/crudclass/${id}`)
}

export const remove = async (id) =>
    await axios.delete(`http://localhost:5000/api/crudclass/${id}`)