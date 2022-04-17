import React, { useEffect, useState } from 'react'
import photo1 from 'src/assets/images/Software-development.jpg'
import 'src/views/Consulter_formation/formationInfos.css'
import { Accordion, Modal, Button, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { CoursByIdFormation } from 'src/services/CoursService'
import { sendMail, verifierFormationdeCandidat } from 'src/services/UserService'
import { fetchUserData, getUserById } from 'src/services/UserService'
import Swal from 'sweetalert2'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react'
import { addDemandeFormation } from 'src/services/demandes_inscriptionService'
import { getfile } from 'src/services/fileService'
const FormationInfo = () => {
  const [typeCandidat, setTypeCandidat] = useState('')
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        getUserById(response.data.id).then((response) => {
          console.log('respose', response.data)
          if (response.data.organisme_conventionne === null) {
            setTypeCandidat('candidatSimple')
          } else {
            setTypeCandidat('PersonnelORG')
          }
        })
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
  const [candidatinscrit, setCandidatinscrit] = useState(false)

  useEffect(() => {
    fetchUserData()
      .then((response) => {
        console.log('louliii', location.state)
        verifierFormationdeCandidat(response.data.id, location.state).then((response) => {
          console.log('helllllll', response)
          if (response.data === true) setCandidatinscrit(true)
          else setCandidatinscrit(false)
        })
      })
      .catch((e) => {})
  }, [])
  console.log('locatioooon', location.state)
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
  }, [])
  useEffect(() => {
    getfile(location.state.image.id)
      .then((response) => {
        values.image = URL.createObjectURL(response.data)
      })
      .catch((e) => {})
  }, [])
  const [show, setShow] = useState(false)
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
    type: 'formation',
    etat: 'non traitée',
    dateCreation: '2021-02-10',
    candidat: { id: '', authority: {}, email: '' },
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
          values5.candidat.id = response2.data.id
          values5.candidat.authority = response2.data.authority
          values5.candidat.email = response2.data.email

          values2.destinataire = response2.data.email
        })
      })
      .catch((e) => {})

    values2.body = 'ok merci'
    values2.topic = 'Demande de inscription'
    sendMail(values2).then((response) => {
      if (response.status === 200) {
        console.log('values5', values5)
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
    <div className="formation">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="formation_container">
              <div className="formation_title"> {values.titre}</div>
              {/*formation Image -->"*/}
              <div className="formation_image">
                <img src={values.image} alt="" style={{ width: 800, height: 500 }} />
              </div>

              {/*!-- formation Tabs -->*/}
              {/*       <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                  <LinkContainer to="/CoursTabs">
                    <Nav.Link>Active</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
              </Nav> */}
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="tab_panels">
                    {/*<!-- Description -->*/}
                    <div className="tab_panel active">
                      <div className="tab_panel_title">{values.titre}</div>
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
            </div>
          </div>

          {/*<!-- formation sidebarFormation -->*/}
          <div className="col-lg-4">
            <div className="sidebarFormation">
              {/*<!-- Feature -->*/}
              <div className="sidebarFormation_section">
                <div className="sidebarFormation_section_title">Détails formation</div>
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
                        <span>Cours:</span>
                      </div>
                      <div className="feature_text ml-auto">{values.nbrCours}</div>
                    </div>

                    <div className="feature d-flex flex-row align-items-center justify-content-start">
                      <div className="feature_title">
                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                        <span style={{ marginRight: 50 }}>Catégorie:</span>
                      </div>
                      <div className="feature_text ml-auto">{values.categorie}</div>
                    </div>

                    <div className="feature d-flex flex-row align-items-center justify-content-start">
                      <div className="feature_title">
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <span>Candidats inscrits:</span>
                      </div>
                      <div className="feature_text ml-auto">35</div>
                    </div>
                  </div>
                </div>
              </div>
              {candidatinscrit === false ? (
                <button type="submit" className="home_search_button" onClick={handleShow}>
                  S{"'"}inscrire au cours
                </button>
              ) : (
                <button type="submit" className="home_search_button">
                  Deja inscrit
                </button>
              )}

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
                  si vous êtes sur de s{"'"}inscrire cliquer sur envoyer et un agent va bientôt vous
                  contacter pour fixer un rendez-vous pour venir chez nous et payer le montant
                  demandé.
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
          {cours != null && (
            <div
              className="tab_panel_title"
              style={{ marginBottom: 20, marginTop: 15, marginLeft: 28 }}
            >
              Cours
            </div>
          )}
          {cours.length != 0 && (
            <CAccordion activeItemKey={2} style={{ width: 700 }}>
              {cours.map((item, index) => (
                <CAccordionItem Key={index} itemKey={index}>
                  <CAccordionHeader>
                    {item.titre} #{index}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <strong>Description</strong>
                    <p>{item.description}</p>
                    <strong>Objectif</strong>
                    <p>{item.objectif}</p>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          )}
        </div>
      </div>
    </div>
  )
}
export default FormationInfo
