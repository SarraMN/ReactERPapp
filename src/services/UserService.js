import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const userLogin = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/auth/login`,
    data: authRequest,
  })
}

export const fetchUserData = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/auth/userinfo`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const UserIns = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/signup`,
    data: authRequest,
  })
}
export const sendMail = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/Forgetpassword/sendmail`,
    data: authRequest,
  })
}

export const update_motdepasseoublie = (authRequest) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/Forgetpassword/update`,
    data: authRequest,
  })
}

export const VerifPassword = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Post',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/verifPassword`,
    data: authRequest,
  })
}

export const updateuser = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/updateUser/` + authRequest.id,
    data: authRequest,
  })
}
