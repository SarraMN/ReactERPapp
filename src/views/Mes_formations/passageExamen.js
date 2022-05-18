import React, { useEffect, useState } from 'react'
import photo1 from 'src/assets/images/Software-development.jpg'
import photo2 from 'src/assets/images/logopasexamen.png'
import 'src/views/Consulter_formation/formationInfos.css'
import { Accordion, Modal, Button, Nav, ButtonToolbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { CoursByIdFormation } from 'src/services/CoursService'
import {
  GetformationsCandidat,
  sendMail,
  verifierFormationdeCandidat,
} from 'src/services/UserService'
import { fetchUserData, getUserById } from 'src/services/UserService'
import Swal from 'sweetalert2'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAlert,
  CCard,
} from '@coreui/react'
import Resultat from 'src/views/Mes_formations/resultat'

import {
  addDemandeFormation,
  getdemandes_ins_formations,
  gethistorique,
} from 'src/services/demandes_inscriptionService'
import { getfile } from 'src/services/fileService'
import { getExamenAleatoire, getQuestionAndReponsesByExamen } from 'src/services/examenService'
import 'src/views/gestion_examen/gestion_examen.css'
import CIcon from '@coreui/icons-react'
import { cilDataTransferDown, cilAvTimer, cilExternalLink, cilList } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'

function DisplayComponent(s) {
  const h = () => {
    if (s.time.h === 0) {
      return ''
    } else {
      return <span>{s.time.h >= 10 ? s.time.h : '0' + s.time.h}</span>
    }
  }
  if (s.time.m >= s.duree) {
    s.stop()
  }
  return (
    <div
      style={{
        color: 'black',
        border: 'solid black 2px',
        width: '160px',
        height: '70px',
        'border-radius': '5px',
        'text-align': 'center',
        paddingTop: '15px',
        align: 'right',
        float: 'right',
        'border-style': 'inset',
      }}
    >
      {' '}
      <i
        className="fa fa-hourglass-end"
        aria-hidden="true"
        style={{ paddingRight: '10', marginRight: '5px', fontSize: 25 }}
      ></i>
      {h()}&nbsp;&nbsp;
      <span style={{ color: 'black', 'font-weight': 'bold', 'font-size': '1.4em' }}>
        {s.time.m >= 10 ? s.time.m : '0' + s.time.m}
      </span>
      &nbsp;:&nbsp;
      <span style={{ color: 'black', 'font-weight': 'bold', 'font-size': '1.4em' }}>
        {s.time.s >= 10 ? s.time.s : '0' + s.time.s}
      </span>
      &nbsp;:&nbsp;
      <span style={{ color: 'black', 'font-weight': 'bold', 'font-size': '1.4em' }}>
        {s.time.ms >= 10 ? s.time.ms : '0' + s.time.ms}
      </span>
    </div>
  )
}
function App() {
  const dispatch = useDispatch()
  const EtatExamen = useSelector((state) => state.EtatExamen)
  console.log('alooooo', EtatExamen)
  //Reux
  const [Listquestions, setListquestions] = useState([])

  let Location = useLocation()
  const [examen, setexamen] = useState(Location.state.examen)
  const [bool, setbool] = useState(false)
  const [listequestion, setlistequestion] = useState([])
  const [listereponsecorrecte, setlistereponsecorrecte] = useState([])
  const [listereponsecandidat, setlistereponsecandidat] = useState([])
  const [listereponsecheked, setlistereponsecheked] = useState([])
  const [nbrquestionsrestants, setnbrquestionsrestants] = useState(0)
  let [ScoreCandidat, setScoreCandidat] = useState(0)
  let [commencer, setcommencer] = useState(false)
  let [kamalt, setkamalt] = useState(false)
  useEffect(() => {
    getQuestionAndReponsesByExamen(Location.state.examen.id)
      .then((response) => {
        setListquestions(response.data)
        setnbrquestionsrestants(response.data.length)
        response.data.map((item, index) => {
          listequestion.push(item.question)
          listereponsecheked.push(0)
          if (item.reponse1.correcte === true) {
            listereponsecorrecte.push(item.reponse1.id)
            listereponsecandidat.push(0)
          } else if (item.reponse2.correcte === true) {
            listereponsecorrecte.push(item.reponse2.id)
            listereponsecandidat.push(0)
          } else {
            listereponsecorrecte.push(item.reponse3.id)
            listereponsecandidat.push(0)
          }
        })
      })
      .catch((e) => {})
  }, [])
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [interv, setInterv] = useState()
  const [status, setStatus] = useState(0)
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run()
    setStatus(1)
    setInterv(setInterval(run, 10))
  }

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h

  const run = () => {
    if (time.s === 5) {
      console.log('jiyyt ll wa9t')
      stop()
    } else {
      if (updatedM === 60) {
        updatedH++
        updatedM = 0
      }
      if (updatedS === 60) {
        updatedM++
        updatedS = 0
      }
      if (updatedMs === 100) {
        updatedS++
        updatedMs = 0
      }

      updatedMs++
      return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH })
    }
  }
  const stop = () => {
    clearInterval(interv)
    setStatus(2)
    setkamalt(true)
  }
  let date = new Date()

  let date1 = date.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  function verifier(e, p) {
    listereponsecandidat[p] = e.id
    if (listereponsecheked[p] === 0) listereponsecheked[p] = 1
    let nbr = 0
    let nbr2 = 0
    listereponsecheked.map((item, index) => {
      if (item === 1) nbr = nbr + 1
      if (item === 0) nbr2 = nbr2 + 1
    })
    if (nbr2 === 0) {
      document.getElementById('alerte1').style.display = 'none'
      document.getElementById('alerte2').style.display = 'block'
    }
    setnbrquestionsrestants(nbr2)
  }
  function verifier2() {
    if (document.getElementById('scales').checked === true) {
      document.getElementById('buttonvalider').disabled = false
    } else {
      document.getElementById('buttonvalider').disabled = true
    }
  }

  function Funcommencer() {
    setcommencer(true)
    start()
  }
  const reset = () => {
    clearInterval(interv)
    setStatus(0)
    setTime({ ms: 0, s: 0, m: 0, h: 0 })
  }

  const resume = () => start()

  return (
    <div>
      <CCard
        style={{
          background: 'linear-gradient(to bottom right, #78BACF, #59D0F4)',
          'box-shadow': '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
        }}
      >
        <div
          className="main-section"
          style={{
            marginTop: '50px',
            marginRight: '50px',
            marginBottom: '30px',
            marginLeft: '20px',
          }}
        >
          <div className="clock-holder">
            <div className="stopwatch">
              <div>
                <DisplayComponent time={time} stop={stop} duree={examen.duree} />
              </div>
              <div>
                <h2 className="mb-4">Examen: {examen.intitule}</h2>
                {/*                 <BtnComponent status={status} stop={stop} time={time} />
                 */}{' '}
              </div>
            </div>
          </div>
          <div style={{ marginLeft: '20px' }}>
            <i className="fa fa-calendar" aria-hidden="true"></i> Date: {date1}
          </div>
        </div>
      </CCard>
      {EtatExamen === 0 && time.m < examen.duree ? (
        <div>
          {commencer === true ? (
            <div>
              {Listquestions.map((item, index) => (
                <CCard style={{ marginTop: '20px' }} key={index}>
                  <div
                    style={{
                      marginTop: '20px',
                      marginLeft: '20px',
                      marginRight: '20px',
                    }}
                  >
                    <h5>
                      Question N° {index + 1}
                      <span style={{ float: 'right', align: 'right', marginRight: '10px' }}>
                        1 Point
                      </span>
                    </h5>
                    <CCard style={{ marginBottom: '20px' }}>
                      <div style={{ margin: '20px', paddingRight: '30px' }}>
                        <h6>{item.question}</h6>
                        <div>
                          <input
                            type="radio"
                            id="huey"
                            name={index}
                            value="huey"
                            onChange={(e) => {
                              verifier(item.reponse1, index)
                            }}
                          />
                          <label style={{ marginLeft: '2px' }}> {item.reponse1.reponse}</label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="dewey"
                            name={index}
                            value="dewey"
                            onChange={(e) => {
                              verifier(item.reponse2, index)
                            }}
                          />
                          <label style={{ marginLeft: '2px' }}>{item.reponse3.reponse}</label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="louie"
                            name={index}
                            value="louie"
                            onChange={(e) => {
                              verifier(item.reponse3, index)
                            }}
                          />
                          <label style={{ marginLeft: '2px' }}> {item.reponse2.reponse}</label>
                        </div>
                      </div>
                    </CCard>
                  </div>
                </CCard>
              ))}
              <CAlert color="warning" style={{ marginTop: '20px', display: 'block' }} id="alerte1">
                Vous devez encore répondre à {nbrquestionsrestants} questions.
              </CAlert>
              <CAlert color="warning" style={{ marginTop: '20px', display: 'none' }} id="alerte2">
                <div>
                  <input type="checkbox" id="scales" name="scales" onChange={() => verifier2()} />
                  <label> Je suis sûr(e) de vouloir envoyer ces réponses.</label>
                </div>
              </CAlert>
              <div style={{ 'text-align': 'center', marginBottom: '100px' }}>
                <button
                  onClick={() => stop()}
                  id="buttonvalider"
                  style={{
                    'border-radius': '10px',
                    background: 'linear-gradient(to bottom right, #78BACF, #59D0F4)',
                    'font-size': '20px',
                    paddingRight: '20px',
                    paddingLeft: '20px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    border: 'none',
                    'box-shadow': '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                  }}
                >
                  Valider
                </button>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '20px' }}>
              <CCard>
                <div style={{ marginTop: '20px', marginLeft: '20px' }}>
                  <h6>Si vous etes pret(e) cliquer sur le button commener </h6>
                  <div style={{ 'text-align': 'center', marginBottom: '30px' }}>
                    <button
                      onClick={() => Funcommencer()}
                      style={{
                        'border-radius': '10px',
                        background: 'linear-gradient(to bottom right, #78BACF, #59D0F4)',
                        'font-size': '20px',
                        paddingRight: '20px',
                        paddingLeft: '20px',
                        paddingTop: '7px',
                        paddingBottom: '7px',
                        border: 'none',
                        'box-shadow': '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                      }}
                    >
                      Commencer
                    </button>
                  </div>
                </div>
              </CCard>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div>
        {kamalt === false ? (
          <div></div>
        ) : (
          <Resultat
            listereponsecorrecte={listereponsecorrecte}
            listereponsecandidat={listereponsecandidat}
            idFormation={examen.formation.id}
          ></Resultat>
        )}
      </div>
    </div>
  )
}

export default App
