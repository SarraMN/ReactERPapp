import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getdemandes_ins_formations = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/demandes_inscription/formations`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const gethistorique = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/demandes_inscription/historiques`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getdemandes_ins_examens = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/demandes_inscription/examens`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const accepterdemande = (authRequest) => {
  return axios({
    method: 'PUT',
    url:
      `${
        process.env.hostUrl || 'http://localhost:8080'
      }/api/demandes_inscription/accepterdemande/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const refuserdemande = (authRequest) => {
  return axios({
    method: 'PUT',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/demandes_inscription/refuserdemande/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const addDemandeFormation = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/demandes_inscription/addDemande`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
