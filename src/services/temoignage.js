import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getByCandidatFormation = (idCandidat, Formation) => {
  console.log('fi service ena', Formation.id)
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/getByCandidatFormation/` +
      idCandidat +
      `/` +
      Formation.id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getAll = () => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/getAll`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const updatetemoignage = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/update/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const deletetemoignage = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/delete/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const addtemoignage = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/Add`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getAlltemoignageByCandidat = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/getAlltemoignageByCandidat/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getAlltemoignageByFormation = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/getAlltemoignageByFormation/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const gettemoignageById = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/temoignage/getById/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
