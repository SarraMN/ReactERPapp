import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const uploadfile = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/file/upload`,
    body: authRequest,
    /*   mode: 'no-cors',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  */
  })
}

export const getfile = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/file/files/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: 'blob',
  })
}
