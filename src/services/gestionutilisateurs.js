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
