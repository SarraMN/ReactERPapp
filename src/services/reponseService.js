import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getAllreponses = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/reponse/getAll`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getreponse = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/reponse/getById/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const updatereponse = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/reponse/update/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const deletereponse = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/reponse/delete/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const addreponse = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/reponse/Add`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
