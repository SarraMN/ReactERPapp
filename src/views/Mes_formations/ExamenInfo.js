import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import 'src/views/Mes_formations/examen.css'
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
import { propTypes } from 'react-bootstrap/esm/Image'
import { getCoursById } from 'src/services/CoursService'
import Swal from 'sweetalert2'
import { Accordion, Modal, Button, Nav } from 'react-bootstrap'
import examenlogo from './../../assets/images/examen.png'
import examenlogo1 from './../../assets/images/certificat.png'
import examenlogo2 from './../../assets/images/question.png'
import examenlogo3 from './../../assets/images/score.png'
import examenlogo4 from './../../assets/images/duree.png'

const ExamenInfo = () => {
  return (
    <div>
      <CCard>
        <section className="ftco-section services-section" style={{ marginRight: '10px' }}>
          <div className="container">
            <div className="row d-flex">
              <div className="col-md-6 heading-section pr-md-5  d-flex align-items-center">
                <div className="w-100 mb-4 mb-md-0">
                  <span className="subheading">Bienvenue </span>
                  <h2 className="mb-4">Examen:</h2>
                  <p>Le test c{"'"}est juste un bon moyen pour evaluer vos connaissances</p>
                  <p>
                    Vous obtiendrez 1 point pour chaque bonne réponse. À la fin du Quiz, votre score
                    total sera affiché. Le score maximum est de 25 points.
                  </p>
                  <div className="d-flex  align-items-center mt-md-4" style={{}}>
                    <img
                      src={examenlogo}
                      size="md"
                      style={{
                        width: '80px',
                        height: '80px',
                        float: 'right',
                        align: 'right',
                      }}
                    />
                    <span></span>

                    <Button
                      variant="primary"
                      size="lg"
                      style={{ width: '100%', float: 'right', align: 'right', marginLeft: '20px' }}
                    >
                      Commenser l{"'"}examen
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                    <div className="services">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="flaticon-tools">
                          {' '}
                          <img
                            src={examenlogo4}
                            size="md"
                            style={{
                              width: '50px',
                              height: '50px',
                            }}
                          />
                        </span>
                      </div>
                      <div className="media-body">
                        <h3 className="heading mb-3" style={{ marginLeft: '35px' }}>
                          Durée
                        </h3>
                        <p>Votre examen ca va dure environ 35 minutes</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                    <div className="services">
                      <div className="icon icon-2 d-flex align-items-center justify-content-center">
                        <span className="flaticon-instructor">
                          <img
                            src={examenlogo2}
                            size="md"
                            style={{
                              width: '50px',
                              height: '50px',
                            }}
                          />
                        </span>
                      </div>
                      <div className="media-body">
                        <h3 className="heading mb-3" style={{ marginLeft: '30px' }}>
                          Questions
                        </h3>
                        <p>
                          c{"'"}est un procédé d{"'"}évaluation dans lequel est proposée une seule
                          réponse pour chaque question.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                    <div className="services">
                      <div className="icon icon-3 d-flex align-items-center justify-content-center">
                        <span className="flaticon-quiz">
                          {' '}
                          <img
                            src={examenlogo3}
                            size="md"
                            style={{
                              width: '60px',
                              height: '60px',
                            }}
                          />
                        </span>
                      </div>
                      <div className="media-body">
                        <h3
                          className="heading mb-3"
                          style={{ marginLeft: '30px', marginTop: '27px' }}
                        >
                          Score
                        </h3>
                        <p>Pour réussir ,il faut valider 80 % ou plus de votre examen</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
                    <div className="services">
                      <div className="icon icon-4 d-flex align-items-center justify-content-center">
                        <span className="flaticon-browser">
                          <img
                            src={examenlogo1}
                            size="md"
                            style={{
                              width: '60px',
                              height: '60px',
                            }}
                          />
                        </span>
                      </div>
                      <div className="media-body">
                        ²{' '}
                        <h3 className="heading mb-3" style={{ marginLeft: '20px' }}>
                          Certificat
                        </h3>
                        <p>
                          l{"'"}obtention d{"'"}un certificat de réussite est totalement gratuite.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </CCard>
    </div>
  )
}
export default ExamenInfo
