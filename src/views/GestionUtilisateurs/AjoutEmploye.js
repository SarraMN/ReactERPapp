import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import 'src/views/GestionUtilisateurs/AjoutUser.css'
import Swal from 'sweetalert2'
import { addUser, UserIns } from 'src/services/UserService'
import { sendMail } from 'src/services/UserService'
import axios from 'axios'
import ReactImg from 'src/assets/images/profile_homme.png'

const AjoutEmploye = () => {
  const [image, setImage] = useState(ReactImg)

  const [profileimg, setProfileimg] = useState(ReactImg)
  function imageHandler(e) {
    setImage(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileimg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  const [test, setest] = useState(false)

  ////////////////////
  const [mail] = useState({
    destinataire: '',
    body: '',
    topic: '',
  })

  function Notification_succes() {
    Swal.fire(
      'La ajout de cet employé a été effectuée avec succès.',
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
  function ChoixPhoto() {
    Swal.fire({
      icon: 'warning',
      title: 'Il faut choisir une photo',
      text: '',
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
    genre: 'Femme',
    idimage: 0,
    roles: 'User_Employee',
  })
  const handleSubmit = (evt) => {
    values.adressse = evt.adresse
    values.nom = evt.nom
    values.prenom = evt.prenom
    values.email = evt.email
    values.etat_civil = evt.etat_civil
    values.numero_de_telephone = evt.numero_de_telephone
    values.date_de_naissance = evt.date_de_naissance
    values.userName = evt.UserName
    values.password = evt.password

    if (image === ReactImg) {
      ChoixPhoto()
    } else {
      const formData = new FormData()
      formData.append('file', image)
      axios({
        method: 'post',
        url: 'http://localhost:8080/file/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(
        function (response) {
          if (response.data !== 0) {
            values.idimage = response.data
            console.log('values', values)
            addUser(values)
              .then((response) => {
                if (response.status === 200) {
                  evt.nom = ''
                  evt.prenom = ''
                  evt.numero_de_telephone = ''
                  evt.date_de_naissance = ''
                  evt.UserName = ''
                  evt.adresse = ''
                  evt.password = ''
                  evt.confirmPassword = ''
                  evt.email = ''
                  evt.etat_civil = ''
                  document.getElementById('etatcivil').selected = true
                  setProfileimg(ReactImg)
                  setImage(ReactImg)
                  setest(true)
                  setest(false)
                  Notification_succes()
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
  }

  const handleChange = (e) => {
    e.persist()
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }))
  }
  const [initialValues2, setinitialValues2] = useState({
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
    genre: 'Femme',
  })
  useEffect(() => {
    initialValues2.date_de_naissance = ''
    initialValues2.prenom = ''
    initialValues2.email = ''
    initialValues2.password = ''
    initialValues2.confirmPassword = ''
    initialValues2.nom = ''
    initialValues2.numero_de_telephone = ''
    initialValues2.adresse = ''
    initialValues2.UserName = ''
    initialValues2.etat_civil = ''
    initialValues2.genre = 'Femme'
  }, [test])

  return (
    <div className="userProfil">
      <section className="moncompte">
        <Formik
          initialValues={initialValues2}
          validationSchema={Yup.object().shape({
            date_de_naissance: Yup.string().required('Date de naissance est requis'),
            nom: Yup.string().required('nom est requis'),
            prenom: Yup.string().required('prenom est requis'),
            email: Yup.string().required('Email est requis').email('Email est invalide'),
            password: Yup.string()
              .min(6, 'Le mot de passe doit être au moins de 6 caractères')
              .required('Le mot de passe est requis'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'les mots de passe doivent correspondre')
              .required('La confirmation du mot de passe est requis'),
            numero_de_telephone: Yup.number()
              .required('Numero de telephone est requis')
              .typeError('Numero de telephone invalide')
              .min(8, 'Numero de telephone de 8 chifres')
              .integer('Un numéro de téléphone ne peut pas inclure de point décimal'),
            adresse: Yup.string()
              .required('Adresse est requis')
              .min(6, 'Adresse doit être au moins de 6 caractères'),
            etat_civil: Yup.string().required('Etat civil est requis'),
            UserName: Yup.string().required('Identifiant est requis'),
          })}
          onSubmit={(values) => handleSubmit(values)}
          render={({ errors, status, touched }) => (
            <Form>
              <>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">
                        <span className="icon">
                          <i className="mdi mdi-account"></i>
                        </span>
                        Ajouter Employé
                      </p>
                    </header>

                    <div className="card-content">
                      <div className="image w-48 h-48 mx-auto">
                        <img src={profileimg} alt="user" className="rounded-full" />
                      </div>
                      <div className="field-body mx-auto" style={{ 'margin-top': '40px' }}>
                        <div className="field file mx-auto">
                          <label
                            className="upload control mx-auto"
                            style={{ Float: 'center', align: 'center', 'text-align': 'center' }}
                          >
                            <a
                              className="button blue"
                              style={{
                                color: '#213f77',
                                'background-color': 'white',
                              }}
                            >
                              Ajouter photo
                            </a>
                            <Field
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                              onChange={(value) => imageHandler(value)}
                              name="image"
                              className={errors.image && touched.image ? ' is-invalid' : ''}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Nom</label>
                        <div className="control">
                          <Field
                            type="text"
                            name="nom"
                            placeholder="Nom"
                            className={'input' + (errors.nom && touched.nom ? ' is-invalid' : '')}
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="nom"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Prenom</label>
                        <div className="control">
                          <Field
                            type="text"
                            name="prenom"
                            placeholder="Prenom"
                            className={
                              'input' + (errors.prenom && touched.prenom ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="prenom"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Identitifiant</label>
                        <div className="control">
                          <Field
                            type="text"
                            name="UserName"
                            placeholder="Identitifiant"
                            className={
                              'input' + (errors.UserName && touched.UserName ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="UserName"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-content">
                      <div className="conteneur"></div>
                      <div className="field">
                        <label className="label">Date de naissance</label>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <Field
                                type="date"
                                id="date_de_naissance"
                                name="date_de_naissance"
                                min="1920-01-01"
                                max="2020-12-31"
                                className={
                                  'input' +
                                  (errors.date_de_naissance && touched.date_de_naissance
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                style={{ fontSize: 12, color: 'red' }}
                                name="date_de_naissance"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-group">
                        <div className="form-row form-row-5">
                          <label
                            className="label"
                            style={{ marginRight: '30px', marginLeft: '10px' }}
                          >
                            Genre
                          </label>
                        </div>
                        <div className="form-row form-row-6">
                          <div className="p-t-10">
                            <label
                              className="radio-container m-r-45"
                              style={{ 'margin-right': '30px', fontSize: ' medium' }}
                            >
                              <span>Homme </span>
                              {/*                                 <input type="radio" checked={Genre === 'Homme'} name="genre" />
                               */}{' '}
                              <input
                                type="radio"
                                name="genre"
                                value={(values.Genre = 'Homme')}
                                onChange={handleChange}
                              />
                              <span className="checkmark"></span>
                            </label>
                            <label className="radio-container">
                              <span>Femme </span>
                              {/*                                 <input type="radio" checked={Genre === 'Femme'} name="genre" />
                               */}{' '}
                              <input
                                value={(values.Genre = 'Femme')}
                                /*                                 onChange={(e) => {
                                  setGenre(e.target.value)
                                }} */
                                checked="checked"
                                type="radio"
                                name="genre"
                                onChange={handleChange}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" style={{ marginRight: '30px' }}>
                          Etat civil
                        </label>
                        <Field
                          name="etat_civil"
                          component="select"
                          style={{ 'border-radius': 0 }}
                          className={
                            'flex input' +
                            (errors.etat_civil && touched.etat_civil ? ' is-invalid' : '')
                          }
                        >
                          <option value="" disabled selected hidden id="etatcivil">
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
                      <div className="field">
                        <label className="label">Numero de telephone</label>
                        <div classsName="field-body">
                          <div className="field">
                            <div className="control">
                              <Field
                                type="tel"
                                id="numero_de_telephone"
                                style={{ 'border-radius': 0, '::placeholder color': 'blue' }}
                                name="numero_de_telephone"
                                className="input"
                                classNameName={
                                  errors.numero_de_telephone && touched.numero_de_telephone
                                    ? ' is-invalid'
                                    : ''
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
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">E-mail</label>
                        <div classsName="field-body">
                          <div className="field">
                            <div className="control">
                              <Field
                                type="text"
                                name="email"
                                className={
                                  'input is-static' +
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
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Adresse</label>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <Field
                                type="text"
                                name="adresse"
                                style={{ 'border-radius': 0 }}
                                className={`input ${errors.adresse && touched.adresse ? 'is-invalid' : ''}`}
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
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Nouveau mot de passe</label>
                        <div className="control">
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mot de passe"
                            className={
                              'input' + (errors.password && touched.password ? ' is-invalid' : '')
                            }
                          />

                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="password"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Confirmez le mot de passe</label>
                        <div className="control">
                          <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmer mot de passe"
                            className={
                              'input' +
                              (errors.confirmPassword && touched.confirmPassword
                                ? ' is-invalid'
                                : '')
                            }
                          />

                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="confirmPassword"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div style={{ 'margin-top': '5px', float: 'right', align: 'right' }}>
                        <div>
                          <div className="control">
                            <button
                              type="submit"
                              className="button blue"
                              style={{ width: '100px', 'background-color': '#213f77' }}
                            >
                              Valider
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </Form>
          )}
        />
      </section>
    </div>
  )
}
export default AjoutEmploye
