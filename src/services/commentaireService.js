import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getAllcommentaire = (id) => {
  return axios({
    method: 'GET',
    url:
      `${
        process.env.hostUrl || 'http://localhost:8080'
      }/api/commentaire/getAllcommentairesPrincipales/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const ajouterCommentaire = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/commentaire/ajouterCommentaire`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const ajouterReponse = (id, authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/commentaire/ajouterReponse/` + id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const deletecommentaire = (authRequest) => {
  return axios({
    method: 'Delete',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/commentaire/deletecommentaire/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getReponsesBycommentaire = (authRequest, id) => {
  return axios({
    method: 'GET',
    url:
      `${
        process.env.hostUrl || 'http://localhost:8080'
      }/api/commentaire/getReponsesBycommentaire/` + id,
    data: authRequest,

    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const updatecommentaire = (authRequest) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/commentaire/updatecommentaire`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const findById = (id) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/commentaire/findById/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
