import { UserIns } from 'src/services/UserService'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import 'src/views/pages/register/register.css'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
  let navigate = useNavigate()

  function retour() {
    navigate('/')
  }
  function Notification_succes(evt) {
    Swal.fire(
      'Votre compte a ete créé avec succès.',
      'vous pouvez connecter tout de suite',
      'success',
    )
    navigate('/')
  }
  function Notification_problemedesaisie(err) {
    console.log(err)
    Swal.fire({
      icon: 'error',
      title: 'Probleme de saisie',
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
    Genre: 'Homme',
    roles: '',
    genre: 'Homme',
  })
  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }
  const handleSubmit = (evt) => {
    console.log('valueees', evt)
    values.adressse = evt.adresse
    values.nom = evt.nom
    values.prenom = evt.prenom
    values.email = evt.email
    values.etat_civil = evt.etat_civil
    values.numero_de_telephone = evt.numero_de_telephone
    values.date_de_naissance = evt.date_de_naissance
    values.userName = evt.UserName
    values.roles = 'User_Candidat'
    values.password = evt.password
    //  evt.preventDefault()
    // props.authenticate()
    console.log(values)
    UserIns(values)
      .then((response) => {
        console.log('resultat', response)
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
            case 500:
              console.log(err)
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
        UserName: '',
        etat_civil: '',
        genre: 'Homme',
      }}
      validationSchema={Yup.object().shape({
        date_de_naissance: Yup.string()
          .required('Date de naissance est requise')
          .max(new Date(), 'La date de naissance ne peut pas etre au passé'),
        nom: Yup.string().required('Nom est requis'),
        prenom: Yup.string().required('Prenom est requis'),
        email: Yup.string().required('E-mail est requis').email('E-mail est invalide'),
        password: Yup.string()
          .min(6, 'Le mot de passe doit contenir au minimum 6 caractères')
          .required('Le mot de passe est requis'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'les mots de passe doivent correspondre')
          .required('la confirmation du mot de passe est requise'),
        numero_de_telephone: Yup.number()
          .required('Numero de telephone est requis')
          .typeError('Numero de telephone invalide')
          .min(8, 'Numero de telephone doit contenir au minimum 8 chiffres')
          .integer('Un numéro de téléphone ne peut pas inclure des caractères spéciaux'),
        adresse: Yup.string()
          .required('Adresse est requise')
          .min(6, 'Adresse doit contenir au minimum 6 caractères'),
        etat_civil: Yup.string().required('Etat civil est requis'),
        UserName: Yup.string().required('Identifiant est requis'),
      })}
      onSubmit={(values) => handleSubmit(values)}
      render={({ errors, status, touched }) => (
        <div className="register">
          <div className="page-content3 ">
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
                          style={{ fontSize: 15, color: '#FF3030' }}
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
                          style={{ fontSize: 15, color: '#FF3030' }}
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
                          style={{ fontSize: 15, color: '#FF3030' }}
                          name="date_de_naissance"
                          component="div"
                          classNameName="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <div className="form-row form-row-5">
                          <label className="label2" style={{ paddingBottom: '20px' }}>
                            Genre :
                          </label>
                        </div>{' '}
                        <div className="form-row form-row-7">
                          <div className="p-t-10">
                            <label className="radio-container m-r-45">
                              Homme
                              <input
                                type="radio"
                                checked="checked"
                                name="genre"
                                value={(values.Genre = 'Homme')}
                                onChange={handleChange}
                              />
                              <span className="checkmark"></span>
                            </label>
                            <label className="radio-container">
                              Femme
                              <input
                                type="radio"
                                name="genre"
                                value={(values.Genre = 'Femme')}
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
                        style={{ fontSize: 15, color: '#FF3030' }}
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
                        style={{ fontSize: 15, color: '#FF3030' }}
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

                    <div className="form-row form-row">
                      <Field
                        type="text"
                        name="UserName"
                        style={{ 'border-radius': 0 }}
                        classNameName={
                          ' form-control' +
                          (errors.UserName && touched.UserName ? ' is-invalid' : '')
                        }
                        placeholder="Identifiant"
                      />
                      <ErrorMessage
                        style={{ fontSize: 15, color: '#FF3030' }}
                        name="UserName"
                        component="div"
                        classNameName="invalid-feedback"
                      />
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
                        style={{ fontSize: 15, color: '#FF3030' }}
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
                        style={{ fontSize: 15, color: '#FF3030' }}
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
                          ' form-control' +
                          (errors.password && touched.password ? ' is-invalid' : '')
                        }
                        placeholder="Mot de passe"
                      />
                      <ErrorMessage
                        style={{ fontSize: 15, color: '#FF3030' }}
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
                        style={{ fontSize: 15, color: '#FF3030' }}
                        name="confirmPassword"
                        component="div"
                        classNameName="invalid-feedback"
                      />
                    </div>

                    <div className="form-row-last">
                      <input type="submit" name="register" className="register" value="Valider" />
                    </div>
                    <div style={{ 'text-align': 'center' }}>
                      <p
                        className="btn"
                        style={{
                          color: 'white',
                          'font-size': '16px',
                          'text-align': 'center',
                          'text-decoration': 'underline',
                        }}
                        onClick={() => retour()}
                      >
                        vous avez un compte?
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
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
