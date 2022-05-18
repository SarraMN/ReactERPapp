import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getFormations = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const nombre_candidatsParFormation = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${
        process.env.hostUrl || 'http://localhost:8080'
      }/api/formation/nombre_candidatsParFormation/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const GetformationsByFormateur = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/GetformationsByFormateur/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const AjoutFormation = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const DeleteFormation = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getFormation = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const editFormation = (id, authRequest) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: authRequest,
  })
}

export const ChangerEtatFormation = (id) => {
  return axios({
    method: 'PUT',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/ChangerEtatFormation/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const getformationbycategorie = (categorie) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/getformationbycategorie/` +
      categorie,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
