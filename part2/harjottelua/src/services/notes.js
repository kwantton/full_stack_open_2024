import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    return axios.get(baseUrl).
    then(response => response.data) // returns a promise with JUST the data
  }

const create = newObject => {
  return axios.post(baseUrl, newObject)
  .then(response => response.data) // returns a promise with JUST the data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
  .then(response => response.data) // returns a promise with JUST the data
}

export default { getAll, create, update } // object!