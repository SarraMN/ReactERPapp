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
import { getListeRhs, getusers, deleteuser } from 'src/services/gestionutilisateurs'
import ReactImg1 from 'src/images/work-9.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/work-8.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
import 'src/views/GestionCompte/gestioncompte.css'
import 'src/views/gestion_examen/gestion_examen.css'
import { uploadfile, getfile } from 'src/services/fileService'
import {
  addQuestion,
  deletequestion,
  getQuestions,
  getReponseByQuestion,
  updatequestion,
} from 'src/services/questionService'
import { addreponse, updatereponse } from 'src/services/reponseService'
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

import CIcon from '@coreui/icons-react'
import { cilCheck, cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import { propTypes } from 'react-bootstrap/esm/Image'
import { useDispatch, useSelector } from 'react-redux'
function Updatequestion(props) {
  const [idQuestion, setidQuestion] = useState(props.idquestion)
  const [Listereponses, setListereponses] = useState([])
  const [Question, setQuestion] = useState([])
  const [reponse1, setreponse1] = useState({})
  const [reponse2, setreponse2] = useState({})
  const [reponse3, setreponse3] = useState({})
  const [check, setcheck] = useState('res1')

  useEffect(() => {
    getQuestions(props.idquestion)
      .then((response) => {
        question1.examen.id = response.data.examen.id
        question1.id = response.data.id
        setQuestion(response.data.question)
      })
      .catch((e) => {})
  }, [])
  useEffect(() => {
    getReponseByQuestion(props.idquestion)
      .then((response) => {
        response.data.map((item, index) => {
          Listereponses.push(item)
        })
        setreponse1(Listereponses[0])
        setreponse2(Listereponses[1])
        setreponse3(Listereponses[2])
        if (Listereponses[0].correcte === true) {
          setcheck('res1')
          setreponse1(Listereponses[0])
          setreponse2(Listereponses[1])
          setreponse3(Listereponses[2])
        }
        if (Listereponses[1].correcte === true) {
          setcheck('res2')
          setreponse1(Listereponses[1])
          setreponse2(Listereponses[0])
          setreponse3(Listereponses[2])
        }
        if (Listereponses[2].correcte === true) {
          setcheck('res3')
          setreponse1(Listereponses[2])
          setreponse2(Listereponses[1])
          setreponse3(Listereponses[0])
        }
      })
      .catch((e) => {})
  }, [])
  function Notification_pasdechangement() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'y a pas des changement',
    })
  }
  function Notification_updateorganisme() {
    Swal.fire('vos modifications ont été enregistrées ', '', 'success')
  }
  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }

  const [question1, setQuestion1] = useState({
    question: '',
    examen: { id: '' },
    id: '',
  })
  const [reponse4, setreponse4] = useState({
    reponse: '',
    question: { id: '' },
    correcte: false,
    id: '',
  })
  const [reponse5, setreponse5] = useState({
    reponse: '',
    question: { id: '' },
    correcte: false,
    id: '',
  })
  const [reponse6, setreponse6] = useState({
    reponse: '',
    question: { id: '' },
    correcte: false,
    id: '',
  })
  function modifierQuestion(e) {
    if (
      Question === e.question &&
      e.reponse1 === reponse1.reponse &&
      e.reponse2 === reponse2.reponse &&
      e.reponse3 === reponse3.reponse &&
      check === 'res1'
    ) {
      Notification_pasdechangement()
    } else {
      reponse4.question.id = question1.id
      reponse5.question.id = question1.id
      reponse6.question.id = question1.id
      if (Question !== e.question) {
        question1.question = e.question
        updatequestion(question1).then((response) => {
          if (response.status === 200) {
            Notification_updateorganisme()
          } else {
            Notification_probleme()
          }
        })
      } else {
        reponse4.id = reponse1.id
        reponse5.id = reponse2.id
        reponse6.id = reponse3.id
        if (check === 'res1') {
          reponse4.correcte = true
          reponse5.correcte = false
          reponse6.correcte = false
        }

        if (check === 'res2') {
          reponse5.correcte = true
          reponse4.correcte = false
          reponse6.correcte = false
        }
        if (check === 'res3') {
          reponse6.correcte = true
          reponse4.correcte = false
          reponse5.correcte = false
        }
        reponse4.reponse = e.reponse1
        reponse5.reponse = e.reponse2
        reponse6.reponse = e.reponse3

        updatereponse(reponse4).then((response) => {
          if (response.status === 200) {
          } else {
          }
        })
        updatereponse(reponse5).then((response) => {
          if (response.status === 200) {
          } else {
          }
        })
        updatereponse(reponse6).then((response) => {
          if (response.status === 200) {
          } else {
          }
        })
        Notification_updateorganisme()
      }
    }
  }

  const [initialValues, setinitialValues] = useState({
    question: '',
    reponse1: '',
    reponse2: '',
    reponse3: '',
  })
  initialValues.question = Question
  initialValues.reponse1 = reponse1.reponse
  initialValues.reponse2 = reponse2.reponse
  initialValues.reponse3 = reponse3.reponse
  return (
    <section className="moncompte">
      <div className="card">
        <div className="card-content">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              question: Yup.string().required('Le question est requis'),
              reponse3: Yup.string().required('La reponse est requis'),
              reponse1: Yup.string().required('La reponse est requis'),
              reponse2: Yup.string().required('La reponse est requis'),
            })}
            onSubmit={(values) => modifierQuestion(values)}
            render={({ errors, status, touched }) => (
              <Form>
                <div className="field">
                  <label className="label">Question :</label>
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
                      id="exampleRadios2"
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
  )
}
Updatequestion.propTypes = {
  idquestion: propTypes.number,
}
export default Updatequestion
