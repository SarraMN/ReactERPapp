import {
  CButton,
  CCardImage,
  CCard,
  CForm,
  CCol,
  CFormFeedback,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import { Button } from 'react-bootstrap'
import React from 'react'
import { userLogin, fetchUserData, updatepassword } from 'src/services/UserService'
import { useEffect, useState } from 'react'
import { getListeRhs, getusers, deleteuser } from 'src/services/gestionutilisateurs'
import ReactImg1 from 'src/images/work-9.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/work-8.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
import 'src/views/GestionCompte/gestioncompte.css'
import { uploadfile, getfile } from 'src/services/fileService'
import {
  VerifPassword,
  updateuser,
  updateUserName,
  updateEmail,
  updatephoto,
} from 'src/services/UserService'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ReactImg from 'src/assets/images/profile_homme.png'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

const Gestioncompte = () => {
  const [values, setValues] = useState({
    id: '',
    userName: '',
    password: '',
    nom: '',
    prenom: '',
    date_de_naissance: '',
    numero_de_telephone: '',
    adressse: '',
    etat_civil: '',
    email: '',
    genre: '',
    roles: '',
    idimage: '',
    updatedAt: '',
    createdAt: '',
    lastLogin: '',
  })

  const [validated, setValidated] = useState(false)
  const [id, setId] = useState()
  const [userName, setUserName] = useState('')
  const [nom, setNom] = useState()
  const [prenom, setPrenom] = useState()
  const [date_de_naissance, setDate_de_naissance] = useState()
  const [numero_de_telephone, setNumero_de_telephone] = useState()
  const [adressse, setAdressse] = useState()
  const [etat_civil, setEtat_civil] = useState()
  const [roles, setRoles] = useState()
  const [email, setEmail] = useState()
  const [Genre, setGenre] = useState()
  const [Genre2, setGenre2] = useState()
  const [idimage, setIdimage] = useState()
  const [image, setImage] = useState()
  const [image2, setImage2] = useState()
  const [updatedAt, setUpdatedAt] = useState()
  const [createdAt, setCreatedAt] = useState()
  const [lastLogin, setLastLogin] = useState()
  const [test, settest] = useState(false)
  const [verifpassword, setVerifpassword] = useState({ id: '', password: '' })
  function Notification_Passwordupdate() {
    Swal.fire('votre nouveau mot de passe a bien été enregistré', '', 'success')
  }
  function Notification_Info1update() {
    Swal.fire('vos modifications ont été enregistrées ', '', 'success')
  }

  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }
  function Notification_problemedeimage() {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de Photo',
      text: 'La taille du photo choisi est trop grand SVP choisir autre photo',
    })
  }
  function Notification_pasdechangement() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'y a pas des changements',
    })
  }
  function Notification_BadPassword() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur !',
      text: 'Le ancien mot de passe est incorrect',
    })
  }
  const dispatch = useDispatch()

  const [profileimg, setProfileimg] = useState(ReactImg)
  const changerInfo3 = (e) => {
    if (e.nom === nom && e.prenom === prenom && image2 === image) {
      Notification_pasdechangement()
    } else {
      setNom(e.nom)
      setPrenom(e.prenom)
      initialValues2.nom = nom
      initialValues2.prenom = prenom
      values.id = id
      values.adressse = adressse
      values.nom = e.nom
      values.prenom = e.prenom
      values.genre = Genre
      values.email = email
      values.etat_civil = etat_civil
      values.numero_de_telephone = numero_de_telephone
      values.date_de_naissance = date_de_naissance
      values.userName = userName
      values.roles = roles[0].authority
      values.updatedAt = updatedAt
      values.createdAt = createdAt
      values.lastLogin = lastLogin
      values.idimage = idimage

      if (image2 !== image) {
        setImage(image2)
        const formData = new FormData()
        formData.append('file', image2)
        axios({
          method: 'post',
          url: 'http://localhost:8080/file/upload',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(
          function (response) {
            if (response.data !== 0) {
              dispatch({ type: 'set', image: URL.createObjectURL(image2) })

              values.idimage = response.data
              setIdimage(response.data)
              console.log(values)

              updateuser(values).then((response) => {
                if (response.status === 200) {
                  Notification_Info1update()
                } else {
                  Notification_probleme()
                }
              })
            } else {
              Notification_problemedeimage()
            }
          },
          function (error) {},
        )
      } else {
        updateuser(values).then((response) => {
          if (response.status === 200) {
            Notification_Info1update()
          } else {
            Notification_probleme()
          }
        })
      }
    }
  }
  const changerInfo2 = (e) => {

    if (
      e.email === email &&
      e.etat_civil === etat_civil &&
      e.date_de_naissance === date_de_naissance &&
      e.adresse === adressse &&
      Genre2 === Genre &&
      e.numero_de_telephone === numero_de_telephone &&
      e.nom === nom &&
      e.prenom === prenom &&
      image2 === image
    ) {
      Notification_pasdechangement()
    } else {
      initialValues2.nom = nom
      initialValues2.prenom = prenom
      setNom(e.nom)
      setPrenom(e.prenom)
      setEmail(e.email)
      setDate_de_naissance(e.date_de_naissance)
      setEtat_civil(e.etat_civil)
      setAdressse(e.adressse)
      setNumero_de_telephone(e.numero_de_telephone)
      setGenre(e.Genre)
      console.log('ee', e)
      values.nom = e.nom
      values.prenom = e.prenom
      values.id = id
      values.adressse = e.adresse
      values.email = e.email
      values.etat_civil = e.etat_civil
      values.numero_de_telephone = e.numero_de_telephone
      values.date_de_naissance = e.date_de_naissance
      values.userName = userName
      values.roles = roles[0].authority
      values.updatedAt = updatedAt
      values.createdAt = createdAt
      values.lastLogin = lastLogin
      values.genre = Genre
      values.idimage = idimage
      if (e.adresse === undefined) {
        values.adressse = adressse
      }
      values.idimage = idimage
      console.log('hay image1', image2)
      console.log('hay image1', image)
      if (image2 !== image) {
        setImage(image2)
        const formData = new FormData()
        formData.append('file', image2)
        axios({
          method: 'post',
          url: 'http://localhost:8080/file/upload',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(
          function (response) {
            if (response.data !== 0) {
              values.idimage = response.data
              setIdimage(response.data)
              updateuser(values).then((response) => {
                if (response.status === 200) {
                  Notification_Info1update()
                  settest(true)
                  settest(false)
                } else {
                  Notification_probleme()
                }
              })
            } else {
              Notification_problemedeimage()
            }
          },
          function (error) {},
        )
      } else {
        updateuser(values).then((response) => {
          if (response.status === 200) {
            Notification_Info1update()
            settest(true)
            settest(false)
          } else {
            Notification_probleme()
          }
        })
      }
    }
  }
  const changerpassword = (e) => {
    console.log('id', e)
    verifpassword.id = id
    verifpassword.password = e.old_password
    VerifPassword(verifpassword)
      .then((response) => {
        if (response.data == true) {
          values.id = id
          values.adressse = adressse
          values.nom = nom
          values.prenom = prenom
          values.Genre = Genre
          values.email = email
          values.etat_civil = etat_civil
          values.numero_de_telephone = numero_de_telephone
          values.date_de_naissance = date_de_naissance
          values.userName = userName
          values.roles = roles[0].authority
          values.updatedAt = updatedAt
          values.createdAt = createdAt
          values.lastLogin = lastLogin
          values.password = e.password
          values.idimage = idimage
          console.log('vvvv', values)
          updatepassword(values).then((response) => {
            if (response.status === 200) {
              Notification_Passwordupdate()
              document.getElementById('confirmPassword').value = ''
              document.getElementById('password').value = ''
              document.getElementById('old_password').value = ''
              e.old_password = ''
              e.confirmPassword = ''
              e.password = ''
            } else {
              Notification_probleme()
            }
          })
        } else {
          Notification_BadPassword()
        }
      })
      .catch((e) => {})
  }
  useEffect(() => {
    fetchUserData().then((response) => {
      console.log('haw al create at', response)
      setUserName(response.data.userName)
      setId(response.data.id)
      setNom(response.data.nom)
      setPrenom(response.data.prenom)
      setDate_de_naissance(response.data.date_de_naissance)
      setAdressse(response.data.adressse)
      setEmail(response.data.email)
      setNumero_de_telephone(response.data.numero_de_telephone)
      setGenre(response.data.genre)
      setGenre2(response.data.genre)
      setIdimage(response.data.idimage)
      setEtat_civil(response.data.etat_civil)
      setUpdatedAt(response.data.updatedAt)
      setRoles(response.data.roles)
      setCreatedAt(response.data.createdAt)
      setLastLogin(response.data.lastLogin)
      console.log('idimage', idimage)
      if (idimage !== 0) {
        getfile(response.data.idimage)
          .then((response) => {
            setImage(response.data)
            setImage2(response.data)
            setProfileimg(URL.createObjectURL(response.data))
          })
          .catch((e) => {})
      } else {
      }
    })
  }, [test])

  function imageHandler(e) {
    setImage2(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileimg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  /*   const [initialValues, setinitialValues] = useState({
    nom: '',
    prenom: '',
    image: '',
  }) */
  const [initialValues2, setinitialValues2] = useState({
    date_de_naissance: '',
    numero_de_telephone: '',
    adresse: '',
    etat_civil: '',
    Genre: '',
    email: '',
    nom: '',
    prenom: '',
    image: '',
  })
  initialValues2.date_de_naissance = date_de_naissance
  initialValues2.numero_de_telephone = numero_de_telephone
  initialValues2.adresse = adressse
  initialValues2.etat_civil = etat_civil
  initialValues2.email = email
  initialValues2.Genre = Genre
  initialValues2.nom = nom
  initialValues2.prenom = prenom

  return (
    <div>
      <section className="moncompte">
        <Formik
          initialValues={initialValues2}
          validationSchema={Yup.object().shape({
            nom: Yup.string().required('nom est requis'),
            prenom: Yup.string().required('prenom est requis'),
            email: Yup.string().required('Email est requis').email('Email est invalide'),
            date_de_naissance: Yup.string().required('date_de_naissance est invalide'),
            numero_de_telephone: Yup.number()
              .required('Numero de telephone est requis')
              .typeError('Numero de telephone invalide')
              .min(8, 'Numero de telephone de 8 chifres')
              .integer('Un numéro de téléphone ne peut pas inclure de point décimal'),
            adresse: Yup.string()
              .required('Adresse est requis')
              .min(6, 'adresse doit être au moins de 6 caractères'),
          })}
          onSubmit={(values) => changerInfo2(values)}
          render={({ errors, status, touched }) => (
            <Form>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">
                      <span className="icon">
                        <i className="mdi mdi-account"></i>
                      </span>
                      Editer le profil
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
                            changer photo de profil
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
                               value={nom}
                          onChange={(e) => {
                            setNom(e.target.value)
                          }}
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
                               value={prenom}
                          onChange={(e) => {
                            setPrenom(e.target.value)
                          }}
                  className={'input' + (errors.prenom && touched.prenom ? ' is-invalid' : '')}
                        />
                        <ErrorMessage
                          style={{ fontSize: 12, color: 'red' }}
                          name="prenom"
                          component="div"
                          classNameName="invalid-feedback"
                        />{' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">
                      <span className="icon">
                        <i className="mdi mdi-account-circle"></i>
                      </span>
                    </p>
                  </header>

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
                    <div className="form-v10-content form-detail form-left">
                      <div className="form-group">
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
                                {                                <input type="radio" checked={Genre === 'Homme'} name="genre" />
                                 }{' '}
                                <input
                                  checked={Genre === 'Homme'}
                                  type="radio"
                                  name="Genre"
                                  value={(values.genre = 'Homme')}
                                  onChange={(e) => {
                                    setGenre(e.target.value)
                                  }}
                                />
                                <span className="checkmark"></span>
                              </label>
                              <label className="radio-container">
                                <span>Femme </span>
                                {                                 <input type="radio" checked={Genre === 'Femme'} name="genre" />
                                 }{' '}
                                <input
                                  checked={Genre === 'Femme'}
                                  value={(values.genre = 'Femme')}
                                  onChange={(e) => {
                                    setGenre(e.target.value)
                                  }}
                                  type="radio"
                                  name="Genre"
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <select
                      name="etat_civil"
                      component="select"
                      onChange={(e) => {
                        initialValues2.etat_civil = e.target.value
                      }}
                      style={{ 'border-radius': 0, marginBottom: '10px' }}
                      className={
                        'flex input' +
                        (errors.etat_civil && touched.etat_civil ? ' is-invalid' : '')
                      }
                    >
                      <option
                        selected={etat_civil === 'Marié(e)'}
                        value="Marié(e)"
                        onChange={(e) => {
                          initialValues2.etat_civil = 'Marié(e)'
                        }}
                      >
                        Marié(e)
                      </option>
                      <option
                        selected={etat_civil === 'Celibataire'}
                        value="Celibataire"
                        onChange={(e) => {
                          initialValues2.etat_civil = 'Celibataire'
                        }}
                      >
                        Celibataire
                      </option>
                    </select>
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
                                   value={numero_de_telephone}
                              onChange={(e) => {
                                setNumero_de_telephone(e.target.value)
                              }}
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
                                 value={email}
                              onChange={(e) => {
                                setEmail(e.target.value)
                              }}
                           className={
                                'input is-static' +
                                (errors.email && touched.email ? ' is-invalid' : '')
                              }
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
                                 value={adressse}
                              onChange={(e) => {
                                setAdressse(e.target.value)
                              }}
                       
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
            </Form>
          )}
        />
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-lock"></i>
              </span>
              Changer le mot de passe
            </p>
          </header>
          <div className="card-content">
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
                old_password: '',
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .min(6, 'Le mot de passe doit être au moins de 6 caractères')
                  .required('Le mot de passe est requis'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'les mots de passe doivent correspondre')
                  .required('La confirmation du mot de passe est requise'),
                old_password: Yup.string().required('Le mot de passe est requis'),
              })}
              onSubmit={(values) => changerpassword(values)}
              render={({ errors, status, touched }) => (
                <Form>
                  <div className="field">
                    <label className="label">Mot de passe actuel</label>
                    <div className="control">
                      {/*                       <input type="password" name="password_current" className="input" required />
                       */}{' '}
                      <Field
                        type="password"
                        name="old_password"
                        id="old_password"
                        className={
                          'input' +
                          (errors.old_password && touched.old_password ? ' is-invalid' : '')
                        }
                      />{' '}
                      <ErrorMessage
                        style={{ fontSize: 12, color: 'red' }}
                        name="old_password"
                        component="div"
                        classNameName="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Nouveau mot de passe</label>
                    <div className="control">
                      <Field
                        type="password"
                        id="password"
                        name="password"
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
                        className={
                          'input' +
                          (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
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
                        {/*      <button
                          type="submit"
                          className="button blue"
                          style={{ width: '100px', 'background-color': '#213f77' }}
                        >
                          Valider
                        </button> */}
                        <input
                          type="submit"
                          name="register"
                          style={{ width: '100px', 'background-color': '#213f77' }}
                          className="button blue "
                          value="Valider"
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
export default Gestioncompte
