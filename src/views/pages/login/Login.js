/* eslint-disable react/prop-types */
import React from 'react'
import { authenticate, authFailure, authSuccess } from 'src/redux/authActions'
import { Link } from 'react-router-dom'
import { userLogin } from 'src/services/UserService'
import { useState } from 'react'
import { connect, ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

const Login = ({ loading, error, ...props }) => {
  console.log('response', props)

  const [values, setValues] = useState({
    userName: '',
    password: '',
  })

  const handleSubmit = (evt) => {
    console.log('coy')

    values.password = evt.password
    values.userName = evt.username
    console.log(values.password)
    console.log(values.userName)

    //     evt.preventDefault();
    console.log(values.password)
    console.log(values.userName)

    props.authenticate()

    userLogin(values)
      .then((response) => {
        if (response.status === 200) {
          props.setUser(response.data)
          props.history.push('/Accueil')
        } else {
          props.loginFailure('Something Wrong!Please Try Again')
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log('401 status')
              props.loginFailure('Authentication Failed.Bad Credentials')
              break
            default:
              props.loginFailure('Something Wrong!Please Try Again')
          }
        } else {
          props.loginFailure('Something Wrong!Please Try Again')
        }
      })
  }

  const handleChange = (e) => {
    e.persist()
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }))
  }

  console.log('Loading ', loading)
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
        <div className="page-content2">
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                  <div className="wrap d-md-flex">
                    <div
                      className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last"
                      style={{ 'border-top-right-radius': 10, 'border-bottom-right-radius': 10 }}
                    >
                      <div className="text w-100">
                        <h2>Bienvenue</h2>
                        <br></br>
                        <p>Vous ne aavez pas un compte?</p>
                        <br></br>

                        <button
                          className="btn btn-white btn-outline-white"
                          onClick={() => {
                            History.push('/Inscription')
                          }}
                        >
                          Inscripion
                        </button>
                      </div>
                    </div>
                    <div
                      className="login-wrap p-4 p-lg-5"
                      style={{ 'border-top-left-radius': 10, 'border-bottom-left-radius': 10 }}
                    >
                      <div className="d-flex">
                        <div className="w-100">
                          <h2>Connexion </h2>
                        </div>
                      </div>
                      <Form className="signin-form">
                        <div className="form-group mb-3">
                          <label className="label">User-Name</label>

                          <Field
                            type="text"
                            id="username"
                            name="username"
                            className={
                              ' form-control' +
                              (errors.username && touched.username ? ' is-invalid' : '')
                            }
                            placeholder="username"
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="username"
                            component="div"
                            className="invalid-feedback"
                          />

                          {/*        <input id="username" type="text" className="form-control"  value={values.userName} onChange={handleChange} name="userName" required />
                           */}
                        </div>
                        <div className="form-group mb-3">
                          <label className="label">Mot de passe</label>
                          {/*    <input id="password" type="password" className="form-control"  value={values.password} onChange={handleChange} name="password" required/>
                           */}
                          <Field
                            type="text"
                            id="password"
                            name="password"
                            className={
                              ' form-control' +
                              (errors.password && touched.password ? ' is-invalid' : '')
                            }
                            placeholder="Password"
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="form-group">
                          {/*   <button type="submit" className="form-control btn btn-primary submit px-3">Connecter
                {loading && (
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                    )}
                </button> */}
                          <input
                            type="submit"
                            name="register"
                            className="form-control btn btn-primary submit px-3"
                            value="Connecter"
                          />
                        </div>
                        <div className="form-group d-md-flex">
                          <div className="w-100 text-md-center">
                            <p
                              className="btn-mot"
                              onClick={() => {
                                History.push('/ForgetPassword')
                              }}
                            >
                              {' '}
                              Mot de passe oublié
                            </p>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    />
  )
}

/* const mapStateToProps = ({ auth }) => {
  console.log('state ', auth)
  return {
    loading: auth.loading,
    error: auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    setUser: (data) => dispatch(authSuccess(data)),
    loginFailure: (message) => dispatch(authFailure(message)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login) */
export default Login
