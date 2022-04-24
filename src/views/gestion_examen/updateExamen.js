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
} from '@coreui/react'
import React from 'react'
import { userLogin, fetchUserData, updatepassword } from 'src/services/UserService'
import { useEffect, useState } from 'react'
import { getformateurs, getusers, deleteuser } from 'src/services/gestionutilisateurs'
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
import { getQuestionByExamen, updateExamen } from 'src/services/examenService'
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
import { addExamen, getExamen } from 'src/services/examenService'
import { Modal, Button } from 'react-bootstrap'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Questions from 'src/views/gestion_examen/updateQuestions'

const UpdateExamen = () => {
  //initialisation
  let examen = useLocation()
  const [intitule, setintitule] = useState()
  const [duree, setduree] = useState()
  const [bool, setbool] = useState(false)
  const [formation, setformation] = useState({})
  const [dateCreation, sedateCreation] = useState()
  const [dateMdf, sedateMdf] = useState()
  const [etat, setEtat] = useState('Non archivé')
  const [etat2, setEtat2] = useState('Non archivé')
  const [idexamen, setIdexamen] = useState(examen.state.UpdateExamen)

  useEffect(() => {
    getExamen(examen.state.UpdateExamen).then((response) => {
      console.log('hehi response', response)
      setintitule(response.data.intitule)
      setduree(response.data.duree)
      setformation(response.data.formation)
      setEtat(response.data.etat)
      setEtat2(response.data.etat)
      sedateCreation(response.data.dateCreation)
      setIdexamen(response.data.id)
      sedateMdf(response.data.dateMdf)
      if (response.data.etat === 'Non archivé') {
        document.getElementById('exampleRadios1').checked = true
        document.getElementById('exampleRadios2').checked = false
      } else {
        document.getElementById('exampleRadios2').checked = true
        document.getElementById('exampleRadios1').checked = false
      }
      console.log('haa wkhytyyy', response.data.etat)
    })
  }, [bool])
  let navigate = useNavigate()

  const [formations, setFormations] = useState([])
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }
  useEffect(() => {
    getFormations()
      .then((response) => {
        console.log('data', response)
        setFormations(response.data)
      })
      .catch((e) => {})
  }, [])

  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }

  const [initialValues2, setinitialValues2] = useState({
    intitule: '',
    duree: '',
    formation: '',
    etat: '',
  })
  initialValues2.intitule = intitule
  initialValues2.duree = duree
  initialValues2.formation = formation.titre
  initialValues2.etat = etat
  const [values, setValues] = useState({
    intitule: '',
    duree: '',
    dateCreation: '',
    dateMdf: '',
    etat: '',
    formation: { id: '' },
    id: '',
  })
  function Notification_pasdechangement() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'y a pas des changement',
    })
  }
  function Notification_updateExamen() {
    Swal.fire('vos modifications ont été enregistrées ', '', 'success')
  }
  const modifierInfoGenrales = (e) => {
    if (
      e.duree === duree &&
      e.formation === formation.titre &&
      e.intitule === intitule &&
      etat2 === etat
    ) {
      Notification_pasdechangement()
    } else {
      values.intitule = e.intitule
      values.duree = e.duree
      values.dateCreation = dateCreation
      values.dateMdf = dateMdf
      values.formation.id = e.formation
      values.etat = etat
      values.id = idexamen
      if (e.formation === formation.titre) values.formation.id = formation.id
      updateExamen(values).then((response) => {
        if (response.status === 200) {
          Notification_updateExamen()
          setbool(true)
          setbool(false)
        } else {
          Notification_probleme()
        }
      })
    }
    /*     values.intitule = e.intitule
    values.duree = e.duree
    values.etat = etat
    values.formation.id = e.formation
    console.log('alooo', values)
    addExamen(values).then((response3) => {
      if (response3.status === 200) {
        console.log('avec succée')
        setIdexamen(response3.data.id)
        console.log('sabaaa7', document.getElementById('pillsprofiletab2').ariaSelected)
      } else if (response3.status === 500) {
        console.log('failure')
        Notification_failure()
      }
    }) */
  }

  return (
    <div>
      <span>
        <ul
          className="nav nav-pills mb-3"
          id="pills-tab"
          role="tablist"
          style={{ marginRight: '20%', marginLeft: '20%' }}
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
                'font-size': '18 px',
                'font-weight': 'bold',
                marginRight: '20px',
              }}
            >
              Modifier Les informations generales
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
                'font-size': '18 px',
                'font-weight': 'bold',
              }}
            >
              Modifier Les questions
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
                  intitule: Yup.string().required('intitule est requis'),
                  formation: Yup.string().required('formation est requise'),
                  duree: Yup.number()
                    .required('la durée est requis')
                    .min(10, 'minimum de duréé de un examen 10 minutes')
                    .max(180, 'maximum de duréé de un examen 180 minutes')
                    .integer('la durée de examen ne peut pas inclure de point décimal'),
                })}
                onSubmit={(values) => modifierInfoGenrales(values)}
                render={({ errors, status, touched }) => (
                  <Form>
                    <>
                      <div className="card">
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
                                      classNameName="invalid-feedback"
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
                              <div classsName="field-body">
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
                                      classNameName="invalid-feedback"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div styleName={{ float: 'left', align: 'left' }}>
                            <div className="field">
                              <label className="label">Formation</label>
                              <div classsName="field-body">
                                <div className="field">
                                  <div className="control">
                                    <Field
                                      name="formation"
                                      component="select"
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
                                      classNameName="invalid-feedback"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Etat</label>
                              <div classsName="field-body">
                                <CFormCheck
                                  type="radio"
                                  name="etat"
                                  id="exampleRadios1"
                                  value="Non archivé"
                                  label="Non archivé"
                                  onChange={(e) => {
                                    setEtat('Non archivé')
                                  }}
                                  /* defaultChecked */
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
                                <button
                                  type="submit"
                                  className="button blue"
                                  style={{ width: '100px', 'background-color': '#213f77' }}
                                >
                                  Modifier
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{' '}
                    </>
                  </Form>
                )}
              />
            </section>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Questions examen={idexamen}></Questions>
          </div>
        </div>
      </span>
    </div>
  )
}
export default UpdateExamen
