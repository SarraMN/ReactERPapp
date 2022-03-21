import { UserIns } from 'src/services/UserService'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { authenticate, authFailure } from 'src/redux/authActions'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import 'src/views/pages/register/register.css'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
  let navigate = useNavigate()

  function Notification_succes(evt) {
    Swal.fire(
      'La demande d’inscription a été effectuée avec succès.',
      'You clicked the button!',
      'success',
    )
    navigate('/')
  }
  function Notification_problemedesaisie(err) {
    Swal.fire({
      icon: 'error',
      title: 'probleme de saisir',
      text: err,
    })
  }
  function Vider_champs(evt) {
    evt.adresse = ''
    evt.nom = ''
    evt.prenom = ''
    evt.genre = ''
    evt.email = ''
    evt.etat_civil = ''
    evt.numero_de_telephone = ''
    evt.date_de_naissance = ''
    evt.nom = ''
    evt.roles = ''
    evt.password = ''
  }

  const [values, setValues] = useState({
    userName: '',
    password: '',
    nom: '',
    prenom: '',
    date_de_naissance: '',
    numero_de_telephone: '',
    adressse: '',
    etat_civil: '',
    email: '',
    Genre: '',
    roles: '',
  })
  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }
  const handleSubmit = (evt) => {
    values.adressse = evt.adresse
    values.nom = evt.nom
    values.prenom = evt.prenom
    values.Genre = evt.genre
    values.email = evt.email
    values.etat_civil = evt.etat_civil
    values.numero_de_telephone = evt.numero_de_telephone
    values.date_de_naissance = evt.date_de_naissance
    values.userName = evt.nom
    values.roles = evt.roles
    values.password = evt.password
    //  evt.preventDefault()
    // props.authenticate()
    console.log(values)
    UserIns(values)
      .then((response) => {
        if (response.status === 200) {
          Notification_succes(evt)

          // props.setUser(response.data)
          //  props.history.push('/')
        } else {
          //  props.loginFailure('Something Wrong!Please Try Again')
          Notification_probleme()
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log('401 status')
              //props.loginFailure('Authentication Failed.Bad Credentials')
              Notification_probleme()
              break
            case 400:
              Notification_problemedesaisie(err.response.data)
              //props.loginFailure('Authentication Failed.Bad Credentials')
              // Notification_probleme()
              break

            default:
              // props.loginFailure('Something Wrong!Please Try Again')
              Notification_probleme()
          }
        } else {
          // props.loginFailure('Something Wrong!Please Try Again')
          Notification_probleme()
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
  return (
    <Formik
      initialValues={{
        date_de_naissance: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        nom: '',
        numero_de_telephone: '',
        adresse: '',
        roles: '',
        etat_civil: '',
      }}
      validationSchema={Yup.object().shape({
        date_de_naissance: Yup.string().required('date_de_naissance est invalide'),
        nom: Yup.string().required('nom est requis'),
        prenom: Yup.string().required('prenom est requis'),
        email: Yup.string().required('Email est requis').email('Email est invalide'),
        password: Yup.string()
          .min(6, 'Le mot de passe doit être au moins de 6 caractères')
          .required('Le mot de passe est requis'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'les mots de passe doivent correspondre')
          .required('Confirmer le mot de passe est requis'),
        numero_de_telephone: Yup.number()
          .required('Numero de telephone est requis')
          .typeError('Numero de telephone invalide')
          .min(8, 'Numero de telephone de 8 chifres')
          .integer('Un numéro de téléphone ne peut pas inclure de point décimal'),
        adresse: Yup.string()
          .required('Adresse est requis')
          .min(6, 'adresse doit être au moins de 6 caractères'),
        etat_civil: Yup.string().required('Etat civil est requis'),
        roles: Yup.string().required('Role est requis'),
      })}
      onSubmit={(values) => handleSubmit(values)}
      render={({ errors, status, touched }) => (
        <div className="page-content3 bg-light">
          <div className="page-content">
            <div className="form-v10-content">
              <Form className="form-detail">
                <div className="form-left">
                  <h2>Inscription </h2>

                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <Field
                        type="text"
                        name="nom"
                        style={{ 'border-radius': 0 }}
                        classNameName={
                          ' form-control' + (errors.nom && touched.nom ? ' is-invalid' : '')
                        }
                        placeholder="Nom"
                      />

                      <ErrorMessage
                        style={{ fontSize: 12, color: 'red' }}
                        name="nom"
                        component="div"
                        classNameName="invalid-feedback"
                      />
                    </div>
                    <div className="form-row form-row-2">
                      <Field
                        type="text"
                        name="prenom"
                        style={{ 'border-radius': 0, placeholderTextColor: 'red' }}
                        classNameName={
                          ' form-control' + (errors.prenom && touched.prenom ? ' is-invalid' : '')
                        }
                        placeholder="Prenom"
                      />

                      <ErrorMessage
                        style={{ fontSize: 12, color: 'red' }}
                        name="prenom"
                        component="div"
                        classNameName="invalid-feedback"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-row form-row-5">
                      <div className="label2"> Date de naissance : </div>
                    </div>
                    <div className="form-row form-row-6">
                      <Field
                        type="date"
                        id="date_de_naissance"
                        style={{ 'border-radius': 0 }}
                        name="date_de_naissance"
                        min="1920-01-01"
                        max="2020-12-31"
                        classNameName={
                          ' form-control' +
                          (errors.date_de_naissance && touched.date_de_naissance
                            ? ' is-invalid'
                            : '')
                        }
                      />
                      <ErrorMessage
                        style={{ fontSize: 12, color: 'red' }}
                        name="date_de_naissance"
                        component="div"
                        classNameName="invalid-feedback"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <div className="form-row form-row-5">
                        <label className="label1">Genre :</label>
                      </div>{' '}
                      <div className="form-row form-row-6">
                        <div className="p-t-10">
                          <label className="radio-container m-r-45">
                            Homme
                            <input
                              type="radio"
                              checked="checked"
                              name="genre"
                              value={(values.genre = 'Homme')}
                              onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <label className="radio-container">
                            Femme
                            <input
                              type="radio"
                              name="genre"
                              value={(values.genre = 'Femme')}
                              onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <Field
                      type="tel"
                      id="numero_de_telephone"
                      style={{ 'border-radius': 0, '::placeholder color': 'blue' }}
                      name="numero_de_telephone"
                      classNameName={
                        ' form-control' +
                        (errors.numero_de_telephone && touched.numero_de_telephone
                          ? ' is-invalid'
                          : '')
                      }
                      placeholder="Numero de telephone"
                    />
                    <ErrorMessage
                      style={{ fontSize: 12, color: 'red' }}
                      name="numero_de_telephone"
                      component="div"
                      classNameName="invalid-feedback"
                    />
                  </div>

                  <br></br>

                  <div className="form-row">
                    <Field
                      type="text"
                      name="adresse"
                      style={{ 'border-radius': 0 }}
                      classNameName={
                        ' form-control' + (errors.adresse && touched.adresse ? ' is-invalid' : '')
                      }
                      placeholder="Adresse"
                    />

                    <ErrorMessage
                      style={{ fontSize: 12, color: 'red' }}
                      name="adresse"
                      component="div"
                      classNameName="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-right">
                  <br></br>
                  <br></br>
                  <br></br>

                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <div className="label3"> Vous etes un : </div>
                    </div>
                    <div className="form-row form-row-2">
                      <Field
                        name="roles"
                        component="select"
                        style={{ 'border-radius': 0 }}
                        classNameName={
                          ' form-control' + (errors.roles && touched.roles ? ' is-invalid' : '')
                        }
                      >
                        <option value="" disabled selected hidden></option>
                        <option value="User_Candidat">Candidat</option>
                        <option value="User_Professer">Formateur</option>
                      </Field>
                      <span className="select-btn">
                        <i className="zmdi zmdi-chevron-down"></i>
                      </span>
                      <ErrorMessage
                        style={{ fontSize: 12, color: 'red' }}
                        name="roles"
                        component="div"
                        classNameName="invalid-feedback"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <Field
                      name="etat_civil"
                      component="select"
                      style={{ 'border-radius': 0 }}
                      classNameName={
                        ' form-control' +
                        (errors.etat_civil && touched.etat_civil ? ' is-invalid' : '')
                      }
                    >
                      <option value="" disabled selected hidden>
                        Etat civil
                      </option>
                      <option value="Celibataire">Celibataire</option>
                      <option value="Marié(e)">Marié(e)</option>
                    </Field>
                    <span className="select-btn">
                      <i className="zmdi zmdi-chevron-down"></i>
                    </span>

                    <ErrorMessage
                      style={{ fontSize: 12, color: 'red' }}
                      name="etat_civil"
                      component="div"
                      classNameName="invalid-feedback"
                    />
                  </div>
                  <br></br>
                  <div className="form-row">
                    <Field
                      type="text"
                      id="email"
                      style={{ 'border-radius': 0, 'placeholder-color': 'red' }}
                      name="email"
                      classNameName={
                        ' form-control' + (errors.email && touched.email ? ' is-invalid' : '')
                      }
                      placeholder="E-mail"
                    />
                    <ErrorMessage
                      style={{ fontSize: 12, color: 'red' }}
                      name="email"
                      component="div"
                      classNameName="invalid-feedback"
                    />
                  </div>
                  <br></br>
                  <div className="form-row">
                    <Field
                      type="password"
                      id="password"
                      style={{ 'border-radius': 0, color: 'white' }}
                      name="password"
                      classNameName={
                        ' form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                      }
                      placeholder="Mot de passe"
                    />
                    <ErrorMessage
                      style={{ fontSize: 12, color: 'red' }}
                      name="password"
                      component="div"
                      classNameName="invalid-feedback"
                    />
                  </div>
                  <br></br>
                  <div className="form-row">
                    <Field
                      type="password"
                      id="confirmPassword"
                      style={{ 'border-radius': 0 }}
                      name="confirmPassword"
                      classNameName={
                        ' form-control' +
                        (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                      }
                      placeholder="Confirmer le mot de passe"
                    />
                    <ErrorMessage
                      style={{ fontSize: 12, color: 'red' }}
                      name="confirmPassword"
                      component="div"
                      classNameName="invalid-feedback"
                    />
                  </div>

                  <div className="form-row-last">
                    <div classNameName="form-group"></div>
                    <input type="submit" name="register" className="register" value="Valider" />
                  </div>
                </div>
              </Form>
            </div>
          </div>
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
    //  setUser:(data)=> dispatch(authSuccess(data)),
    loginFailure: (message) => dispatch(authFailure(message)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register) */
export default Register
