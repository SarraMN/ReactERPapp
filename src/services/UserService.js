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

export const addResponsable = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/addResponsable`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
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
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const updateuser = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/updateUser/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const updateUserName = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/users/updateUserName/` +
      authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const updatepassword = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/users/updatepassword/` +
      authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const updateEmail = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/users/updateEmail/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const updatephoto = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'Put',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/users/updatephoto/` + authRequest.id,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getUserById = (authRequest) => {
  console.log(authRequest)
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const GetformationsCandidat = (authRequest) => {
  return axios({
    method: 'GET',
    url:
      `${process.env.hostUrl || 'http://localhost:8080'}/api/users/GetformationsCandidat/` +
      authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const verifierFormationdeCandidat = (id, formation) => {
  console.log('backk service', id)
  console.log('backk service', formation)
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/users/verifierFormation/` + id,
    data: formation,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
