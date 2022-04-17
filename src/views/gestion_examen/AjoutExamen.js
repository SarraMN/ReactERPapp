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

const Ajoutxamen = () => {
  const [idexamen, setIdexamen] = useState(0)
  const [idquestion, setIdQuestion] = useState(0)
  const [showAjt, setShowAjt] = useState(false)
  const [check, setcheck] = useState('res1')
  const [questions, setquestions] = useState([])

  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => setShowAjt(false)

  const [formations, setFormations] = useState([])
  const [Listquestions, setListquestions] = useState([])
  const [Listereponses, setreponses] = useState([])
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

  useEffect(() => {
    console.log('data')
    getQuestionByExamen(idexamen)
      .then((response) => {
        console.log('reponseeetyyy', response)
        setListquestions(response.data)
        getReponseByQuestion(response.data.id)
          .then((response) => {
            console.log('setreponses', response)
            setreponses(response.data)
          })
          .catch((e) => {})
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

  const [profileimg, setProfileimg] = useState(ReactImg)

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
  })

  const [question, setQuestion] = useState({
    question: '',
    examen: { id: '' },
  })
  const [reponse, setreponse] = useState({
    reponse: '',
    question: { id: '' },
    correcte: false,
  })
  const ajouterquestion = (e) => {
    question.question = e.question
    question.examen.id = idexamen
    addQuestion(question).then((response3) => {
      if (response3.status === 200) {
        reponse.question.id = response3.data.id
        reponse.reponse = e.reponse1
        if (check === 'res1') {
          reponse.correcte = true
        } else reponse.correcte = false
        console.log('resultat1', reponse)
        addreponse(reponse).then((response3) => {
          if (response3.status === 200) {
            console.log('avec succée')
            reponse.reponse = e.reponse2
            if (check === 'res2') {
              reponse.correcte = true
            } else reponse.correcte = false
            console.log('resultat2', reponse)
            addreponse(reponse).then((response3) => {
              if (response3.status === 200) {
                console.log('avec succée')
                if (check === 'res3') {
                  reponse.correcte = true
                } else reponse.correcte = false
                reponse.reponse = e.reponse3
                console.log('resultat3', reponse)
                addreponse(reponse).then((response3) => {
                  if (response3.status === 200) {
                    console.log('avec succée')
                    getQuestionByExamen(idexamen)
                      .then((response) => {
                        console.log('reponseeetyyy', response)
                        setListquestions(response.data)
                        getReponseByQuestion(response.data.id)
                          .then((response) => {
                            console.log('setreponses', response)
                            setreponses(response.data)
                          })
                          .catch((e) => {})
                      })
                      .catch((e) => {})
                  } else if (response3.status === 500) {
                    console.log('failure')
                    Notification_failure()
                  }
                })
              } else if (response3.status === 500) {
                console.log('failure')
                Notification_failure()
              }
            })
          } else if (response3.status === 500) {
            console.log('failure')
            Notification_failure()
          }
        })
      } else if (response3.status === 500) {
        console.log('failure')
        Notification_failure()
      }
    })
  }
  const changerInfo1 = (e) => {
    console.log('hello', e)
    console.log('hello', etat)
    values.intitule = e.intitule
    values.duree = e.duree
    values.etat = etat
    values.formation.id = e.formation
    console.log('alooo', values)
    addExamen(values).then((response3) => {
      if (response3.status === 200) {
        console.log('avec succée')
        setIdexamen(response3.data.id)
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
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
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
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              style={{
                height: '60px',
                width: '60px',
                'font-size': '18 px',
                'font-weight': 'bold',
                'border-radius': '60px',
              }}
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
                  intitule: Yup.string().required('intitule est requis'),
                  formation: Yup.string().required('formation est requise'),
                  duree: Yup.number()
                    .required('la durée est requis')
                    .min(10, 'minimum de duréé de un examen 10 minutes')
                    .max(180, 'maximum de duréé de un examen 180 minutes')
                    .integer('la durée de examen ne peut pas inclure de point décimal'),
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
                                <button
                                  type="submit"
                                  className="button blue"
                                  style={{ width: '100px', 'background-color': '#213f77' }}
                                >
                                  Continuer
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
            <header className="card-heade" style={{ marginBottom: '25px' }}></header>
            <br></br>
            <Modal
              size="lg"
              show={showAjt}
              onHide={handleCloseAjt}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header
                closeButton
                style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}
              >
                <CIcon
                  icon={cilPencil}
                  style={{
                    marginRight: 15,
                  }}
                />
                Ajouter question
              </Modal.Header>
              <Modal.Body>
                <section className="moncompte">
                  <div className="card">
                    <div className="card-content">
                      <Formik
                        initialValues={{
                          question: '',
                          reponse1: '',
                          reponse2: '',
                          reponse3: '',
                        }}
                        validationSchema={Yup.object().shape({
                          question: Yup.string().required('Le question est requis'),
                          reponse3: Yup.string().required('La reponse est requis'),
                          reponse1: Yup.string().required('La reponse est requis'),
                          reponse2: Yup.string().required('La reponse est requis'),
                        })}
                        onSubmit={(values) => ajouterquestion(values)}
                        render={({ errors, status, touched }) => (
                          <Form>
                            <div className="field">
                              <label className="label">Question Numero 1</label>
                              <div className="control">
                                <Field
                                  type="text"
                                  name="question"
                                  id="question"
                                  className={
                                    'input' +
                                    (errors.question && touched.question ? ' is-invalid' : '')
                                  }
                                />{' '}
                                <ErrorMessage
                                  style={{ fontSize: 12, color: 'red' }}
                                  name="question"
                                  component="div"
                                  classNameName="invalid-feedback"
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Reponses :</label>
                              <div classsName="field-body">
                                <CFormCheck
                                  type="radio"
                                  name="etat"
                                  id="exampleRadios1"
                                  value="res1"
                                  onChange={(e) => {
                                    setcheck('res1')
                                  }}
                                  defaultChecked
                                ></CFormCheck>
                                <Field
                                  style={{
                                    marginLeft: '25px',
                                    width: '300px',
                                    marginBottom: '10px',
                                  }}
                                  type="text"
                                  name="reponse1"
                                  id="reponse1"
                                  className={
                                    'input' +
                                    (errors.reponse1 && touched.reponse1 ? ' is-invalid' : '')
                                  }
                                />{' '}
                                <ErrorMessage
                                  style={{ fontSize: 12, color: 'red' }}
                                  name="reponse1"
                                  component="div"
                                  classNameName="invalid-feedback"
                                />
                                <br></br>
                                <CFormCheck
                                  type="radio"
                                  name="etat"
                                  value="res2"
                                  onChange={(e) => {
                                    setcheck('res2')
                                  }}
                                  /* value="Non archivé"
                              label="Non archivé"
                              onChange={(e) => {
                                setEtat('Non archivé')
                              }} */
                                ></CFormCheck>
                                <Field
                                  style={{
                                    marginLeft: '25px',
                                    width: '300px',
                                    marginBottom: '10px',
                                  }}
                                  type="text"
                                  name="reponse2"
                                  className={
                                    'input' +
                                    (errors.reponse2 && touched.reponse2 ? ' is-invalid' : '')
                                  }
                                />{' '}
                                <ErrorMessage
                                  style={{ fontSize: 12, color: 'red' }}
                                  name="reponse2"
                                  component="div"
                                  classNameName="invalid-feedback"
                                />
                                <br></br>
                                <CFormCheck
                                  type="radio"
                                  name="etat"
                                  id="exampleRadios3"
                                  value="res3"
                                  onChange={(e) => {
                                    setcheck('res3')
                                  }}
                                  /* value="Non archivé"
                              label="Non archivé"
                              onChange={(e) => {
                                setEtat('Non archivé')
                              }} */
                                ></CFormCheck>
                                <Field
                                  style={{ marginLeft: '25px', width: '300px' }}
                                  type="text"
                                  name="reponse3"
                                  className={
                                    'input' +
                                    (errors.reponse3 && touched.reponse3 ? ' is-invalid' : '')
                                  }
                                />{' '}
                                <ErrorMessage
                                  style={{ fontSize: 12, color: 'red' }}
                                  name="reponse3"
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
              </Modal.Body>
            </Modal>
            <section className="moncompte">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    <span className="icon">
                      <i className="mdi mdi-account-circle"></i>
                    </span>
                    <p style={{ 'font-size': '1.2em' }}>Les questions</p>
                  </p>
                  <button
                    className="btn_ajt_question"
                    onClick={handleShowAjt}
                    type="submit"
                    style={{
                      float: 'right',
                      align: 'right',
                      border: ' 1px solid black',
                      height: '48px',
                      width: '200px',
                      'font-size': '1em',
                      'font-style': 'inherit',
                    }}
                  >
                    <p
                      style={{
                        marginRight: 10,
                        paddingTop: 5,
                        'font-size': '1.2em',
                      }}
                    >
                      Ajouter question
                    </p>
                  </button>
                </header>

                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              Numero
                            </p>
                          </th>
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              {' '}
                              Questions
                            </p>
                          </th>{' '}
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              {' '}
                              Reponse
                            </p>
                          </th>
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              {' '}
                              Action
                            </p>
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Listquestions.map((item, index) => (
                          <tr key={index}>
                            <td
                              className="align-middle text-center text-sm"
                              /*                                   onClick={(index) => organsimeProfil(item)}
                               */
                            >
                              <span
                                className="badge badge-sm"
                                style={{ color: 'black', 'font-size': '12px' }}
                              >
                                {/*                                     <CAvatar src={images[index]} size="md" />
                                 */}{' '}
                                {index + 1}
                              </span>
                            </td>
                            <td
                              className="align-middle text-center text-sm"
                              /*                                   onClick={(index) => organsimeProfil(item)}
                               */
                            >
                              {' '}
                              {item.question}
                              <span
                                className="badge badge-sm"
                                style={{ color: 'black', 'font-size': '12px' }}
                              ></span>
                            </td>
                            <td
                              className="align-middle text-center"
                              /*                                   onClick={(index) => organsimeProfil(item)}
                               */
                            >
                              {Listereponses.map((item, index) => (
                                <span
                                  className="text-secondary text-xs font-weight-bold"
                                  key={index}
                                >
                                  {item.reponse}
                                </span>
                              ))}
                            </td>

                            <td className="align-middle text-center">
                              <button
                                style={{
                                  border: 0,
                                  backgroundColor: 'transparent',
                                }}
                                /*                                     onClick={(index) => Deleteorganisme(item.id)}
                                 */
                              >
                                <CIcon
                                  icon={cilTrash}
                                  customClassName="nav-icon"
                                  style={{
                                    marginTop: 5,
                                    width: 30,
                                    height: 30,
                                    color: 'red',
                                  }}
                                />
                              </button>
                              <button
                                style={{
                                  border: 0,
                                  backgroundColor: 'transparent',
                                }}
                                /*                                     onClick={(index) => Updateorganisme(item.id)}
                                 */
                              >
                                <CIcon
                                  icon={cilPencil}
                                  customClassName="nav-icon"
                                  style={{
                                    marginTop: 5,
                                    width: 30,
                                    height: 30,
                                    color: 'green',
                                  }}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ 'text-align': ' center' }}>
                      <br></br>
                      {/*  <CPagination
                            className="justify-content-end"
                            aria-label="Page navigation example"
                            style={{ marginRight: 20 }}
                          >
                            <a
                              onClick={() => {
                                if (PreviewsPage != 0) {
                                  setCurrentPage(PreviewsPage)
                                  paginate(PreviewsPage)
                                  setactiveNumber(PreviewsPage)
                                }
                              }}
                            >
                              <CPaginationItem aria-label="Previous" disabled>
                                <span aria-hidden="true">&laquo;</span>
                              </CPaginationItem>
                            </a>
                            <a>
                              <CPaginationItem active>{activeNumber}</CPaginationItem>
                            </a>
                            <a
                              onClick={() => {
                                if (currentPage < posts.length / postsPerPage) {
                                  setCurrentPage(NextPage)
                                  paginate(NextPage)
                                  setactiveNumber(NextPage)
                                }
                              }}
                            >
                              <CPaginationItem aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </CPaginationItem>
                            </a>
                          </CPagination> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </span>
    </div>
  )
}
export default Ajoutxamen
