import axios from 'axios'
import configs from '../local_config'

const API = configs.API
// axios.defaults.baseURL = location.protocol + '//' + API + '/api/'
axios.defaults.baseURL = 'https:' + '//' + API + '/api/'
axios.defaults.headers.common['Authorization'] = 'Bearer: ' + localStorage.getItem('token')

export function getPeoples (page) {
  return axios.get('people/?page=' + page)
}

export function getPlanets (page = 1) {
  return axios.get('planets/?page=' + page)
}

export function getFilms (page = 1) {
  return axios.get('films?page=' + page)
}

export function getSpecies (page = 1) {
  return axios.get('species/?page=' + page)
}

export function getVehicles (page = 1) {
  return axios.get('vehicles/?page=' + page)
}

export function getStarships (page = 1) {
  return axios.get('starships/?page=' + page)
}
