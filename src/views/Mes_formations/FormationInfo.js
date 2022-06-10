import React, { useEffect, useState } from 'react'
import photo1 from 'src/assets/images/Software-development.jpg'
import photo2 from 'src/assets/images/logopasexamen.png'
import photo5 from 'src/images/bg_2.jpg'
import photo3 from 'src/assets/images/logoF2.png'
import 'src/views/Mes_formations/formationInformations.css'
import 'src/App.css'
import { Accordion, Modal, Button, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { CoursByIdFormation } from 'src/services/CoursService'
import Temoignage from './temoignage'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'
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
  CCard,
  CCol,
} from '@coreui/react'
import {
  addDemandeFormation,
  getdemandes_ins_formations,
  gethistorique,
} from 'src/services/demandes_inscriptionService'
import { getfile } from 'src/services/fileService'
import { getExamenAleatoire } from 'src/services/examenService'
import { getByCandidatFormation, nbrHeuresApresExamen } from 'src/services/ResultatService'
import { nombre_candidatsParFormation } from 'src/services/FormationService'
const FormationInfo = () => {
  const [examen, setExamen] = useState({})
  const [resultatExamen, setresultatExamen] = useState(0)
  const [resultat, setresultat] = useState({})

  const [typeCandidat, setTypeCandidat] = useState('candidatSimple')
  const [bool, setbool] = useState(false)
  function pasExamens() {
    Swal.fire({
      title: 'Probleme!',
      text: 'Pas des examens disponibles pour le moment , vous pouvez réessayer ultérieurement',
      imageUrl: photo2,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  function NeDeppasePas24H() {
    Swal.fire({
      title: "Vous n'avez pas validé cet examen",
      text: "Vous pourrez repasser l'examen dans une 24 heures",
      imageUrl: photo3,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        getUserById(response.data.id).then((response) => {
          getByCandidatFormation(response.data.id, location.state)
            .then((response) => {
              if (response.data === '') {
                setresultatExamen(0)
              } else {
                setresultat(response.data)
                if (response.data.admis === true) {
                  setresultatExamen(1)
                } else {
                  nbrHeuresApresExamen(response.data.id).then((response) => {
                    console.log('achhh janiii khra', response.data)
                    if (response.data > 24) {
                      setresultatExamen(2)
                    } else {
                      setresultatExamen(3)
                    }
                  })
                }
              }
            })
            .catch((e) => {})
          if (response.data.organisme_conventionne === null) {
            setTypeCandidat('candidatSimple')
          } else {
            setTypeCandidat('PersonnelORG')
          }
        })
      })
      .catch((e) => {})
    getExamenAleatoire(location.state.id)
      .then((response) => {
        if (response.data === '') setExamen(null)
        else setExamen(response.data)
      })
      .catch((e) => {})
  }, [])

  const location = useLocation()
  const [values, setValues] = useState({
    titre: '',
    categorie: '',
    description: '',
    prix: '',
    nbrCours: '',
    id: '',
    prix_organismes_conventiones: '',
    image: '',
  })
  const [candidatinscrit, setCandidatinscrit] = useState('inscription')
  const [nbrcandidats, setnbrcandidats] = useState('')

  values.titre = location.state.titre
  values.id = location.state.id
  values.categorie = location.state.categorie
  values.prix = location.state.prix
  values.prix_organismes_conventiones = location.state.prix_organismes_conventiones
  values.nbrCours = location.state.nbrCours
  values.description = location.state.description
  useEffect(() => {
    CoursByIdFormation(location.state.id)
      .then((response) => {
        setCours(response.data.reverse())
        console.log('cours', response.data)
      })
      .catch((e) => {})
    getfile(location.state.image.id)
      .then((response) => {
        values.image = URL.createObjectURL(response.data)
      })
      .catch((e) => {})
    nombre_candidatsParFormation(location.state.id)
      .then((response3) => {
        setnbrcandidats(response3.data)
      })
      .catch((e) => {})
    fetchUserData()
      .then((response) => {
        setIdCandidat(response.data.id)
        setnomcandidat(response.data.nom)
        setnomcandidat(nomcandidat + ' ' + response.data.prenom)
        GetformationsCandidat(response.data.id).then((response) => {
          let test1 = false
          let test2 = false
          response.data.map((item, index) => {
            console.log('jawab', item)
            if (item.id === location.state.id) {
              test1 = true
              setCandidatinscrit('dejaInscrit')
            }
          })
          if (test1 === false) {
            getdemandes_ins_formations().then((response2) => {
              response2.data.map((item, index) => {
                console.log('jawab', item)
                if (item.candidat.id === IdCandidat && item.formation.id === location.state.id) {
                  setCandidatinscrit('demandeEnvoyée')
                  test2 = true
                }
              })
            })
            if (test2 === false) {
              setbool(true)
              gethistorique().then((response2) => {
                response2.data.map((item, index) => {
                  if (item.candidat.id === IdCandidat && item.formation.id === location.state.id) {
                    if (item.etat === 'refusée') {
                      setCandidatinscrit('demandeRefusée')
                    }
                  }
                })
              })
            }
          }
        })
      })
      .catch((e) => {})
  }, [bool])

  const [show, setShow] = useState(false)
  const [IdCandidat, setIdCandidat] = useState(0)
  const [nomcandidat, setnomcandidat] = useState('')
  const [cours, setCours] = useState([])
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }
  const [values2] = useState({
    destinataire: '',
    body: '',
    topic: '',
  })
  const [values5] = useState({
    id: '',
    idcandidat: '',
    type: 'formation',
    etat: 'non traitée',
    dateCreation: '',
    formation: { id: '', titre: '' },
  })

  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }
  function Notification_succes() {
    Swal.fire('Votre demande a été envoyée avec succès', ' ', 'success')
  }
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }
  const envoyermail = () => {
    setShow(false)
    values5.formation.id = values.id
    values5.formation.titre = values.titre

    fetchUserData()
      .then((response) => {
        console.log('res', response.data)
        getUserById(response.data.id).then((response2) => {
          console.log('user', response2.data)
          values5.idcandidat = response2.data.id
          values2.destinataire = response2.data.email
        })
      })
      .catch((e) => {})

    values2.body = 'ok merci'
    values2.topic = 'Demande de inscription'

    sendMail(values2).then((response) => {
      if (response.status === 200) {
        console.log('values5', values5)
        values5.idcandidat = IdCandidat
        addDemandeFormation(values5).then((response3) => {
          if (response3.status === 200) {
            console.log('avec succée')
            Notification_succes()
          } else if (response3.status === 500) {
            Notification_failure()
          }
        })
      } else {
        Notification_probleme()
      }
    })
  }

  return (
    <div className="formationInformation">
      <CCard>
        <div className="formation">
          <div className="container">
            <div
              className="row"
              style={{
                marginTop: '20px',
                marginRight: '5px',
                marginLeft: '5px',
                marginBottom: '20px',
              }}
            >
              <div>
                <CCard style={{ backgroundColor: '#213f77' }}>
                  <div>
                    <div
                      style={{
                        marginTop: '30px',
                        marginRight: '30px',
                        backgoundColor: 'red',
                      }}
                    >
                      {resultatExamen === 0 ? (
                        <div>
                          {examen === null ? (
                            <button
                              type="submit"
                              className="home_search_button2"
                              onClick={() => pasExamens()}
                              style={{
                                height: '50px',
                                width: '180px',
                                align: 'right',
                                float: 'right',
                              }}
                            >
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                                style={{ paddingRight: '10', marginRight: '5px' }}
                              ></i>
                              Passer Examen
                            </button>
                          ) : (
                            <Link
                              to="/Mes_formations/Mes_formations/FormationInfo/ExamenInfo"
                              state={location.state.id}
                            >
                              <button
                                type="submit"
                                className="home_search_button2"
                                onClick={handleShow}
                                style={{
                                  height: '50px',
                                  width: '180px',
                                  align: 'right',
                                  float: 'right',
                                }}
                              >
                                <i
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                  style={{ paddingRight: '10', marginRight: '5px' }}
                                ></i>
                                Passer Examen
                              </button>{' '}
                            </Link>
                          )}
                        </div>
                      ) : (
                        <div>
                          {resultatExamen === 1 ? (
                            <div>
                              <Link
                                to="/Mes_formations/Mes_formations/FormationInfo/certificat"
                                state={location.state}
                              >
                                <button
                                  type="submit"
                                  className="home_search_button3"
                                  style={{
                                    'font-size': '1em',
                                    height: '50px',
                                    width: '180px',
                                    align: 'right',
                                    float: 'right',
                                  }}
                                >
                                  <i
                                    className="fa fa-certificate"
                                    aria-hidden="true"
                                    style={{ paddingRight: '10', marginRight: '5px' }}
                                  ></i>
                                  Ma Certificat
                                </button>{' '}
                              </Link>
                            </div>
                          ) : (
                            <div>
                              {resultatExamen === 2 ? (
                                <div>
                                  {examen === null ? (
                                    <button
                                      type="submit"
                                      className="home_search_button2"
                                      onClick={() => pasExamens()}
                                      style={{
                                        height: '50px',
                                        width: '180px',
                                        align: 'right',
                                        float: 'right',
                                      }}
                                    >
                                      <i
                                        className="fa fa-pencil-square-o"
                                        aria-hidden="true"
                                        style={{ paddingRight: '10', marginRight: '5px' }}
                                      ></i>
                                      Passer Examen
                                    </button>
                                  ) : (
                                    <Link
                                      to="/Mes_formations/Mes_formations/FormationInfo/ExamenInfo"
                                      state={location.state.id}
                                    >
                                      <button
                                        type="submit"
                                        className="home_search_button2"
                                        onClick={handleShow}
                                        style={{
                                          height: '50px',
                                          width: '180px',
                                          align: 'right',
                                          float: 'right',
                                        }}
                                      >
                                        <i
                                          className="fa fa-pencil-square-o"
                                          aria-hidden="true"
                                          style={{ paddingRight: '10', marginRight: '5px' }}
                                        ></i>
                                        Passer Examen
                                      </button>{' '}
                                    </Link>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  {' '}
                                  <button
                                    type="submit"
                                    className="home_search_button2"
                                    onClick={() => NeDeppasePas24H()}
                                    style={{
                                      height: '50px',
                                      width: '180px',
                                      align: 'right',
                                      float: 'right',
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                      style={{ paddingRight: '10', marginRight: '5px' }}
                                    ></i>
                                    Passer Examen
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <Link
                        to="/Mes_formations/Mes_formations/FormationInfo/voirCours"
                        state={location.state.id}
                      >
                        <button
                          type="submit"
                          className="home_search_button"
                          onClick={handleShow}
                          style={{
                            height: '50px',
                            width: '180px',
                            align: 'right',
                            float: 'right',
                          }}
                        >
                          <i
                            className="fa fa-server"
                            aria-hidden="true"
                            style={{ paddingRight: '10', marginRight: '5px' }}
                          ></i>
                          Voir Cours
                        </button>{' '}
                      </Link>
                    </div>
                    <div className="formation_title" style={{ marginLeft: '30px', color: 'white' }}>
                      {' '}
                      Formation :{values.titre}
                      <p style={{ marginLeft: '30px', 'font-size': '20px', color: '#C5CACD' }}>
                        {' '}
                        Categorie :{values.categorie}
                      </p>
                    </div>
                  </div>
                </CCard>
                {/*     <CCard style={{ backgoundColor: 'red' }}>
                <div
                  style={{
                    marginTop: '30px',
                    marginRight: '30px',
                    backgoundColor: 'red',
                  }}
                >
                  {resultatExamen === 0 ? (
                    <div>
                      {examen === null ? (
                        <button
                          type="submit"
                          className="home_search_button2"
                          onClick={() => pasExamens()}
                          style={{
                            'font-size': '1em',
                            height: '50px',
                            width: '180px',
                            align: 'right',
                            float: 'right',
                          }}
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                            style={{ paddingRight: '10', marginRight: '5px' }}
                          ></i>
                          Passer Examen
                        </button>
                      ) : (
                        <Link
                          to="/Mes_formations/Mes_formations/FormationInfo/ExamenInfo"
                          state={location.state.id}
                        >
                          <button
                            type="submit"
                            className="home_search_button2"
                            onClick={handleShow}
                            style={{
                              'font-size': '1em',
                              height: '50px',
                              width: '180px',
                              align: 'right',
                              float: 'right',
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                              style={{ paddingRight: '10', marginRight: '5px' }}
                            ></i>
                            Passer Examen
                          </button>{' '}
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div>
                      {resultatExamen === 1 ? (
                        <div>
                          <Link
                            to="/Mes_formations/Mes_formations/FormationInfo/certificat"
                            state={location.state}
                          >
                            <button
                              type="submit"
                              className="home_search_button3"
                              style={{
                                'font-size': '1em',
                                height: '50px',
                                width: '180px',
                                align: 'right',
                                float: 'right',
                              }}
                            >
                              <i
                                className="fa fa-certificate"
                                aria-hidden="true"
                                style={{ paddingRight: '10', marginRight: '5px' }}
                              ></i>
                              Ma Certificat
                            </button>{' '}
                          </Link>
                        </div>
                      ) : (
                        <div>
                          {resultatExamen === 2 ? (
                            <div>
                              {examen === null ? (
                                <button
                                  type="submit"
                                  className="home_search_button2"
                                  onClick={() => pasExamens()}
                                  style={{
                                    'font-size': '1em',
                                    height: '50px',
                                    width: '180px',
                                    align: 'right',
                                    float: 'right',
                                  }}
                                >
                                  <i
                                    className="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                    style={{ paddingRight: '10', marginRight: '5px' }}
                                  ></i>
                                  Passer Examen
                                </button>
                              ) : (
                                <Link
                                  to="/Mes_formations/Mes_formations/FormationInfo/ExamenInfo"
                                  state={location.state.id}
                                >
                                  <button
                                    type="submit"
                                    className="home_search_button2"
                                    onClick={handleShow}
                                    style={{
                                      'font-size': '1em',
                                      height: '50px',
                                      width: '180px',
                                      align: 'right',
                                      float: 'right',
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                      style={{ paddingRight: '10', marginRight: '5px' }}
                                    ></i>
                                    Passer Examen
                                  </button>{' '}
                                </Link>
                              )}
                            </div>
                          ) : (
                            <div>
                              {' '}
                              <button
                                type="submit"
                                className="home_search_button2"
                                onClick={() => NeDeppasePas24H()}
                                style={{
                                  'font-size': '1em',
                                  height: '50px',
                                  width: '180px',
                                  align: 'right',
                                  float: 'right',
                                }}
                              >
                                <i
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                  style={{ paddingRight: '10', marginRight: '5px' }}
                                ></i>
                                Passer Examen
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <Link
                    to="/Mes_formations/Mes_formations/FormationInfo/voirCours"
                    state={location.state.id}
                  >
                    <button
                      type="submit"
                      className="home_search_button"
                      onClick={handleShow}
                      style={{
                        'font-size': '1em',
                        height: '50px',
                        width: '180px',
                        align: 'right',
                        float: 'right',
                      }}
                    >
                      <i
                        className="fa fa-folder-o"
                        aria-hidden="true"
                        style={{ paddingRight: '10', marginRight: '5px' }}
                      ></i>
                      Voir Cours
                    </button>{' '}
                  </Link>
                </div>
                <div className="formation_title" style={{ marginLeft: '30px', color: 'red' }}>
                  {' '}
                  Formation :{values.titre}
                  <p style={{ marginLeft: '30px', 'font-size': '20px' }}>
                    {' '}
                    Categorie :{values.categorie}
                  </p>
                </div>
              </CCard> */}
              </div>
              <div className="col-lg-6">
                <div className="formation_container">
                  <div className="formation_image">
                    <img src={values.image} alt="" style={{ width: 400, height: 250 }} />
                  </div>
                </div>
              </div>
              <div className="col-lg-6" style={{}}>
                <div className="sidebarFormation2">
                  <div className="sidebarFormation_section">
                    <div className="sidebarFormation_section_title" style={{ 'font-size': '2em' }}>
                      Détails formation
                    </div>
                    <div className="sidebarFormation_feature">
                      <div className="formation_price">
                        {typeCandidat === 'candidatSimple' ? (
                          <p>{values.prix} Dt</p>
                        ) : (
                          <p> {values.prix_organismes_conventiones} Dt</p>
                        )}{' '}
                      </div>

                      <div className="feature_list">
                        <div className="feature d-flex flex-row align-items-center justify-content-start">
                          <div className="feature_title">
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                            <span>Nombre des cours: {values.nbrCours}</span>
                          </div>
                        </div>

                        <div className="feature d-flex flex-row align-items-center justify-content-start">
                          <div className="feature_title">
                            <i className="fa fa-list-alt" aria-hidden="true"></i>
                            <span style={{ marginRight: 50 }}>Catégorie: {values.categorie}</span>
                          </div>
                        </div>

                        <div className="feature d-flex flex-row align-items-center justify-content-start">
                          <div className="feature_title">
                            <i className="fa fa-users" aria-hidden="true"></i>
                            <span>Candidats inscrits: {nbrcandidats}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  {candidatinscrit === 'inscription' ? (
                <button
                  type="submit"
                  className="home_search_button"
                  onClick={handleShow}
                  style={{ 'font-size': '1em', height: '50px', width: '220px' }}
                >
                  {' '}
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    style={{ paddingRight: '10', marginRight: '5px' }}
                  ></i>
                  S{"'"}inscrire au cours
                </button>
              ) : (
                <span>
                  {candidatinscrit === 'dejaInscrit' ? (
                    <button
                      type="submit"
                      className="home_search_button"
                      style={{ 'font-size': '1em', height: '50px', backgroundColor: 'green' }}
                    >
                      <i
                        className="fa fa-check"
                        aria-hidden="true"
                        style={{ paddingRight: '10', marginRight: '5px' }}
                      ></i>
                      Deja inscrit
                    </button>
                  ) : (
                    <span>
                      {candidatinscrit === 'demandeEnvoyée' ? (
                        <button
                          type="submit"
                          className="home_search_button"
                          style={{ 'font-size': '1em', height: '50px', backgroundColor: 'green' }}
                        >
                          <i
                            className="fa fa-check"
                            aria-hidden="true"
                            style={{ paddingRight: '10', marginRight: '5px' }}
                          ></i>
                          demande Envoyée
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="home_search_button"
                          style={{
                            'font-size': '1em',
                            height: '50px',
                            backgroundColor: '#AD0303',
                            width: '220px',
                          }}
                        >
                          <i
                            className="fa fa-times"
                            aria-hidden="true"
                            style={{ paddingRight: '10', marginRight: '5px' }}
                          ></i>
                          demande Refusée
                        </button>
                      )}
                    </span>
                  )}
                </span>
              )} */}

                  <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Demande d{"'"}inscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Cette formation coûte{' '}
                      {typeCandidat === 'candidatSimple' ? (
                        <span> {values.prix} Dt</span>
                      ) : (
                        <span> {values.prix_organismes_conventiones} Dt</span>
                      )}{' '}
                      si vous êtes sur de s{"'"}inscrire cliquer sur envoyer et un agent va bientôt
                      vous contacter pour fixer un rendez-vous pour venir chez nous et payer le
                      montant demandé.
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Fermer
                      </Button>
                      <Button style={{ height: 39 }} variant="primary" onClick={envoyermail}>
                        Envoyer
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCard>
      <CCard style={{ marginTop: '10px' }}>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="tab_panels">
              <div className="tab_panel active">
                <div className="tab_panel_title">Description</div>
                <div>
                  <div className="tab_panel_text">
                    <p>{values.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          ></div>
        </div>
      </CCard>
      <CCard style={{ marginTop: '10px', paddingBottom: '10px' }}>
        <CCol>
          {cours != null && (
            <div
              className="tab_panel_title"
              style={{ marginBottom: 20, marginTop: 15, marginLeft: 28 }}
            >
              Contenu du cours
            </div>
          )}
          {cours.length !== 0 && (
            <CAccordion activeItemKey={2}>
              {cours.map((item, index) => (
                <CAccordionItem Key={index} itemKey={index}>
                  <CAccordionHeader>
                    Cours N° {index + 1} : {item.titre}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <strong>Description</strong>
                    <p style={{ 'word-wrap': 'break-word' }}>{item.description}</p>
                    <strong>Objectif</strong>
                    <p style={{ 'word-wrap': 'break-word' }}>{item.objectif}</p>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          )}
        </CCol>
      </CCard>
      <div style={{ marginTop: '10px' }}>
        <Temoignage formation={location.state.id}></Temoignage>
      </div>
    </div>
  )
}
export default FormationInfo
