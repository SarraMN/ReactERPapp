import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import { useLocation } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import 'src/views/GestionUtilisateurs/Ajoutresponsable.css'
import Swal from 'sweetalert2'
import { UserIns } from 'src/services/UserService'
import { uploadfile } from 'src/services/fileService'
import { sendMail } from 'src/services/UserService'
import axios from 'axios'
import ReactImg from 'src/assets/images/profile_homme.png'

const Ajoutresponsable = () => {
  const [image, setImage] = useState(ReactImg)

  const [profileimg, setProfileimg] = useState(ReactImg)
  function imageHandler(e) {
    console.log('coucou', e.target.files[0])
    setImage(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileimg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  ////////////////////
  const [mail] = useState({
    destinataire: '',
    body: '',
    topic: '',
  })

  function Notification_succes(evt) {
    Swal.fire(
      'La ajout de cet responsable a été effectuée avec succès.',
      'Il va etre informé par un Mail',
      'success',
    )
    mail.destinataire = values.email
    mail.body =
      'Votre compte sur le plate-forme GoMyCode est activé , Votre UserName: ' +
      values.userName +
      ' et Mot de passe: ' +
      values.password +
      ' Lorsque vous vous connectez à votre compte, vous pouvez mettre à jour vos informations personnelles (sur vous-mêmes, vos intérêts etc..). Merci!'
    mail.topic = 'Bonjour et bienvenue sur GoMyFormation Tunisia'
    sendMail(mail).then((response) => {
      if (response.status === 200) {
        if (response.data == '') {
          /*    Notification_Echec()
          Vider_champs(e)
      */
        } else {
        }
      } else {
      }
    })
  }
  function Notification_problemedesaisie(err) {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de saisie',
      text: err,
    })
  }
  function Notification_problemedeimage() {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de Photo',
      text: 'La taille du photo choisi est trop grand SVP choisir autre photo',
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
    nom: '',
    prenom: '',
    date_de_naissance: '',
    numero_de_telephone: '',
    adressse: '',
    etat_civil: '',
    email: '',
    Genre: '',
    idimage: 0,
    roles: 'User_Professer',
  })
  const handleSubmit = (evt) => {
    values.adressse = evt.adresse
    values.nom = evt.nom
    values.prenom = evt.prenom
    values.Genre = evt.genre
    values.email = evt.email
    values.etat_civil = evt.etat_civil
    values.numero_de_telephone = evt.numero_de_telephone
    values.date_de_naissance = evt.date_de_naissance
    values.userName = evt.UserName
    values.password = evt.password

    const formData = new FormData()
    formData.append('file', image)
    axios({
      method: 'post',
      url: 'http://localhost:8080/file/upload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(
      function (response) {
        console.log('khraa1', response.data)
        if (response.data !== 0) {
          values.idimage = response.data
          console.log('values', values)
          UserIns(values)
            .then((response) => {
              if (response.status === 200) {
                Notification_succes(evt)
              } else {
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
        } else {
          Notification_problemedeimage()
        }
      },
      function (error) {},
    )
  }

  const handleChange = (e) => {
    e.persist()
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <form action="/" method="post" encType="multipart/form-data">
              <img className="rounded-circle mt-5" width="250px" src={profileimg} />
              <div className="field file mx-auto" style={{ 'margin-top': '40px' }}>
                <label
                  className="upload control mx-auto"
                  style={{ Float: 'center', align: 'center', 'text-align': 'center' }}
                >
                  {/*   <CButton
                          component="input"
                          type="button"
                          color="primary"
                          value="telecharger"
                        /> */}
                  <a
                    className="button blue"
                    style={{
                      color: '#213f77',
                      'background-color': 'white',
                    }}
                  >
                    changer photo de profil
                  </a>
                  <input
                    className="align-items-center text-center p-3 py-5"
                    type="file"
                    id="avatar"
                    name="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(value) => imageHandler(value)}
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-9 ">
          <div className="p-3 py-5">
            <h2 style={{ color: '#213f77', 'font-weight': '500', 'font-size': '35px' }}>
              Des informations generales{' '}
            </h2>
            <br></br>
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
              }}
              validationSchema={Yup.object().shape({
                date_de_naissance: Yup.string().required('date_de_naissance est requis'),
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
                UserName: Yup.string().required('UserName est requis'),
              })}
              onSubmit={(values) => handleSubmit(values)}
              render={({ errors, status, touched }) => (
                <div>
                  <div className="page-content">
                    <div className="form-v10-content">
                      <Form className="form-detail">
                        <div className="form-left">
                          <h2> </h2>

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
                                  ' form-control' +
                                  (errors.prenom && touched.prenom ? ' is-invalid' : '')
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
                                ' form-control' +
                                (errors.adresse && touched.adresse ? ' is-invalid' : '')
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

                          <div className="form-row">
                            <Field
                              type="text"
                              name="UserName"
                              style={{ 'border-radius': 0 }}
                              classNameName={
                                ' form-control' +
                                (errors.UserName && touched.UserName ? ' is-invalid' : '')
                              }
                              placeholder="UserName"
                            />
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
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
                                ' form-control' +
                                (errors.email && touched.email ? ' is-invalid' : '')
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
                                ' form-control' +
                                (errors.password && touched.password ? ' is-invalid' : '')
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
                                (errors.confirmPassword && touched.confirmPassword
                                  ? ' is-invalid'
                                  : '')
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
                            <input
                              type="submit"
                              name="register"
                              className="register"
                              value="Valider"
                            />
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Ajoutresponsable
