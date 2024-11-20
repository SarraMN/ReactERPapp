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
export const getfilebyid = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/file/getfile/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: 'blob',
  })
}
const [logo, setlogo] = ''
export const downloadContract = (response) => {
  getfile(response.document.id)
    .then((response) => {
      setlogo(URL.createObjectURL(response.data))
    })
    .catch((e) => {})
  let httpClient = new XMLHttpRequest()
  httpClient.open('get', logo, true)
  httpClient.responseType = 'blob'
  httpClient.onload = function () {
    const file = new Blob([httpClient.response], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = fileURL
    link.download = 'cours.pdf'
    link.click()
    // document.body.removeChild(link);
    URL.revokeObjectURL(fileURL)
  }
  httpClient.send()
}
