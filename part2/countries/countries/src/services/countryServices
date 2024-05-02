import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getFlag = (url) => {
    return axios.get(`url`)
    .then(response => response.data)
}

const getAll = () => {
    return axios.get(`${baseUrl}/all`).
    then(response => response.data) // returns a promise with JUST the data
  }

const getOne = country => {
  return axios.get(`${baseUrl}/name/${country}`)
  .then(response => response.data) // returns a promise with JUST the data
}

/*const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
  .then(response => response.data) // returns a promise with JUST the data
} */

export default { getAll, getOne} // object!