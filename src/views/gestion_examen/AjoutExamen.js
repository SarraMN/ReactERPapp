import {
  CButton,
  CCardImage,
  CCard,
  CForm,
  CCol,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CAlert,
} from '@coreui/react'
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
import 'src/views/gestion_examen/gestion_examen.css'
import { uploadfile, getfile } from 'src/services/fileService'
import { addQuestion, getQuestions, getReponseByQuestion } from 'src/services/questionService'
import { addreponse } from 'src/services/reponseService'
import { getQuestionByExamen } from 'src/services/examenService'
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
import { getFormations } from 'src/services/FormationService'
import { addExamen } from 'src/services/examenService'
import { Modal, Button } from 'react-bootstrap'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

import Questions from 'src/views/gestion_examen/questions'
import { useSelector } from 'react-redux'

const Ajoutxamen = () => {
  const [idexamen, setIdexamen] = useState(0)
  const [idquestion, setIdQuestion] = useState(0)
  const [showAjt, setShowAjt] = useState(false)
  const [check, setcheck] = useState('res1')
  const [questions, setquestions] = useState([])

  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => setShowAjt(false)

  const [formations, setFormations] = useState([])
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }
  useEffect(() => {
    console.log('data')
    getFormations()
      .then((response) => {
        console.log('data', response)
        setFormations(response.data)
      })
      .catch((e) => {})
  }, [])

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
  const [etat, setEtat] = useState('Non archivé')
  const [initialValues2, setinitialValues2] = useState({
    intitule: '',
    duree: '',
    formation: '',
    etat: '',
  })

  const [values, setValues] = useState({
    intitule: '',
    duree: '',
    dateCreation: '',
    dateMdf: '',
    auteur: { id: '' },
    formation: { id: '' },
    etat: '',
  })
  const changerInfo1 = (e) => {
    values.intitule = e.intitule
    values.duree = e.duree
    values.etat = etat
    values.formation.id = e.formation
    console.log('alooo', values)
    addExamen(values).then((response3) => {
      if (response3.status === 200) {
        setIdexamen(response3.data.id)
        document.getElementById('pillsprofiletab2').disabled = false
        document.getElementById('pillsprofiletab1').disabled = true
        document.getElementById('pillsprofiletab2').click()
        document.getElementById('pillsprofiletab1').ariaSelected = 'false'
        document.getElementById('pillsprofiletab2').ariaSelected = 'true'
      } else if (response3.status === 500) {
        console.log('failure')
        Notification_failure()
      }
    })
  }

  return (
    <div>
      <span>
        <ul
          className="nav nav-pills mb-3"
          id="pills-tab"
          role="tablist"
          style={{ marginRight: '42%', marginLeft: '42%' }}
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pillsprofiletab1"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              style={{
                height: '60px',
                width: '60px',
                'font-size': '18 px',
                'font-weight': 'bold',
                'border-radius': '60px',
                marginRight: '20px',
              }}
            >
              1
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pillsprofiletab2"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              style={{
                height: '60px',
                width: '60px',
                'font-size': '18 px',
                'font-weight': 'bold',
                'border-radius': '60px',
              }}
              disabled
            >
              2
            </button>
          </li>
        </ul>
        <br></br>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <section className="moncompte">
              <Formik
                initialValues={initialValues2}
                validationSchema={Yup.object().shape({
                  intitule: Yup.string().required('Intitule est requis'),
                  formation: Yup.string().required('Formation est requise'),
                  duree: Yup.number()
                    .required('La durée est requise')
                    .min(10, 'Minimum de duréé de un examen 10 minutes')
                    .max(180, 'Maximum de duréé de un examen 180 minutes')
                    .integer('La durée de examen ne peut pas inclure de point décimal'),
                })}
                onSubmit={(values) => changerInfo1(values)}
                render={({ errors, status, touched }) => (
                  <Form>
                    <>
                      <div className="card">
                        <header className="card-header">
                          <p className="card-header-title">
                            <span className="icon">
                              <i className="mdi mdi-account-circle"></i>
                            </span>
                            Informations generales
                          </p>
                        </header>
                        <div className="card-content">
                          <div className="conteneur"></div>
                          <div styleName={{ display: 'inline-block', margin: '0 2%' }}>
                            {' '}
                            <div className="field">
                              <label className="label">Intitulé</label>
                              <div className="field-body">
                                <div className="field">
                                  <div className="control">
                                    <Field
                                      type="text"
                                      name="intitule"
                                      className={
                                        'input' +
                                        (errors.intitule && touched.intitule ? ' is-invalid' : '')
                                      }
                                    />
                                    <ErrorMessage
                                      style={{ fontSize: 12, color: 'red' }}
                                      name="intitule"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">
                                {' '}
                                <p>Durée(en minutes)</p>
                              </label>
                              <div className="field-body">
                                <div className="field">
                                  <div className="control">
                                    <Field
                                      type="text"
                                      name="duree"
                                      className={
                                        'input' +
                                        (errors.duree && touched.duree ? ' is-invalid' : '')
                                      }
                                    />
                                    <ErrorMessage
                                      style={{ fontSize: 12, color: 'red' }}
                                      name="duree"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div styleName={{ float: 'left', align: 'left' }}>
                            <div className="field">
                              <label className="label">Formation</label>
                              <div className="field-body">
                                <div className="field">
                                  <div className="control">
                                    <Field
                                      name="formation"
                                      component="select"
                                      /* onChange={(e) => {
                                        initialValues2.formation = e.target.value
                                      }} */
                                      style={{ 'border-radius': 0, marginBottom: '10px' }}
                                      className={
                                        'flex input' +
                                        (errors.formation && touched.formation ? ' is-invalid' : '')
                                      }
                                    >
                                      <option disabled selected hidden value=""></option>
                                      {formations.map((item, index) => (
                                        <option key={index} value={item.id}>
                                          {item.titre}
                                        </option>
                                      ))}
                                    </Field>
                                    <span className="select-btn">
                                      <i className="zmdi zmdi-chevron-down"></i>
                                    </span>
                                    <ErrorMessage
                                      style={{ fontSize: 15, color: '#F21C1C' }}
                                      name="formation"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Etat</label>
                              <div className="field-body">
                                <CFormCheck
                                  type="radio"
                                  name="etat"
                                  id="exampleRadios1"
                                  value="Non archivé"
                                  label="Non archivé"
                                  onChange={(e) => {
                                    setEtat('Non archivé')
                                  }}
                                  defaultChecked
                                />
                                <CFormCheck
                                  type="radio"
                                  name="etat"
                                  id="exampleRadios2"
                                  value="Archivé"
                                  label="Archivé"
                                  onChange={(e) => {
                                    setEtat('archivé')
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div style={{ 'margin-top': '5px', float: 'right', align: 'right' }}>
                            <div>
                              <div className="control">
                                {/* <button
                                  type="submit"
                                  className="button blue"
                                  style={{ width: '100px', 'background-color': '#213f77' }}
                                >
                                  Continuer
                                </button> */}
                                <button
                                  className="btnAdd"
                                  type="submit"
                                  style={{ height: '40px', width: '150px' }}
                                >
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                    style={{ marginRight: '9px' }}
                                  ></i>
                                  Continuer
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{' '}
                      <br></br>
                      <CAlert color="danger" dismissible onClose={() => {}}>
                        <strong> Remarque :</strong> un examen ne peut pas etre envoyer a un
                        candidat que lorsqu{"'"}il presente au minimum cinque questions.
                      </CAlert>
                    </>
                  </Form>
                )}
              />
            </section>
          </div>
          <Questions examen={idexamen}></Questions>
        </div>
      </span>
    </div>
  )
}
export default Ajoutxamen
