import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getList = (authReques) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/evaluations`,
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
      })
}

export const remove = (id) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/evaluations/${id}`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const add = (addData) => {
  return axios({
    method: 'Post',
    data: addData,
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/evaluations`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}