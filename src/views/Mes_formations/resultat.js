import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import { useLocation } from 'react-router-dom'
import { fetchUserData, GetformationsCandidat, getUserById } from 'src/services/UserService'
import { getfile } from 'src/services/fileService'
import avatar8 from './../../assets/images/profile_homme.png'
import {
  CAvatar,
  CCard,
  CCol,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import {
  deletecommentaire,
  getAllcommentaire,
  updatecommentaire,
} from 'src/services/commentaireService'
import { useSelector, useDispatch } from 'react-redux'

import { propTypes } from 'react-bootstrap/esm/Image'
import { getCoursById } from 'src/services/CoursService'
import Swal from 'sweetalert2'
import { Accordion, Modal, Button, Nav } from 'react-bootstrap'
import { addResultat } from 'src/services/ResultatService'

const Resultat = (props) => {
  const [ResultatFinale, setResultatFinale] = useState(false)
  let ScoreCandidat = 0
  const dispatch = useDispatch()
  const [listereponsecorrecte, setlistereponsecorrecte] = useState(props.listereponsecorrecte)
  const [listereponsecandidat, setlistereponsecandidat] = useState(props.listereponsecandidat)
  const [idFormation, setidFormation] = useState(props.idFormation)
  const [score, setScore] = useState('')
  const [values, setValues] = useState({
    score: '',
    admis: '',
    formation: {
      id: '',
    },
    date: '',
    idcandidat: 0,
  })

  useEffect(() => {
    dispatch({ type: 'set', EtatExamen: 1 })

    listereponsecorrecte.map((item, index) => {
      if (item === listereponsecandidat[index]) ScoreCandidat = ScoreCandidat + 1
    })
    ScoreCandidat = (ScoreCandidat * 100) / listereponsecorrecte.length
    dispatch({ type: 'set', EtatExamen: 1 })

    if (ScoreCandidat > 70.0 || ScoreCandidat > 70) {
      setResultatFinale(true)
      values.admis = true
    } else {
      setResultatFinale(false)
      values.admis = false
    }

    values.formation.id = idFormation
    values.score = ScoreCandidat
    fetchUserData().then((response) => {
      getUserById(response.data.id).then((response) => {
        values.idcandidat = response.data.id
        console.log('ach janii', values)
        addResultat(values).then((response) => {
          if (response.status === 200) {
            console.log('avec succée')
          }
        })
      })
    })

    setScore(ScoreCandidat)
  }, [])

  return (
    <div>
      {' '}
      {console.log('ena jiyt console', ResultatFinale, 'hedha', score)}
      {ResultatFinale === true ? (
        <CCard style={{ marginTop: '20px' }}>
          <div
            style={{
              marginTop: '50px',
              marginRight: '50px',
              marginBottom: '30px',
              marginLeft: '20px',
            }}
          >
            <i className="fa fa-check-circle" aria-hidden="true" style={{ marginRight: '5px' }}></i>
            Bravo ! Vous avez réussi cet exercice !
          </div>
        </CCard>
      ) : (
        <div>
          <CCard style={{ marginTop: '20px' }}>
            <div
              style={{
                marginTop: '50px',
                marginRight: '50px',
                marginBottom: '30px',
                marginLeft: '20px',
              }}
            >
              <i className="fa fa-times" aria-hidden="true" style={{ marginRight: '5px' }}></i>
              Vous n{"'"}avez pas validé cet examen.
              <p style={{ marginTop: '15px' }}>
                Vous n{"'"}avez pas atteint le seuil de validation de cet exercice, c{"'"}
                est-à-dire 70%. Ce n{"'"}est pas très grave car vous pourrez repasser l{"'"}examen
                dans une 24 heures.
              </p>
            </div>
          </CCard>
        </div>
      )}
    </div>
  )
}
Resultat.propTypes = {
  listereponsecorrecte: propTypes.Tab,
  listereponsecandidat: propTypes.Tab,
  idFormation: propTypes.number,
}
export default Resultat
