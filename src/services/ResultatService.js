import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getByCandidatFormation = (idCandidat, Formation) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/resultat/getByCandidatFormation/` +
      idCandidat +
      `/` +
      Formation.id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getAllByCandidat = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/resultat/getAllByCandidat/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const nbrHeuresApresExamen = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/resultat/nbrHeuresApresExamen/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const updateResultat = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/resultat/update/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const deleteResultat = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/resultat/delete/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const addResultat = (authRequest) => {
  console.log('ali jaa', authRequest)

  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/resultat/Add`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getResultat = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/resultat/getById/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
