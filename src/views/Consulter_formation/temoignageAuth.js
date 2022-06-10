import React, { useEffect, useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import photo5 from 'src/images/bg_2.jpg'
import photo6 from 'src/images/bg_3.jpg'
import { Modal, Button } from 'react-bootstrap'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// import required modules
import { EffectCoverflow, Pagination } from 'swiper'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import {
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import { fetchUserData } from 'src/services/UserService'
import {
  addtemoignage,
  deletetemoignage,
  getAlltemoignageByFormation,
  gettemoignageById,
  updatetemoignage,
} from 'src/services/temoignage'
import { cilPencil, cilPin } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { getfile } from 'src/services/fileService'
import ReactImg from 'src/assets/images/profile_homme.png'
const TemoignageAuth = (props) => {
  let values2 = {
    candidat: 0,
    formation: {
      id: '',
    },
    avis: '',
    note: '',
    id: '',
    date: '',
  }
  const [showMdf, setShowMdf] = useState(false)
  const [avis2, setavis2] = useState()
  const [date, setdate] = useState()
  const [avis3, setavis3] = useState()
  const [note2, setnote2] = useState()
  const [id, setid] = useState()
  const [note3, setnote3] = useState()
  const [idF, setIdF] = useState()
  const [idC, setIdC] = useState()
  const [showConsultation, setShowConsultation] = useState(false)
  const [CommentaireConsultation, setCommentaireConsultation] = useState({
    nom: '',
    prenom: '',
    email: '',
    note: '',
    avis: '',
  })
  function handleShowConsultation(item) {
    CommentaireConsultation.nom = item.candidat.nom
    CommentaireConsultation.prenom = item.candidat.prenom
    CommentaireConsultation.note = item.note
    CommentaireConsultation.avis = item.avis
    CommentaireConsultation.email = item.candidat.email
    setShowConsultation(true)
  }
  const handleCloseConsultation = () => {
    setShowConsultation(false)
  }
  function getTemoignageById(id, item) {
    gettemoignageById(id)
      .then((response) => {
        setavis2(response.data.avis)
        setavis3(response.data.avis)
        setnote2(response.data.note)
        setnote3(response.data.note)
        setIdF(response.data.formation.id)
        setIdC(response.data.candidat.id)
        setdate(response.data.date)
        setid(response.data.id)
        console.log('al note2', note2)
        console.log('al note2', note3)
        console.log('al note2', response.data.note)

        modifierTemoignage(response.data.note)
      })
      .catch((e) => {})
  }

  const modifierTemoignage = (note10) => {
    setShowMdf(true)

    if (note10 === 1) {
      document.getElementById('g1').style.color = 'orange'
      document.getElementById('g2').style.color = '#aaa'
      document.getElementById('g3').style.color = '#aaa'
      document.getElementById('g4').style.color = '#aaa'
      document.getElementById('g5').style.color = '#aaa'
    }
    if (note10 === 2) {
      document.getElementById('g1').style.color = 'orange'
      document.getElementById('g2').style.color = 'orange'
      document.getElementById('g3').style.color = '#aaa'
      document.getElementById('g4').style.color = '#aaa'
      document.getElementById('g5').style.color = '#aaa'
    }
    if (note10 === 3) {
      document.getElementById('g1').style.color = 'orange'
      document.getElementById('g2').style.color = 'orange'
      document.getElementById('g3').style.color = 'orange'
      document.getElementById('g4').style.color = '#aaa'
      document.getElementById('g5').style.color = '#aaa'
    }
    if (note10 === 4) {
      document.getElementById('g1').style.color = 'orange'
      document.getElementById('g2').style.color = 'orange'
      document.getElementById('g3').style.color = 'orange'
      document.getElementById('g4').style.color = 'orange'
      document.getElementById('g5').style.color = '#aaa'
    }
    if (note10 === 5) {
      document.getElementById('g1').style.color = 'orange'
      document.getElementById('g2').style.color = 'orange'
      document.getElementById('g3').style.color = 'orange'
      document.getElementById('g4').style.color = 'orange'
      document.getElementById('g5').style.color = 'orange'
    }
  }
  const handleCloseMdf = () => setShowMdf(false)
  function handleSubmitMdf(event) {
    if (avis2 === '') {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      Notification_NonVide()
    } else if (note2 === note3 && avis2 === avis3) {
      pas_changement()
    } else {
      values2.avis = avis2
      values2.note = note2
      values2.candidat = idC
      values2.formation.id = idF
      values2.id = id
      values2.date = date
      console.log('haaay al values2', values2)

      updatetemoignage(values2, values.id).then((response) => {
        if (response.status === 200) {
          setValidated(false)
          setnote3(note2)
          setavis3(avis2)
          Notification_Succees()
          settest(true)
          settest(false)

          /*         settemoignage([])
          setimages([])
          settest(true)
          settemoignage([])
          setimages([])
          settest(false) */
        } else Notification_failure()
      })
    }
  }
  const [formation, setFormation] = useState(props)

  const [validated, setValidated] = useState(false)
  const [avis, setAvis] = useState('')
  const [note, setNote] = useState(0)
  function changerCouleur5() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = 'orange'
    document.getElementById('h4').style.color = 'orange'
    document.getElementById('h5').style.color = 'orange'
    setNote(5)
  }
  function changerCouleur4() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = 'orange'
    document.getElementById('h4').style.color = 'orange'
    document.getElementById('h5').style.color = '#aaa'
    setNote(4)
  }
  function changerCouleur3() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = 'orange'
    document.getElementById('h4').style.color = '#aaa'
    document.getElementById('h5').style.color = '#aaa'
    setNote(3)
  }
  function changerCouleur2() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = '#aaa'
    document.getElementById('h4').style.color = '#aaa'
    document.getElementById('h5').style.color = '#aaa'
    setNote(2)
  }
  function changerCouleur1() {
    document.getElementById('noteV').style.visibility = 'hidden'
    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = '#aaa'
    document.getElementById('h3').style.color = '#aaa'
    document.getElementById('h4').style.color = '#aaa'
    document.getElementById('h5').style.color = '#aaa'
    setNote(1)
  }
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }
  function pas_changement() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'Il y a pas des changement',
    })
  }
  function Notification_Succees() {
    Swal.fire('Succès!', "L'actualité a été ajouter avec succès", 'success')
  }
  const [showAjt, setShowAjt] = useState(false)

  const handleShowAjt = () => {
    setShowAjt(true)
  }
  const handleCloseAjt = () => {
    setShowAjt(false)
  }
  const [values, setValues] = useState({
    candidat: 0,
    formation: {
      id: '',
    },
    avis: '',
    note: '',
  })
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  const handleSubmit = (event) => {
    if (avis === '') {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      Notification_NonVide()
    }
    if (note === 0) {
      event.preventDefault()
      event.stopPropagation()
      Notification_NonVide()
      document.getElementById('noteV').style.visibility = 'visible'
      document.getElementById('h1').style.color = 'red'
      document.getElementById('h2').style.color = 'red'
      document.getElementById('h3').style.color = 'red'
      document.getElementById('h4').style.color = 'red'
      document.getElementById('h5').style.color = 'red'
      document.getElementById('noteV').style.color = 'red'
    }
    if (note !== 0 && avis !== '') {
      document.getElementById('noteV').style.visibility = 'hidden'
      setValidated(true)
      fetchUserData().then((response) => {
        values.candidat = response.data.id
        values.avis = avis
        values.note = note
        values.formation.id = formation.formation
        addtemoignage(values).then((response3) => {
          if (response3.status === 200) {
            console.log('avec succée')
            initialiser()
            settest(true)
            settest(false)
            Notification_Succees()
          } else if (response3.status === 500) {
            console.log('failure')
            Notification_failure()
          }
        })
      })
    }
  }
  function initialiser() {
    setValidated(false)
    document.getElementById('noteV').style.visibility = 'hidden'
    document.getElementById('h1').style.color = '#aaa'
    document.getElementById('h2').style.color = '#aaa'
    document.getElementById('h3').style.color = '#aaa'
    document.getElementById('h4').style.color = '#aaa'
    document.getElementById('h5').style.color = '#aaa'
    setNote(0)
    setAvis('')
  }

  function hoverCouleur1() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = '#aaa'
    document.getElementById('h3').style.color = '#aaa'
    document.getElementById('h4').style.color = '#aaa'
    document.getElementById('h5').style.color = '#aaa'
    setNote(1)
  }
  function hoverCouleur2() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = '#aaa'
    document.getElementById('h4').style.color = '#aaa'
    document.getElementById('h5').style.color = '#aaa'
    setNote(2)
  }
  function hoverCouleur3() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = 'orange'
    document.getElementById('h4').style.color = '#aaa'
    document.getElementById('h5').style.color = '#aaa'
    setNote(3)
  }
  function hoverCouleur4() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = 'orange'
    document.getElementById('h4').style.color = 'orange'
    document.getElementById('h5').style.color = '#aaa'
    setNote(4)
  }
  function hoverCouleur5() {
    document.getElementById('noteV').style.visibility = 'hidden'

    document.getElementById('h1').style.color = 'orange'
    document.getElementById('h2').style.color = 'orange'
    document.getElementById('h3').style.color = 'orange'
    document.getElementById('h4').style.color = 'orange'
    document.getElementById('h5').style.color = 'orange'
    setNote(5)
  }
  function hoverCouleurG1() {
    document.getElementById('g1').style.color = 'orange'
    document.getElementById('g2').style.color = '#aaa'
    document.getElementById('g3').style.color = '#aaa'
    document.getElementById('g4').style.color = '#aaa'
    document.getElementById('g5').style.color = '#aaa'
    setnote2(1)
  }
  function hoverCouleurG2() {
    document.getElementById('g1').style.color = 'orange'
    document.getElementById('g2').style.color = 'orange'
    document.getElementById('g3').style.color = '#aaa'
    document.getElementById('g4').style.color = '#aaa'
    document.getElementById('g5').style.color = '#aaa'
    setnote2(2)
  }
  function hoverCouleurG3() {
    document.getElementById('g1').style.color = 'orange'
    document.getElementById('g2').style.color = 'orange'
    document.getElementById('g3').style.color = 'orange'
    document.getElementById('g4').style.color = '#aaa'
    document.getElementById('g5').style.color = '#aaa'
    setnote2(3)
  }
  function hoverCouleurG4() {
    document.getElementById('g1').style.color = 'orange'
    document.getElementById('g2').style.color = 'orange'
    document.getElementById('g3').style.color = 'orange'
    document.getElementById('g4').style.color = 'orange'
    document.getElementById('g5').style.color = '#aaa'
    setnote2(4)
  }
  function hoverCouleurG5() {
    document.getElementById('g1').style.color = 'orange'
    document.getElementById('g2').style.color = 'orange'
    document.getElementById('g3').style.color = 'orange'
    document.getElementById('g4').style.color = 'orange'
    document.getElementById('g5').style.color = 'orange'
    setnote2(5)
  }
  const [images, setimages] = useState([])
  const [test, settest] = useState(false)
  const [idCandidat, setIdCandidat] = useState(0)
  const [temoignage, settemoignage] = useState([])

  useEffect(() => {
    fetchUserData().then((response) => {
      setIdCandidat(response.data.id)
    })
    getAlltemoignageByFormation(formation.formation)
      .then((response) => {
        console.log('coucou', response.data)
        response.data.reverse().map((item, index) => {
          if (item.candidat.image == null) {
            images[item.candidat.id] = ReactImg
          } else {
            getfile(item.candidat.image.id)
              .then((response) => {
                settest(true)
                images[item.candidat.id] = URL.createObjectURL(response.data)
              })
              .catch((e) => {})
          }
        })
        settemoignage(response.data)
      })
      .catch((e) => {})
  }, [test])
  function supprimerTemoignage(id, item) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet temoignage ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deletetemoignage(id)
          .then((response) => {})
          .catch((e) => {})
        /*         settemoignage([])
        setimages([]) */
        settest(true)
        settest(false)
        Swal.fire('cette formation a été supprimé avec succes!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Aucune modification ', '', 'info')
      }
    })
  }
  return (
    <>
      {temoignage.length > 0 ? (
        <section className="ftco-section testimony-section bg-light">
          <div
            className="overlay"
            style={{
              'background-image': `url(${photo5})`,
            }}
          ></div>
          <div className="container" style={{ paddingTop: '25px' }}>
            <div className="row pb-4">
              <div className="col-md-7 heading-section ">
                <span className="subheading">Témoignage</span>
                <h2 className="mb-4">Que disent les candidats</h2>
              </div>
            </div>
          </div>
          <div className="container container-2" style={{ paddingTop: '25px' }}>
            <div className="row">
              <div className="col-md-12">
                <div className="carousel-testimony row" style={{ paddingBottom: '45px' }}>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
                    {' '}
                    {temoignage.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div style={{ width: '400px' }}>
                          <div className="testimony-wrap py-4" style={{ height: '300px' }}>
                            <div className="text">
                              <p className="star">
                                {item.note === 5 ? (
                                  <span>
                                    {' '}
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                  </span>
                                ) : (
                                  <span>
                                    {item.note === 4 ? (
                                      <span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                      </span>
                                    ) : (
                                      <span>
                                        {item.note === 3 ? (
                                          <span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>
                                          </span>
                                        ) : (
                                          <span>
                                            {item.note === 2 ? (
                                              <span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                              </span>
                                            ) : (
                                              <span>
                                                <span className="fa fa-star"></span>
                                              </span>
                                            )}
                                          </span>
                                        )}
                                      </span>
                                    )}
                                  </span>
                                )}
                              </p>
                              <p
                                className="mb-4"
                                style={{ 'word-wrap': 'break-word', height: '50px' }}
                                onClick={() => handleShowConsultation(item)}
                              >
                                {item.avis.substr(0, 20)}...
                                {item.avis.length < 30 ? (
                                  <div>
                                    <br></br>
                                  </div>
                                ) : (
                                  <span></span>
                                )}
                              </p>
                              <div className="d-flex align-items-center">
                                <div
                                  className="user-img"
                                  style={{
                                    'background-image': `url(${images[item.candidat.id]})`,
                                  }}
                                ></div>
                                <div className="pl-3">
                                  <p className="name">
                                    {item.candidat.nom} {item.candidat.prenom}
                                  </p>
                                  <span className="position">{item.candidat.email}</span>
                                </div>
                              </div>
                              {idCandidat === item.candidat.id ? (
                                <div
                                  style={{ align: 'right', float: 'right', paddingBottom: '30px' }}
                                >
                                  <i
                                    className="far fa-trash-alt fa-2x"
                                    onClick={() => supprimerTemoignage(item.id, item)}
                                    style={{ fontSize: 20, color: 'red' }}
                                  ></i>
                                  <i
                                    className="far fa-edit fa-2x"
                                    onClick={() => getTemoignageById(item.id, item)}
                                    style={{ fontSize: 20, marginLeft: '6px', color: 'green' }}
                                  ></i>
                                </div>
                              ) : (
                                <span></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div></div>
      )}
      <Modal
        size="lg"
        show={showAjt}
        onHide={handleCloseAjt}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ color: '#213f77', fontWeight: 'bold' }}>
          {' '}
          <CIcon
            icon={cilPencil}
            style={{
              marginRight: 15,
            }}
          />
          Ajouter Avis
        </Modal.Header>
        <Modal.Body>
          <CCard>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              style={{ paddingLeft: 15, paddingRight: 20, paddingTop: 15, paddingBottom: 15 }}
            >
              <CCol md={12}>
                {' '}
                <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
                  Avis (min 10 caractères)
                </CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="3"
                  required
                  style={{ width: '100%', 'max-width': '100%' }}
                  value={avis}
                  onChange={(e) => {
                    setAvis(e.target.value)
                  }}
                  minLength="10"
                ></CFormTextarea>
                <CFormFeedback invalid>Déscription est requise</CFormFeedback>
                <p style={{ color: 'dimgray' }}> {avis.length} caractères </p>
              </CCol>
              <CCol style={{ marginRight: '27%', marginLeft: '27%' }}>
                {' '}
                <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
                  <p>Quelle était la qualité de votre Formation ?</p>
                </CFormLabel>
                <div>
                  <div
                    className="rating"
                    style={{ marginLeft: '14px', marginRight: '18%', marginLeft: '18%' }}
                  >
                    <span
                      title="Donner 5 étoiles"
                      onClick={() => changerCouleur1()}
                      id="h1"
                      onMouseEnter={() => hoverCouleur1()}
                    >
                      ☆
                    </span>
                    <span
                      title="Donner 4 étoiles"
                      onClick={() => changerCouleur2()}
                      id="h2"
                      onMouseEnter={() => hoverCouleur2()}
                    >
                      ☆
                    </span>
                    <span
                      title="Donner 3 étoiles"
                      onClick={() => changerCouleur3()}
                      id="h3"
                      onMouseEnter={() => hoverCouleur3()}
                    >
                      ☆
                    </span>
                    <span
                      title="Donner 2 étoiles"
                      onClick={() => changerCouleur4()}
                      id="h4"
                      onMouseEnter={() => hoverCouleur4()}
                    >
                      ☆
                    </span>
                    <span
                      title="Donner 1 étoile"
                      onClick={() => changerCouleur5()}
                      id="h5"
                      onMouseEnter={() => hoverCouleur5()}
                    >
                      ☆
                    </span>
                  </div>
                </div>
                <CFormFeedback style={{ visibility: 'hidden' }} id="noteV">
                  Note est requise
                </CFormFeedback>
              </CCol>

              <CCol xs={12} style={{ marginTop: '50px' }}>
                <button
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    'border-radius': '30px',
                    color: '#213f77',
                    borderColor: '#213f77',
                    width: '120px',
                    height: '40px',
                    'font-weight': 'bold',
                  }}
                  type="button"
                  onClick={handleSubmit}
                >
                  Ajouter
                </button>
              </CCol>
            </CForm>
          </CCard>
        </Modal.Body>
      </Modal>
      <Modal
        show={showConsultation}
        onHide={handleCloseConsultation}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ color: '#213f77', fontWeight: 'bold' }}>
          <CIcon
            icon={cilPin}
            style={{
              marginRight: 15,
            }}
          />
          Consultation d{"'"}un commentaire
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginTop: 5, marginBottom: 20, fontWeight: 'bold' }}>
            <CCard style={{ 'background-color': '#D5E6F3', padding: '10px' }}>
              <CCol md={12}>
                <i
                  className="fa fa-user"
                  aria-hidden="true"
                  style={{ marginRight: '3px', color: '#213f77' }}
                ></i>
                {CommentaireConsultation.nom} {CommentaireConsultation.prenom}
              </CCol>

              <CCol md={12}>
                <i
                  className="fa  fa-envelope"
                  aria-hidden="true"
                  style={{ marginRight: '3px', color: '#213f77' }}
                ></i>
                {CommentaireConsultation.email}
              </CCol>
            </CCard>
          </div>
          <div style={{ fontWeight: 'bold', 'text-align': 'center' }}>
            <p className="star" style={{ color: '#F1A113' }}>
              {CommentaireConsultation.note === 5 ? (
                <span>
                  {' '}
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </span>
              ) : (
                <span>
                  {CommentaireConsultation.note === 4 ? (
                    <span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </span>
                  ) : (
                    <span>
                      {CommentaireConsultation.note === 3 ? (
                        <span>
                          <span className="fa fa-star"></span>
                          <span className="fa fa-star"></span>
                          <span className="fa fa-star"></span>
                        </span>
                      ) : (
                        <span>
                          {CommentaireConsultation.note === 2 ? (
                            <span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                            </span>
                          ) : (
                            <span>
                              <span className="fa fa-star"></span>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  )}
                </span>
              )}
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: '#213f77', 'word-wrap': 'break-word' }}>
              Contenu:
            </div>

            <span style={{ borderBlockColor: 'white', border: 0, marginBottom: 30 }}>
              <p style={{ 'word-wrap': 'break-word' }}>{CommentaireConsultation.avis}</p>
            </span>
          </div>
        </Modal.Body>
      </Modal>
      <section className="ftco-intro ftco-section ftco-no-pb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <div
                className="img"
                style={{
                  'background-image': `url(${photo6})`,
                }}
              >
                <div className="overlay"></div>
                <h2>Merci de nous partager votre avis</h2>
                <p>
                  Nous avons tous besoin de personnes qui nous donneront leur avis. C{"'"}est comme
                  ça qu{"'"}on s{"'"}améliore.
                </p>
                <p className="mb-0">
                  <button
                    href="tutorial-single.html"
                    className="btn-Aj"
                    onClick={handleShowAjt}
                    type="submit"
                    style={{
                      bottom: 0,
                      right: 0,
                      'border-radius': '5px',
                      color: '#213f77',
                      borderColor: '#213f77',
                      width: '160px',
                      height: '50px',
                      'font-weight': 'bold',
                      marginRight: '20%',
                      marginLeft: '20%',
                    }}
                  >
                    Ajouter avis
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Modal
          size="lg"
          show={showMdf}
          onHide={handleCloseMdf}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {/* <AjoutForm formation={formation} /> */}
            <CCard>
              <CCardHeader
                style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}
              >
                <CIcon
                  icon={cilPencil}
                  style={{
                    marginRight: 15,
                  }}
                />
                Modifier Formation
              </CCardHeader>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                style={{
                  paddingLeft: 15,
                  paddingRight: 20,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}
              >
                <CCol md={12}>
                  {' '}
                  <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
                    Avis (min 10 caractères)
                  </CFormLabel>
                  <CFormTextarea
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    style={{ width: '100%', 'max-width': '100%' }}
                    value={avis2}
                    onChange={(e) => {
                      setavis2(e.target.value)
                    }}
                    minLength="10"
                  ></CFormTextarea>
                  <CFormFeedback invalid>Avis est requise</CFormFeedback>
                  <p style={{ color: 'dimgray' }}> {avis.length} caractères </p>
                </CCol>
                <CCol style={{ marginRight: '27%', marginLeft: '27%' }}>
                  {' '}
                  <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
                    <p>Quelle était la qualité de votre Formation ?</p>
                  </CFormLabel>
                  <div>
                    <div
                      className="rating"
                      style={{ marginLeft: '14px', marginRight: '18%', marginLeft: '18%' }}
                    >
                      <span title="Donner 5 étoiles" id="g1" onMouseEnter={() => hoverCouleurG1()}>
                        ☆
                      </span>
                      <span title="Donner 4 étoiles" id="g2" onMouseEnter={() => hoverCouleurG2()}>
                        ☆
                      </span>
                      <span title="Donner 3 étoiles" id="g3" onMouseEnter={() => hoverCouleurG3()}>
                        ☆
                      </span>
                      <span title="Donner 2 étoiles" id="g4" onMouseEnter={() => hoverCouleurG4()}>
                        ☆
                      </span>
                      <span title="Donner 1 étoile" id="g5" onMouseEnter={() => hoverCouleurG5()}>
                        ☆
                      </span>
                    </div>
                  </div>
                  <CFormFeedback style={{ visibility: 'hidden' }} id="noteV">
                    Note est requise
                  </CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <Button
                    className="btn-Aj"
                    style={{
                      backgroundColor: 'white',
                      color: '#140788',
                      width: 100,
                      marginTop: 20,
                      marginRight: 20,
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                    }}
                    onClick={handleSubmitMdf}
                  >
                    Modifier
                  </Button>
                  {/*  <button
                            className="button blue"
                            style={{
                              color: 'white',
                              'font-size': '1.2em',
                              width: 150,
                              marginTop: 20,
                              marginRight: 20,
                              position: 'absolute',
                              'border-radius': '30px',
                              bottom: 0,
                              right: 0,
                            }}
                            onClick={handleSubmitMdf}
                          >
                            Valider
                          </button> */}
                </CCol>
              </CForm>
            </CCard>
          </Modal.Body>
        </Modal>
      </section>
    </>
  )
}
export default TemoignageAuth
