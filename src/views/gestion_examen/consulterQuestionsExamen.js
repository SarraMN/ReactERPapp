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
function ConsulterQuestionsExamen(props) {
  const [Listquestions, setListquestions] = useState([])
  const [Listereponses, setreponses] = useState([])
  const [Listereponses2, setreponses2] = useState([])
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
  }, [Listquestions, Listereponses])
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Numero</th>
            <th scope="col">Question</th>
            <th scope="col">Date de creationReponses</th>
          </tr>
        </thead>
        <tbody>
          {Listquestions.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td> {item.question}</td>
              <td>
                {Listereponses2.map((row, i) => (
                  <div key={i} style={{ color: 'black', 'text-align': 'left' }}>
                    {index === i ? (
                      <div>
                        {' '}
                        {row.map((col, j) => (
                          <span key={j}>
                            <span>
                              <span style={{ 'text-align': 'left' }}> Reponse N° {j + 1} :</span>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
ConsulterQuestionsExamen.propTypes = {
  examen: propTypes.number,
}
export default ConsulterQuestionsExamen
