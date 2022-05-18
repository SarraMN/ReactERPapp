import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getAllActualitesForAdmin = () => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/actualite/getAllActualitesForAdmin`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getAllActualitesForCandidat = () => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/actualite/getAllActualitesForCandidat`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const ChangerEtatActualite = (id) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/actualite/ChangerEtatActualite/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const ajouterActualite = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/actualite/ajouterActualite`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const deleteActualite = (authRequest) => {
  return axios({
    method: 'Delete',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/actualite/deleteActualite/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const updateActualite = (authRequest) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/actualite/updateActualite`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const getActualiteById = (id) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/actualite/findById/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
