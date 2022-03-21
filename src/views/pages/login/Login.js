import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { userLogin, fetchUserData } from 'src/services/UserService'
import 'src/views/pages/login/login.css'
import ReactImg from 'src/assets/images/logo1.png'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = (props) => {
  function Notification_userinvalide() {
    Swal.fire({
      icon: 'error',
      title: 'utilisateur invalide',
      text: 'essayer de saisir un username et mot de passe valides',
    })
  }
  function Notification_comptenonactive() {
    Swal.fire({
      icon: 'error',
      title: 'compte non activé',
      text: 'vous allez recevoir un mail de activation lors de la activation de votre compte par le administrateur ',
    })
  }

  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }
  const [values, setValues] = useState({
    userName: '',
    password: '',
  })
  let navigate = useNavigate()

  function handleSubmit(evt) {
    console.log('coy')

    values.password = evt.password
    values.userName = evt.username
    console.log(values.password)
    console.log(values.userName)

    //     evt.preventDefault();
    console.log(values.password)
    console.log(values.userName)
    //props.authenticate()

    userLogin(values)
      .then((response) => {
        if (response.status === 200) {
          console.log('cou', response)
          localStorage.setItem('USER_KEY', response.data.token)

          fetchUserData()
            .then((response) => {
              localStorage.setItem('Role', response.data.roles[0].authority)
            })
            .catch((e) => {
              // localStorage.clear()
            })

          console.log(response.data)
          navigate('/*')
        } else {
          Notification_userinvalide()
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log('401 status')
              Notification_userinvalide()
              break
            case 400:
              console.log('400 status')
              Notification_comptenonactive()
              break
            default:
              Notification_probleme()
          }
        } else {
          //    props.loginFailure('Something Wrong!Please Try Again')
          Notification_probleme()
        }
      })
  }
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('username  est requis'),
        password: Yup.string().required('mot de passe est requis'),
      })}
      onSubmit={(values) => handleSubmit(values)}
      render={({ errors, status, touched }) => (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer style={{ 'border-radius': 90 }}>
            <CRow className="justify-content-center" style={{ 'border-radius': 90 }}>
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <Form>
                        <h1>Connexion</h1>
                        <p className="text-medium-emphasis">Connectez-vous à votre compte</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText
                            style={{
                              'border-top-left-radius': 30,
                              'border-bottom-left-radius': 30,
                            }}
                          >
                            <CIcon icon={cilUser} />
                          </CInputGroupText>

                          <Field
                            type="text"
                            id="username"
                            name="username"
                            className={
                              ' form-control' +
                              (errors.username && touched.username ? ' is-invalid' : '')
                            }
                            placeholder="username"
                            style={{
                              'border-top-right-radius': 30,
                              'border-bottom-right-radius': 30,
                            }}
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="username"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText
                            style={{
                              'border-top-left-radius': 30,
                              'border-bottom-left-radius': 30,
                            }}
                          >
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <Field
                            type="text"
                            id="password"
                            name="password"
                            className={
                              ' form-control' +
                              (errors.password && touched.password ? ' is-invalid' : '')
                            }
                            placeholder="Password"
                            style={{
                              'border-top-right-radius': 30,
                              'border-bottom-right-radius': 30,
                            }}
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs={12}>
                            <input
                              type="submit"
                              name="register"
                              className="form-control text-center mt-3  btn btn-primary submit px-3"
                              value="Connecter"
                              style={{ 'border-radius': 30, width: 300, marginleft: 130 }}
                            />
                          </CCol>
                          <br></br>
                          <CCol xs={12} className="text-right text-center">
                            <Link to="/ForgetPassword">
                              <CButton
                                color="link"
                                className="px-0  btn-mot"
                                style={{ color: 'black' }}
                              >
                                mot de passe oublié ?{' '}
                              </CButton>
                            </Link>
                          </CCol>
                        </CRow>
                      </Form>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5"
                    style={{ width: '44%', paddingTop: 130, margintop: 100 }}
                  >
                    <CCardBody className="text-center">
                      <div>
                        <CCardImage src={ReactImg} alt="W3C" width="100" height="170"></CCardImage>
                        <p
                          style={{
                            color: 'black',
                            margintop: '150',
                            fontWeight: '500',
                            fontSize: '17px',
                          }}
                        >
                          {' '}
                          Vous ne avez pas un compte
                        </p>
                        <Link to="/register">
                          <CButton
                            className="mt-3 btn btn-white btn-outline-white"
                            active
                            tabIndex={-1}
                            style={{ 'border-radius': 30, width: 200 }}
                          >
                            Inscription
                          </CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      )}
    />
  )
}
export default Login
