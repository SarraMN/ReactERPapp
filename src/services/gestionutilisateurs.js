import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getusers = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/profsEtCandidats`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const getEmployeeList = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/employees`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getListeRhs = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/listRhs`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const deleteuser = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
