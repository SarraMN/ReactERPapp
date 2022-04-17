import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getAllquestions = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/question/getAll`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getQuestions = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/question/getById/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getReponseByQuestion = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/question/getReponseByQuestion/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const updatequestion = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/question/update/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const deletequestion = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/question/delete/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const addQuestion = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/question/Add`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
