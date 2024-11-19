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
import 'src/views/gestion_organismes_conventionnes/AjoutOrganisme.css'
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
import ReactImg from 'src/assets/images/logo1.jpg'
import axios from 'axios'
import Swal from 'sweetalert2'
import { addOrganisme } from 'src/services/organisme_conventionne'

const Ajout_organisme_conventionne = () => {
  const [values, setValues] = useState({
    date_creation: '',
    numero_de_telephone: '',
    adresse: '',
    email: '',
    nom: '',
    logo: { id: '' },
  })
  const [image2, setImage2] = useState()
  function Notification_Passwordupdate() {
    Swal.fire('votre nouveau mot de passe a bien été enregistré', '', 'success')
  }
  function Notification_succes() {
    Swal.fire('Organisme est ajouté avec succes ', '', 'success')
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
  function Notificationimage() {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de Photo',
      text: 'il faut choisir un logo pour le organisme convensioné',
    })
  }

  const [profileimg, setProfileimg] = useState(ReactImg)

  const changerInfo1 = (e) => {
    console.log('les info', e)
    if (profileimg === ReactImg) {
      Notificationimage()
    } else {
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
            values.logo.id = response.data
            values.nom = e.nom
            values.date_creation = e.date_de_creation
            values.numero_de_telephone = e.numero_de_telephone
            values.adresse = e.adresse
            values.email = e.email
            console.log('values', values)
            addOrganisme(values)
              .then((response) => {
                if (response.status === 200) {
                  Notification_succes()
                  e.adresse = ''
                  e.date_de_creation = ''
                  e.numero_de_telephone = ''
                  e.adresse = ''
                  e.nom = ''
                  setImage2(ReactImg)
                  setProfileimg(ReactImg)
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

  const [initialValues2, setinitialValues2] = useState({
    date_de_creation: '',
    numero_de_telephone: '',
    adresse: '',
    email: '',
    nom: '',
    image: '',
  })

  return (
    <div>
      <section className="ajoutOrganisme">
        <Formik
          initialValues={initialValues2}
          validationSchema={Yup.object().shape({
            email: Yup.string().required('Email est requis').email('Email est invalide'),
            date_de_creation: Yup.string().required('date de creation est invalide'),
            numero_de_telephone: Yup.number()
              .required('Numero de telephone est requis')
              .typeError('Numero de telephone invalide')
              .min(8, 'Numero de telephone de 8 chifres')
              .integer('Un numéro de téléphone ne peut pas inclure de point décimal'),
            adresse: Yup.string()
              .required('Adresse est requis')
              .min(6, 'adresse doit être au moins de 6 caractères'),
            nom: Yup.string().required('nom est requis'),
          })}
          onSubmit={(values) => changerInfo1(values)}
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
                        Organisme conventioné
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
                              Ajouter Logo
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
                    </div>
                  </div>
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">
                        <span className="icon">
                          <i className="mdi mdi-account-circle"></i>
                        </span>
                        {/*                 Editer le profil
                         */}{' '}
                      </p>
                    </header>
                    <div className="card-content">
                      <div className="conteneur"></div>
                      <div className="field">
                        <label className="label">Date de creation</label>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <Field
                                type="date"
                                id="date_de_creation"
                                name="date_de_creation"
                                min="1920-01-01"
                                max="2020-12-31"
                                className={
                                  'input' +
                                  (errors.date_de_creation && touched.date_de_creation
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                style={{ fontSize: 12, color: 'red' }}
                                name="date_de_creation"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                        </div>
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
                                /*   value={email}
    onChange={(e) => {
      setEmail(e.target.value)
    }}
*/ className={'input is-static' + (errors.email && touched.email ? ' is-invalid' : '')}
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
export default Ajout_organisme_conventionne
