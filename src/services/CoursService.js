import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getallCours = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/cours`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const AjoutCours = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/cours`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const DeleteCours = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/cours/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getCoursById = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/cours/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const CoursByIdFormation = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/cours/formation/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const editCours = (id, authRequest) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/cours/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: authRequest,
  })
}

export const archiverCours = (id) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/cours/archiver/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
