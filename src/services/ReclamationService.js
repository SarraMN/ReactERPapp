import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getallReclamations = () => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const AjoutReclamation = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const DeleteReclamation = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getReclamationById = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const ReclamationByIdCandidat = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/candidat/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const editReclamation = (id, authRequest) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: authRequest,
  })
}

export const ChangerEtatReclamation = (id) => {
  return axios({
    method: 'PUT',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/ChangerEtatReclamation/` +
      id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const repondreReclamation = (id) => {
  return axios({
    method: 'PUT',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/repondreReclamation/` +
      id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const ReclamationsTraitees = () => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/traitees`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const ReclamationsNonTraitees = () => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/Reclamations/NonTraitees`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
