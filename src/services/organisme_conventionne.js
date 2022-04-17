import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getAllorganismes = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/organisme_conventionne/getAll`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getOrganisme = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/organisme_conventionne/getById/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getpersonnelsByOrganisme = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url:
      `${
        process.env.hostUrl || 'http://localhost:8080'
      }/organisme_conventionne/getpersonnelsByOrganisme/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const updateorganisme = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/organisme_conventionne/update/` +
      authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const deleteorganisme = (authRequest) => {
  return axios({
    method: 'Delete',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/organisme_conventionne/delete/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const addOrganisme = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/organisme_conventionne/Add`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
