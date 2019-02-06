import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import {
  getPeoples,
  getPlanets,
  getSpecies,
  getFilms,
  getStarships,
  getVehicles
} from '@/api'

Vue.use(Vuex)

const state = {
  peoples: [],
  planets: [],
  species: [],
  films: [],
  starships: [],
  vehicles: [],
  search_result: [],
  index_film_details: null,
  index_people_details: null
}

const actions = {
  loadSpecies ({commit, state}) {
    let pageCount = 1
    let setSpecie = (page) => {
      return new Promise((resolve) => {
        getSpecies(page).then(response => {
          let data = response.data
          commit('setSpecies', data.results)
          if (data.next) {
            setSpecie(pageCount += 1).then(() => {
              resolve()
            })
          } else {
            return resolve()
          }
        })
      })
    }
    if (state.species.length === 0) {
      return setSpecie(1)
    }
  },
  loadPlanets ({commit, state}) {
    let pageCount = 1
    let setPlanet = (page) => {
      return new Promise((resolve) => {
        getPlanets(page).then(response => {
          let data = response.data
          commit('setPlanets', data.results)
          if (data.next) {
            setPlanet(pageCount += 1).then(() => {
              resolve()
            })
          } else {
            return resolve()
          }
        })
      })
    }
    if (state.planets.length === 0) {
      return setPlanet(1)
    }
  },
  loadFilms ({commit, state}) {
    let pageCount = 1
    let setFilm = (page) => {
      return new Promise((resolve) => {
        getFilms(page).then(response => {
          let data = response.data
          commit('setFilms', data.results)
          if (data.next) {
            setFilm(pageCount += 1).then(() => {
              resolve()
            })
          } else {
            return resolve()
          }
        })
      })
    }
    if (state.films.length === 0) {
      return setFilm(1)
    }
  },
  loadStarships ({commit, state}) {
    let pageCount = 1
    let setStarship = (page) => {
      return new Promise((resolve) => {
        getStarships(page).then(response => {
          let data = response.data
          commit('setStarships', data.results)
          if (data.next) {
            setStarship(pageCount += 1).then(() => {
              resolve()
            })
          } else {
            return resolve()
          }
        })
      })
    }
    if (state.starships.length === 0) {
      return setStarship(1)
    }
  },
  loadVehicles ({commit, state}) {
    let pageCount = 1
    let setVehicle = (page) => {
      return new Promise((resolve) => {
        getVehicles(page).then(response => {
          let data = response.data
          commit('setVehicles', data.results)
          if (data.next) {
            setVehicle(pageCount += 1).then(() => {
              resolve()
            })
          } else {
            return resolve()
          }
        })
      })
    }
    if (state.vehicles.length === 0) {
      return setVehicle(1)
    }
  },
  loadPeoplesBasic ({commit, state}) {
    let pageCount = 1
    let setPeople = (page) => {
      return new Promise((resolve) => {
        getPeoples(page).then(response => {
          let data = response.data
          commit('setPeoples', {data: data.results})
          if (data.next) {
            setPeople(pageCount += 1).then(() => {
              resolve()
            })
          } else {
            return resolve()
          }
        })
      })
    }
    if (state.peoples.length === 0) {
      return setPeople(1)
    }
  },
  loadPeoples ({commit, dispatch, state}, page) {
    let loadPeoplesPage = (page) => {
      getPeoples(page)
        .then((response) => {
          let data = response.data.results
          dispatch('loadSpecies').then(() => {
            let peoples = data.map(t => {
              let speciesName = []
              t.species.forEach((specie) => {
                speciesName.push(state.species.find((specieName) => {
                  return specieName.url === specie
                }))
              })
              return {
                ...t,
                species_name: speciesName.map((value) => { return value.name })
              }
            })
            dispatch('loadPlanets').then(() => {
              peoples = peoples.map(t => {
                let homeworldName = state.planets.find((planet) => {
                  return planet.url === t.homeworld
                })
                return {
                  ...t,
                  homeworld_name: homeworldName.name
                }
              })
              if (state.peoples.length <= response.data.count) {
                commit('setPeoples', {data: peoples})
              }
              if (response.data.next && state.peoples.length <= response.data.count) {
                loadPeoplesPage(page + 1)
              } else {
                dispatch('loadFilms').then(() => {
                  peoples = state.peoples.map(t => {
                    let filmsName = []
                    t.films.forEach((film) => {
                      filmsName.push(state.films.find((filmName) => {
                        return filmName.url === film
                      }))
                    })
                    return {
                      ...t,
                      films_name: filmsName.map((value) => { return value.title })
                    }
                  })
                  if (state.peoples.length <= response.data.count) {
                    commit('setPeoples', {data: peoples, replace: 1})
                  }
                })
              }
            })
          })
        })
    }
    return loadPeoplesPage(1)
  },
  searchPeople ({state, commit}, criteria) {
    let searchPeople = []
    if (criteria.hasOwnProperty('name')) {
      searchPeople = state.peoples.filter(value => value.name.toLowerCase().includes(criteria.name.toLowerCase()))
    } else {
      searchPeople = state.peoples
      let searchSpecies = (names, value) => {
        let coincidencia = false
        value.species_name.forEach(specie => {
          if (specie.toLowerCase().includes(names.toLowerCase())) {
            coincidencia = true
          }
        })
        return coincidencia
      }
      let searchPlanets = (planets, value) => {
        let coincidencia = false
        planets.forEach(planet => {
          if (value.homeworld === planet.url) {
            coincidencia = true
          }
        })
        return coincidencia
      }
      if (criteria.names !== '') {
        searchPeople = searchPeople.filter(value => {
          return (value.name.toLowerCase().includes(criteria.names.toLowerCase()) || searchSpecies(criteria.names, value))
        })
      }
      if (criteria.gender !== '') {
        searchPeople = searchPeople.filter(value => value.gender === criteria.gender)
      }
      if (criteria.planets !== '') {
        searchPeople = searchPeople.filter(value => searchPlanets(criteria.planets, value))
      }
      if (criteria.date_ini !== '' && criteria.date_end !== '') {
        searchPeople = searchPeople.filter(value => value.birth_year !== 'unknown').map(t => {
          return {
            ...t,
            year: parseFloat(t.birth_year.replace('BBY', ''))
          }
        })
        searchPeople = searchPeople.filter(value => value.year >= criteria.date_ini && value.year <= criteria.date_end)
      }
    }
    commit('setSearchResult', searchPeople)
  },
  loadDetails ({dispatch, state, commit}, criteria) {
    let index
    if (criteria.hasOwnProperty('url')) {
      index = state.search_result.findIndex((people) => {
        return people.url === criteria.url
      })
    }
    if (criteria.hasOwnProperty('name')) {
      index = state.search_result.findIndex((people) => {
        return people.name.toLowerCase().includes(criteria.name.toLowerCase())
      })
    }
    commit('setIndexPeopleDetails', index)

    dispatch('loadStarships').then(() => {
      let starshipsName = []
      state.search_result[index].starships.forEach((starship) => {
        starshipsName.push(state.starships.find((starshipName) => {
          return starship === starshipName.url
        }))
      })
      commit('setStarshipsname', {data: starshipsName.map((value) => { return value.name }), index: index})
    })
    dispatch('loadVehicles').then(() => {
      let vehiclesName = []
      state.search_result[index].vehicles.forEach((vehicle) => {
        vehiclesName.push(state.vehicles.find((vehicleName) => {
          return vehicle === vehicleName.url
        }))
      })
      commit('setVehiclesName', {data: vehiclesName.map((value) => { return value.name }), index: index})
    })
  },
  loadDetailsFilm ({dispatch, state, commit}, criteria) {
    let index
    if (criteria.hasOwnProperty('url')) {
      index = state.films.findIndex((film) => {
        return film.url === criteria.url
      })
    }
    if (criteria.hasOwnProperty('title')) {
      index = state.films.findIndex((film) => {
        return film.title.toLowerCase().includes(criteria.title.toLowerCase())
      })
    }
    commit('setIndexFilmDetails', index)
    dispatch('loadStarships').then(() => {
      let starshipsName = []
      state.films[index].starships.forEach((starship) => {
        starshipsName.push(state.starships.find((starshipName) => {
          return starship === starshipName.url
        }))
      })
      commit('setStarshipsFilmsname', {data: starshipsName.map((value) => { return value.name }), index: index})
    })
    dispatch('loadVehicles').then(() => {
      let vehiclesName = []
      state.films[index].vehicles.forEach((vehicle) => {
        vehiclesName.push(state.vehicles.find((vehicleName) => {
          return vehicle === vehicleName.url
        }))
      })
      commit('setVehiclesFilmsName', {data: vehiclesName.map((value) => { return value.name }), index: index})
    })
    dispatch('loadPlanets').then(() => {
      let planetsName = []
      state.films[index].planets.forEach((planet) => {
        planetsName.push(state.planets.find((planetName) => {
          return planet === planetName.url
        }))
      })
      commit('setPlanetsFilmsName', {data: planetsName.map((value) => { return value.name }), index: index})
    })
    dispatch('loadSpecies').then(() => {
      let speciesName = []
      state.films[index].species.forEach((specie) => {
        speciesName.push(state.species.find((specieName) => {
          return specie === specieName.url
        }))
      })
      commit('setSpeciesFilmsName', {data: speciesName.map((value) => { return value.name }), index: index})
    })
    dispatch('loadPeoplesBasic').then(() => {
      let peoplesName = []
      state.films[index].characters.forEach((people) => {
        peoplesName.push(state.peoples.find((peopleName) => {
          return people === peopleName.url
        }))
      })
      commit('setCharactersFilmsName', {data: peoplesName.map((value) => { return value.name }), index: index})
    })
  }
}

const mutations = {
  setPeoples (state, payload) {
    if (payload.hasOwnProperty('replace')) {
      state.peoples = payload.data
    } else {
      state.peoples = [...state.peoples, ...payload.data]
    }
    state.search_result = state.peoples
  },
  setPlanets (state, payload) {
    state.planets = [...state.planets, ...payload]
  },
  setSpecies (state, payload) {
    state.species = [...state.species, ...payload]
  },
  setFilms (state, payload) {
    state.films = [...state.films, ...payload]
  },
  setStarships (state, payload) {
    state.starships = [...state.starships, ...payload]
  },
  setVehicles (state, payload) {
    state.vehicles = [...state.vehicles, ...payload]
  },
  setStarshipsname (state, payload) {
    state.search_result[payload.index].starships_name = payload.data
  },
  setVehiclesName (state, payload) {
    state.search_result[payload.index].vehicles_name = payload.data
  },
  setStarshipsFilmsname (state, payload) {
    state.films[payload.index].starships_name = payload.data
  },
  setVehiclesFilmsName (state, payload) {
    state.films[payload.index].vehicles_name = payload.data
  },
  setSpeciesFilmsName (state, payload) {
    state.films[payload.index].species_name = payload.data
  },
  setPlanetsFilmsName (state, payload) {
    state.films[payload.index].planets_name = payload.data
  },
  setCharactersFilmsName (state, payload) {
    state.films[payload.index].characters_name = payload.data
  },
  setSearchResult (state, payload) {
    state.search_result = payload
  },
  resetResult (state) {
    state.search_result = state.peoples
  },
  setIndexFilmDetails (state, payload) {
    state.index_film_details = payload
  },
  setIndexPeopleDetails (state, payload) {
    state.index_people_details = payload
  }
}

const getters = {
  peoples (state) {
    return state.peoples
  },
  BirthYear (state) {
    let birthYear = state.peoples.filter(value => value.birth_year !== 'unknown').map(t => parseFloat(t.birth_year.replace('BBY', '')))
    let max = Math.max.apply(null, birthYear)
    let min = Math.min.apply(null, birthYear)
    return [min, max]
  },
  BirthYearListAsc (state) {
    let birthYear = state.peoples.filter(value => value.birth_year !== 'unknown').map(t => parseFloat(t.birth_year.replace('BBY', '')))
    return birthYear.sort((a, b) => a - b)
  },
  BirthYearListDesc (state) {
    let birthYear = state.peoples.filter(value => value.birth_year !== 'unknown').map(t => parseFloat(t.birth_year.replace('BBY', '')))
    return birthYear.sort((a, b) => b - a)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
  // plugins: [createPersistedState()]
})

export default store
