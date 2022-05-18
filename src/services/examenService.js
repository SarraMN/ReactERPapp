import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getAllExamens = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/examen/getAll`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getExamen = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/examen/getById/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getExamenByFormation = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/examen/getExamenByFormation/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getQuestionByExamen = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/examen/getQuestionByExamen/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getQuestionAndReponsesByExamen = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/examen/getQuestionAndReponsesByExamen/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getExamenAleatoire = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/examen/getExamenAleatoire/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const updateExamen = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/examen/update/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const deleteExamen = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/examen/delete/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const addExamen = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/examen/Add`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const ChangerEtatExamen = (id) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/examen/ChangerEtatExamen/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
