import React, { useEffect, useState } from 'react'

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
/* import ReactImg from 'src/assets/images/logo1.png'
 */
import ReactImg from 'src/images/logo.png'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import background from 'src/images/backimage.png'

const Login = (props) => {
  function Notification_userinvalide() {
    Swal.fire({
      icon: 'error',
      title: 'Utilisateur invalide',
      text: 'Essayer de saisir un identifiant et un mot de passe valides',
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
  useEffect(() => {
    localStorage.clear()
  }, [])
  function handleSubmit(evt) {
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
        username: Yup.string().required('Identifiant  est requis'),
        password: Yup.string().required('Le mot de passe est requis'),
      })}
      onSubmit={(values) => handleSubmit(values)}
      render={({ errors, status, touched }) => (
        <div className="login">
          <div
            className=" min-vh-100 d-flex flex-row align-items-center"
            style={
              {
                /*    backgroundImage: `url(${background})`, */
              }
            }
          >
            <CContainer style={{ 'border-radius': 90 }}>
              <CRow
                className="justify-content-center"
                style={{
                  'border-radius': 90,
                }}
              >
                <CCol md={8}>
                  <CCardGroup>
                    <CCard className="p-4">
                      <CCardBody>
                        <Form>
                          <h2 style={{ 'font-family': 'Cursive' }}>Connexion</h2>
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
                              placeholder="identifiant"
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
                              type="password"
                              id="password"
                              name="password"
                              className={
                                ' form-control' +
                                (errors.password && touched.password ? ' is-invalid' : '')
                              }
                              placeholder="mot de passe"
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
                          <CRow style={{ 'text-align': 'center' }}>
                            {/*   <CCol xs={12}>
                            <input
                              type="submit"
                              name="register"
                              className="form-control text-center mt-3  btn btn-primary submit px-3"
                              value="Connecter"
                              style={{ 'border-radius': 30, width: 300, marginleft: 130 }}
                            />
                          </CCol>
                        */}{' '}
                            <CCol xs={12} className="text-right text-center">
                              <button
                                type="submit"
                                style={{
                                  'border-radius': '30px',
                                  color: 'white',
                                  borderColor: 'white',
                                  'background-color': '#213f77',
                                  height: '50px',
                                }}
                                className="btn btn-lg btn-block"
                              >
                                Connecter
                              </button>
                            </CCol>{' '}
                            <CCol xs={12} className="text-center">
                              <Link to="/ForgetPassword" style={{ color: 'black' }}>
                                <p
                                  color="link"
                                  className="px-0  btn-mot"
                                  style={{ color: 'black', 'text-decoration-color': 'black' }}
                                >
                                  mot de passe oublié ?{' '}
                                </p>
                              </Link>
                            </CCol>{' '}
                          </CRow>
                        </Form>
                      </CCardBody>
                    </CCard>
                    <CCard
                      className="text-white  py-5"
                      style={{
                        width: '80%',
                        paddingTop: 100,
                        margintop: 50,
                        backgroundColor: '#213f77',
                      }}
                    >
                      <CCardBody className="text-center">
                        <div>
                          {/*                         <CCardImage src={ReactImg} alt="W3C" width="25" height="80"></CCardImage>
                           */}{' '}
                          <div>
                            <h1
                              style={{
                                'padding-top': '20px',
                                'font-family': 'Sans-serif',
                                'font-size': '3.3em',
                              }}
                            >
                              Bienvenue
                            </h1>
                          </div>
                          <div style={{ paddingTop: 30 }}>
                            <p
                              style={{
                                color: 'white',
                                'margin-top': '300',
                                fontWeight: '500',
                                fontSize: '17px',
                              }}
                            >
                              {' '}
                              Vous n{"'"}avez pas un compte
                            </p>
                          </div>
                          <Link to="/register">
                            {/*   <CButton
                              className="mt-3 btn btn-white btn-outline-white"
                            active
                            tabIndex={-1}
                            style={{
                              'border-radius': 30,
                              width: 200,
                              'background-color': 'Transparent',
                            }}
                          >
                            {' '}
                            Inscription
                          </CButton> */}
                            <button
                              style={{
                                'border-radius': '30px',
                                color: 'white',
                                borderColor: 'white',
                                width: '150px',
                              }}
                              type="button"
                              className="btn btn-outline-primary"
                            >
                              Inscription
                            </button>
                          </Link>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCardGroup>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
      )}
    />
  )
}
export default Login
