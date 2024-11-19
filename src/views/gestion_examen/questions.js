import { CAlert, CFormCheck } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'

import 'src/views/GestionCompte/gestioncompte.css'
import 'src/views/gestion_examen/gestion_examen.css'
import { addQuestion, deletequestion, getReponseByQuestion } from 'src/services/questionService'
import { addreponse } from 'src/services/reponseService'
import { getQuestionByExamen } from 'src/services/examenService'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap'
import CIcon from '@coreui/icons-react'
import { cilCheck, cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import { propTypes } from 'react-bootstrap/esm/Image'
import Updatequestion from 'src/views/gestion_examen/Updatequestion'
import 'src/views/gestion_examen/question.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Questions = (props) => {
  console.log('id formation', props.examen)

  /*  function btnAjouterQuestion() {
    document.getElementById('sectionQuestion2').style.display = 'none'
  } */
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

  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }
  const [idquestionUpdate, setidquestionUpdate] = useState()
  const [bool, setbool] = useState(false)

  const [numerodequestion, setnumerodequestion] = useState(1)
  const [idexamen, setIdexamen] = useState(props.examen)
  const [idquestion, setIdQuestion] = useState(0)
  const [showAjt, setShowAjt] = useState(false)
  const [showMdf, setShowMdf] = useState(false)
  const [check, setcheck] = useState('res1')
  const [questions, setquestions] = useState([])
  const [Listquestions, setListquestions] = useState([])
  const [Listereponses, setreponses] = useState([])
  const [Listereponses2, setreponses2] = useState([])
  const handleCloseAjt = () => setShowAjt(false)
  const handleShowAjt = () => setShowAjt(true)
  const validerExamen = () => {
    notification_deValidationdeExamen()
  }
  const handleCloseMdf = () => {
    setbool(true)
    setbool(false)
    getListQuestions()
    setShowMdf(false)
  }
  const handleShowMdf = () => setShowMdf(true)

  useEffect(() => {
    getQuestionByExamen(props.examen)
      .then((response) => {
        setListquestions(response.data)
        response.data.map((item, index) => {
          getReponseByQuestion(item.id)
            .then((response) => {
              Listereponses.push(response.data)
            })
            .catch((e) => {})
        })
        setreponses2(Listereponses)
      })
      .catch((e) => {})
  }, [bool, Listereponses2, showMdf, showAjt])
  let navigate = useNavigate()

  function notification_deValidation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet question ?',
      showDenyButton: true,
      confirmButtonText: 'valider',
      denyButtonText: `annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        deletequestion(id)
          .then((response) => {
            console.log('data', response.data)
          })
          .catch((e) => {})

        Swal.fire('La suppression de cet question a réussi!', '', 'success')
        setnumerodequestion(numerodequestion - 1)
        setbool(true)
        setbool(false)
        getListQuestions()
        /*         getListQuestions()
         */
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  function notification_deValidationdeExamen() {
    Swal.fire({
      title: 'Souhaitez-vous Valider cet examen ?',
      showDenyButton: true,
      confirmButtonText: 'valider',
      denyButtonText: `annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('La creation de cet examen a réussi!', '', 'success')
        navigate('/gestion_examen/gestion_examen')
      } else if (result.isDenied) {
      }
    })
  }

  function UpdateQuestion(id) {
    setidquestionUpdate(id)
    handleShowMdf()
  }
  function DeleteQuestion(id) {
    notification_deValidation(id)
  }
  function getListQuestions() {
    getQuestionByExamen(props.examen)
      .then((response) => {
        setListquestions(response.data)
        getListReponse(response.data)
      })
      .catch((e) => {})
  }
  function getListReponse(res) {
    setreponses([])

    res.map((item, index) => {
      getReponseByQuestion(item.id)
        .then((response) => {
          /*           Listereponses2.push(response.data)
           */ Listereponses.push(response.data)
        })
        .catch((e) => {})
      /*      Listereponses.push(Listereponses2)
      setreponses2([]) */
    })
    setreponses2(Listereponses)
  }
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
    question.examen.id = props.examen
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
            addreponse(reponse).then((response3) => {
              if (response3.status === 200) {
                if (check === 'res3') {
                  reponse.correcte = true
                } else reponse.correcte = false
                reponse.reponse = e.reponse3
                addreponse(reponse).then((response3) => {
                  if (response3.status === 200) {
                    getListQuestions()
                    setnumerodequestion(numerodequestion + 1)
                    setcheck('res1')
                    e.question = ''
                    e.reponse1 = ''
                    e.reponse2 = ''
                    e.reponse3 = ''
                  } else if (response3.status === 500) {
                    Notification_failure()
                  }
                })
              } else if (response3.status === 500) {
                Notification_failure()
              }
            })
          } else if (response3.status === 500) {
            Notification_failure()
          }
        })
      } else if (response3.status === 500) {
        Notification_failure()
      }
    })
  }
  /* 
  if (props.examen !== 0 && Listquestions.length === 0) {
    return (
      <div id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <section className="moncompte">
          <div className="card">
            <div className="card-content" style={{ backgroundColor: '#D6D3F3' }}>
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
                      <label className="label">Question Numero {numerodequestion}</label>
                      <div className="control">
                        <Field
                          type="text"
                          name="question"
                          id="question"
                          className={
                            'input' + (errors.question && touched.question ? ' is-invalid' : '')
                          }
                        />{' '}
                        <ErrorMessage
                          style={{ fontSize: 12, color: 'red' }}
                          name="question"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Reponses :</label>
                      <div className="field-body">
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
                            'input' + (errors.reponse1 && touched.reponse1 ? ' is-invalid' : '')
                          }
                        />{' '}
                        <ErrorMessage
                          style={{ fontSize: 12, color: 'red' }}
                          name="reponse1"
                          component="div"
                          className="invalid-feedback"
                        />
                        <br></br>
                        <CFormCheck
                          type="radio"
                          name="etat"
                          value="res2"
                          onChange={(e) => {
                            setcheck('res2')
                          }}
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
                            'input' + (errors.reponse2 && touched.reponse2 ? ' is-invalid' : '')
                          }
                        />{' '}
                        <ErrorMessage
                          style={{ fontSize: 12, color: 'red' }}
                          name="reponse2"
                          component="div"
                          className="invalid-feedback"
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
                        ></CFormCheck>
                        <Field
                          style={{ marginLeft: '25px', width: '300px' }}
                          type="text"
                          name="reponse3"
                          className={
                            'input' + (errors.reponse3 && touched.reponse3 ? ' is-invalid' : '')
                          }
                        />{' '}
                        <ErrorMessage
                          style={{ fontSize: 12, color: 'red' }}
                          name="reponse3"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div style={{ 'margin-top': '5px', float: 'right', align: 'right' }}>
                      <div>
                        <div className="control">
                          <input
                            type="submit"
                            name="register"
                            style={{ width: '100px', 'background-color': '#213f77' }}
                            className="button blue "
                            value="Ajouter"
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
        <br></br>
        <CAlert color="danger" dismissible onClose={() => {}}>
          <strong> Remarque :</strong> afin de creer un examen il faut ajouter au minimum un
          question{' '}
        </CAlert>
      </div>
    )
  } else */
  if (props.examen === 0) {
    return <div></div>
  } else if (Listquestions.length === 0) {
    return (
      <div id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <section className="moncompte">
          <div className="card">
            <header className="card-heade">
              <p
                style={{
                  color: 'black',
                  paddingTop: '20px',
                  paddingLeft: '10px',
                  'font-size': '1.2em',
                }}
              >
                <span style={{ marginTop: '140px' }}>La liste des questions :</span>
                <div
                  style={{
                    float: 'right',
                    align: 'right',
                    paddingRight: '25px',
                    marginBottom: '10px',
                  }}
                >
                  <button
                    onClick={handleShowAjt}
                    type="submit"
                    style={{
                      height: '60px',
                      width: '60px',
                      'border-radius': '60px',
                      backgroundColor: 'green',
                      color: 'white',
                    }}
                  >
                    <i className="fa fa-plus" aria-hidden="true" style={{ fontSize: 35 }}></i>
                  </button>
                </div>
              </p>
            </header>
            <div>
              <div className="table-responsive p-0" style={{ height: '300px' }}>
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
                      <th style={{ 'text-align': 'left' }}>
                        <p
                          style={{
                            color: 'light',
                            'font-size': '17px',
                            'font-weight': 'bold',
                          }}
                        >
                          {' '}
                          Reponses
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
                  <tbody></tbody>
                </table>
                <div style={{ 'text-align': ' center' }}>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal
          size="lg"
          show={showAjt}
          onHide={handleCloseAjt}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: '#213f77', fontWeight: 'bold' }}>
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
                          <label className="label">Question Numero {numerodequestion}</label>
                          <div className="control">
                            <Field
                              type="text"
                              name="question"
                              id="question"
                              className={
                                'input' + (errors.question && touched.question ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="question"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Reponses :</label>
                          <div className="field-body">
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
                                'input' + (errors.reponse1 && touched.reponse1 ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="reponse1"
                              component="div"
                              className="invalid-feedback"
                            />
                            <br></br>
                            <CFormCheck
                              type="radio"
                              name="etat"
                              value="res2"
                              onChange={(e) => {
                                setcheck('res2')
                              }}
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
                                'input' + (errors.reponse2 && touched.reponse2 ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="reponse2"
                              component="div"
                              className="invalid-feedback"
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
                            ></CFormCheck>
                            <Field
                              style={{ marginLeft: '25px', width: '300px' }}
                              type="text"
                              name="reponse3"
                              className={
                                'input' + (errors.reponse3 && touched.reponse3 ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="reponse3"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div style={{ 'margin-top': '5px', float: 'right', align: 'right' }}>
                          <div>
                            <div className="control">
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
        <br></br>
        <div style={{ align: 'right', float: 'right' }}>
          <button
            className="btnAjQuestion"
            onClick={validerExamen}
            type="submit"
            style={{
              float: 'right',
              align: 'right',
              border: ' 1px solid black',
              height: '48px',
              width: '200px',
              'font-size': '1em',
              'font-style': 'inherit',
              marginLeft: '10px',
              backgroundColor: '#213f77',
              color: 'white',
            }}
          >
            <p
              style={{
                'font-size': '1.2em',
                marginTop: '4px',
              }}
            >
              {' '}
              <i className="fa fa-check" aria-hidden="true" style={{ marginRight: '6px' }}></i>
              Valider L{"'"}examen
            </p>
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <section className="moncompte">
          <div className="card">
            <header className="card-heade">
              <p
                style={{
                  color: 'black',
                  paddingTop: '20px',
                  paddingLeft: '10px',
                  'font-size': '1.2em',
                }}
              >
                <span style={{ marginTop: '140px' }}>La liste des questions :</span>
                <div
                  style={{
                    float: 'right',
                    align: 'right',
                    paddingRight: '25px',
                    marginBottom: '10px',
                  }}
                >
                  <button
                    onClick={handleShowAjt}
                    type="submit"
                    style={{
                      height: '50px',
                      width: '50px',
                      'border-radius': '60px',
                      backgroundColor: 'green',
                      color: 'white',
                    }}
                  >
                    <i className="fa fa-plus" aria-hidden="true" style={{ fontSize: 35 }}></i>
                  </button>
                </div>
              </p>
            </header>
            <div>
              <div className="table-responsive p-0" style={{ height: '300px' }}>
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
                      <th style={{ 'text-align': 'left' }}>
                        <p
                          style={{
                            color: 'light',
                            'font-size': '17px',
                            'font-weight': 'bold',
                          }}
                        >
                          {' '}
                          Reponses
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
                          <p style={{ width: '200px' }}> {item.question}</p>
                          <span
                            className="badge badge-sm"
                            style={{ color: 'black', 'font-size': '12px' }}
                          ></span>
                        </td>
                        <td
                          className="align-middle text-center"
                          style={{ width: '500px', 'text-align': 'left' }}
                          /*                                   onClick={(index) => organsimeProfil(item)}
                           */
                        >
                          <span
                            className="text-secondary text-xs font-weight-bold"
                            style={{ color: 'black', 'text-align': 'left' }}
                          >
                            {Listereponses2.map((row, i) => (
                              <div key={i} style={{ color: 'black', 'text-align': 'left' }}>
                                {index === i ? (
                                  <div>
                                    {' '}
                                    {row.map((col, j) => (
                                      <span key={j}>
                                        <span>
                                          <span style={{ 'text-align': 'left' }}>
                                            {' '}
                                            Reponse N° {j + 1} :
                                          </span>
                                          {col.correcte === true ? (
                                            <span style={{ color: 'green' }}>
                                              {' '}
                                              {col.reponse}
                                              <CIcon
                                                icon={cilCheck}
                                                style={{
                                                  width: 15,
                                                  height: 15,
                                                  color: 'green',
                                                  marginLeft: '10',
                                                }}
                                              />
                                            </span>
                                          ) : (
                                            <span style={{ color: 'black' }}> {col.reponse}</span>
                                          )}
                                        </span>
                                        <br></br>
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            ))}
                          </span>
                        </td>

                        <td className="align-middle text-center" style={{ width: '200px' }}>
                          <span onClick={() => DeleteQuestion(item.id)}>
                            <i
                              className="fa fa-trash-o"
                              aria-hidden="true"
                              style={{ marginRight: 12, fontSize: 27, color: 'red' }}
                              title="Supprimer"
                            ></i>
                          </span>

                          <span
                            onClick={() => {
                              UpdateQuestion(item.id)
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                              style={{ marginRight: 12, fontSize: 27, color: 'green' }}
                              title="Modifier"
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ 'text-align': ' center' }}>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal
          size="lg"
          show={showMdf}
          onHide={handleCloseMdf}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: '#213f77', fontWeight: 'bold' }}>
            <CIcon
              icon={cilPencil}
              style={{
                marginRight: 15,
              }}
            />
            Modifier question
          </Modal.Header>
          <Modal.Body>
            <Updatequestion idquestion={idquestionUpdate}></Updatequestion>
          </Modal.Body>
        </Modal>
        <Modal
          size="lg"
          show={showAjt}
          onHide={handleCloseAjt}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: '#213f77', fontWeight: 'bold' }}>
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
                          <label className="label">Question Numero {numerodequestion}</label>
                          <div className="control">
                            <Field
                              type="text"
                              name="question"
                              id="question"
                              className={
                                'input' + (errors.question && touched.question ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="question"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Reponses :</label>
                          <div className="field-body">
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
                                'input' + (errors.reponse1 && touched.reponse1 ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="reponse1"
                              component="div"
                              className="invalid-feedback"
                            />
                            <br></br>
                            <CFormCheck
                              type="radio"
                              name="etat"
                              value="res2"
                              onChange={(e) => {
                                setcheck('res2')
                              }}
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
                                'input' + (errors.reponse2 && touched.reponse2 ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="reponse2"
                              component="div"
                              className="invalid-feedback"
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
                            ></CFormCheck>
                            <Field
                              style={{ marginLeft: '25px', width: '300px' }}
                              type="text"
                              name="reponse3"
                              className={
                                'input' + (errors.reponse3 && touched.reponse3 ? ' is-invalid' : '')
                              }
                            />{' '}
                            <ErrorMessage
                              style={{ fontSize: 12, color: 'red' }}
                              name="reponse3"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div style={{ 'margin-top': '5px', float: 'right', align: 'right' }}>
                          <div>
                            <div className="control">
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
        <br></br>
        <div style={{ align: 'right', float: 'right' }}>
          {/*    <button
            className="btnAjQuestion"
            onClick={validerExamen}
            type="submit"
            style={{
              float: 'right',
              align: 'right',
              border: ' 1px solid black',
              height: '48px',
              width: '200px',
              'font-size': '1em',
              'font-style': 'inherit',
              marginLeft: '10px',
              backgroundColor: '#213f77',
              color: 'white',
            }}
          >
            <p
              style={{
                'font-size': '1.2em',
                marginTop: '4px',
              }}
            >
              {' '}
              <i className="fa fa-check" aria-hidden="true" style={{ marginRight: '6px' }}></i>
              Valider L{"'"}examen
            </p>
          </button> */}
          <button
            className="btnAdd"
            onClick={validerExamen}
            type="submit"
            style={{ height: '50px', width: '220px' }}
          >
            <i className="fa fa-check" aria-hidden="true" style={{ marginRight: '9px' }}></i>
            Valider L{"'"}examen
          </button>
        </div>
      </div>
    )
  }
}
Questions.propTypes = {
  examen: propTypes.number,
}
export default Questions
