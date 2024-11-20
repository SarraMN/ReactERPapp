import { cilNewspaper, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import {
  CCard,
  CPagination,
  CPaginationItem,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react'
import { uploadfile, getfile } from 'src/services/fileService'

import React, { useEffect, useState } from 'react'
import 'src/views/Gestion_Actualite/actualite.css'
import 'src/views/GestionFormation/listeFormation.css'
import { Modal, Button } from 'react-bootstrap'
import AjoutForm from 'src/views/Gestion_Actualite/Ajouter_Actualite'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  ChangerEtatActualite,
  deleteActualite,
  getActualiteById,
  getAllActualitesForAdmin,
  updateActualite,
} from 'src/services/actualiteService'

const Actualites = () => {
  let [images, setimages] = useState([])
  let [nbrImg, setnbrImg] = useState(0)
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(3)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [selectValue, setselectValue] = useState('3')
  const [bool, setBool] = useState(false)
  const [boolarchive, setBoolarchive] = useState(false)
  const [etat, setEtat] = useState('Non archivé')
  const [etat2, setEtat2] = useState('Non archivé')

  // Formulaire d'ajout
  const [validated, setValidated] = useState(false)
  const [id, setId] = useState('')
  const [titre, setTitre] = useState('')
  const [titre2, setTitre2] = useState('')
  const [archivee, setarchivee] = useState('')
  const [archivee2, setarchivee2] = useState('')
  const [dateExpiration, setdateExpiration] = useState('')
  const [dateExpiration2, setdateExpiration2] = useState('')
  const [description, setDescription] = useState('')
  const [description2, setDescription2] = useState('')
  const [image, setimage] = useState('')
  const [image2, setimage2] = useState('')
  const [image3, setimage3] = useState('')

  const [values, setValues] = useState({
    id: '',
    titre: '',
    description: '',
    archivee: '',
    datecreation: '',
    dateExpiration: '',
    image: {
      id: '',
    },
  })
  var today = new Date()
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  var dateExp = new Date(dateExpiration)
  var aujourdhui = new Date(date)

  function ErrDateRxpiration() {
    Swal.fire({
      icon: 'error',
      title: `Date d'éxpiration `,
      text: `La date d'éxpiration doit être supérieur à la date d'aujourd'hui  `,
    })
  }
  function Notification_tailleDescription() {
    Swal.fire({
      icon: 'error',
      title: 'Taille description',
      text: 'La taille de la description doit être au minimum 100 caractères',
    })
  }
  function Notification_Succees() {
    Swal.fire('Succès!', 'La formation a été modifier avec succès', 'success')
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }

  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Problème',
      text: 'un problème dans la modification',
    })
  }
  //modification
  function getActualiteById2(id) {
    console.log('hallo', id)
    setId(id)
    getActualiteById(id)
      .then((response) => {
        //setData to the form
        setTitre(response.data.titre)
        setTitre2(response.data.titre)
        setarchivee(response.data.archivee)
        setarchivee2(response.data.archivee)
        setdateExpiration(response.data.dateExpiration)
        setdateExpiration2(response.data.dateExpiration)
        setDescription(response.data.description)
        setDescription2(response.data.description)
        values.image.id = response.data.image.id
        getfile(response.data.image.id)
          .then((response2) => {
            setimage(URL.createObjectURL(response2.data))
          })
          .catch((e) => {})
        setimage2(image)
        setimage3(image)

        //set les valeurs dans lobjet de lupdate pour qu'il ne soient pas null
        values.dateExpiration = response.data.dateExpiration
        values.description = response.data.description
        values.archivee = response.data.archivee
        values.datecreation = response.data.datecreation
        values.titre = response.data.titre
        values.id = response.data.id
      })
      .catch((e) => {})
  }
  function handleSubmitMdf(event) {
    if (titre === '' || dateExpiration === '' || description === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (description.length < 100) {
      Notification_tailleDescription()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (aujourdhui > dateExp) {
      ErrDateRxpiration()
      event.preventDefault()
      event.stopPropagation()
      setValidated(false)
    } else {
      setValidated(true)
      values.id = id
      values.titre = titre
      values.description = description
      values.dateExpiration = dateExpiration
      values.archivee = archivee
      const formData = new FormData()
      formData.append('file', image2)
      if (image2 === image3) {
        updateActualite(values).then((response) => {
          if (response.status === 200) {
            setValidated(false)
            Notification_Succees()
          } else Notification_failure()
        })
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:8080/file/upload',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(
          function (response) {
            if (response.data !== 0) {
              values.image.id = response.data
              updateActualite(values).then((response) => {
                if (response.status === 200) {
                  setValidated(false)
                  Notification_Succees()
                  getAllActualitesForAdmin()
                    .then((response) => {
                      response.data.map((item, index) => {
                        getfile(item.image.id)
                          .then((response2) => {
                            settest(true)
                            images[item.id] = URL.createObjectURL(response2.data)
                            item.image = URL.createObjectURL(response2.data)
                          })
                          .catch((e) => {})
                      })

                      setPosts(response.data)
                    })
                    .catch((e) => {})
                } else Notification_failure()
              })
            } else {
            }
          },
          function (error) {},
        )
      }
    }
  }
  //popup
  const [showAjt, setShowAjt] = useState(false)
  const [showMdf, setShowMdf] = useState(false)

  const handleShowAjt = () => {
    settest(false)
    setShowAjt(true)
  }
  const handleCloseAjt = () => {
    settest(false)
    setShowAjt(false)
  }

  const handleShowMdf = () => setShowMdf(true)
  const handleCloseMdf = () => setShowMdf(false)

  function changerEtatEactualite1(id, item) {
    let etat = ''
    if (item.archivee === true) {
      etat = 'archivée'
    } else {
      etat = 'non archivée'
    }
    Swal.fire({
      title: 'Cette actualité  est ' + etat + '! ' + `Voulez vous changez l'état?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        ChangerEtatActualite(id)
          .then(() => {
            Swal.fire('Modification avec succes!', '', 'success')
            setBoolarchive(true)
            setBoolarchive(false)
            getAllActualitesForAdmin().then((response) => {
              response.data.map((item, index) => {
                getfile(item.image.id)
                  .then((response2) => {
                    settest(true)
                    images[item.id] = URL.createObjectURL(response2.data)
                    item.image = URL.createObjectURL(response2.data)
                  })
                  .catch((e) => {})
              })

              setPosts(response.data)
            })
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Pas de changement!', '', 'info')
      }
    })
  }
  function nbrImg2() {
    nbrImg = nbrImg + 1
  }
  function supprimerActualite(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cette actualité ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteActualite(id)
          .then((response) => {
            console.log('data', response.data)
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})

        Swal.fire('cette actualité a été supprimé avec succes!', '', 'success')
        getAllActualitesForAdmin()
          .then((response) => {
            response.data.map((item, index) => {
              getfile(item.image.id)
                .then((response2) => {
                  settest(true)
                  images[item.id] = URL.createObjectURL(response2.data)
                  item.image = URL.createObjectURL(response2.data)
                })
                .catch((e) => {})
            })

            setPosts(response.data)
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Aucune modification ', '', 'info')
      }
    })
  }
  let navigate = useNavigate()
  function ActualiteInfo2(a) {
    navigate('/Gestion_Actualite/Actualites/actualiteInfo', {
      state: { actualite: a },
    })
  }

  function imageHandler(e) {
    setimage2(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  const [test, settest] = useState(false)
  /*getFormation */
  useEffect(() => {
    getAllActualitesForAdmin()
      .then((response) => {
        console.log('hal sbeh2', response)
        response.data.map((item, index) => {
          getfile(item.image.id)
            .then((response2) => {
              settest(true)
              images[item.id] = URL.createObjectURL(response2.data)
              item.image = URL.createObjectURL(response2.data)
            })
            .catch((e) => {})
        })

        setPosts(response.data)
      })
      .catch((e) => {})
  }, [showAjt, showMdf, bool, test, boolarchive])
  if (posts.length == 0)
    return (
      <div className="actualite listeFormation">
        <CCard>
          <header className="card-heade">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              Les actualités
            </p>
            <button href="tutorial-single.html" className="btn-Aj" onClick={handleShowAjt}>
              <i
                className="flex fa fa-newspaper-o"
                aria-hidden="true"
                style={{ marginRight: 10, paddingTop: 5 }}
              ></i>
              Ajouter actualité
            </button>
          </header>
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
                icon={cilNewspaper}
                style={{
                  marginRight: 15,
                }}
              />
              Ajouter Actualité
            </Modal.Header>
            <Modal.Body>
              <AjoutForm />
            </Modal.Body>
          </Modal>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>
              Aucune actualité n{"'"}est diponible!
            </div>
          </div>
        </CCard>
      </div>
    )
  else {
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage //3
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    // Change page
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
      if (pageNumber < posts.length / postsPerPage) setNextPage(pageNumber + 1)
      if (pageNumber > 1) setPreviewsPage(pageNumber - 1)
    }
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i)
    }

    //selcetionner nombre de posts per page
    const handleChange = (event) => {
      console.log(event.target.value)
      setselectValue(event.target.value)
      setpostsPerPage(selectValue)
    }

    return (
      <div className="listeFormation">
        <CCard>
          <header className="card-heade">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              Les Actualités
            </p>
            <button
              href="tutorial-single.html"
              className="btn-Aj"
              onClick={handleShowAjt}
              type="submit"
            >
              <i
                className="flex fa fa-newspaper-o"
                aria-hidden="true"
                style={{ marginRight: 10, paddingTop: 5 }}
              ></i>
              Ajouter actualité
            </button>
          </header>
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
                icon={cilNewspaper}
                style={{
                  marginRight: 15,
                }}
              />
              Ajouter Actualité
            </Modal.Header>
            <Modal.Body>
              <AjoutForm />
            </Modal.Body>
          </Modal>
          {currentPosts.map((item, index) => (
            <div className="tutorial-item mb-6" key={index}>
              <div className="d-flex">
                <CCol md={4}>
                  <div>
                    <a href="#">
                      <img
                        src={images[item.id]}
                        alt="Image"
                        className="img-fluid"
                        style={{ width: '300px', height: '270px' }}
                      />
                    </a>
                    {nbrImg2()}
                  </div>
                </CCol>
                <CCol md={8}>
                  <div className="it-cont" style={{ 'word-wrap': 'break-word', marginBottom: 12 }}>
                    <h3>
                      <a href="#">{item.titre}</a>
                    </h3>
                    {/* <p>{item.description.substr(1, 60)}...</p> */}
                    <div style={{ 'word-wrap': 'break-word', marginBottom: 12 }}>
                      <p>{item.description.substr(0, 190)}...</p>
                    </div>
                    <div className="meta" style={{ color: '#6F6C6C', marginBottom: 30 }}>
                      <div>
                        <span className="mr-2 mb-2">Date de publication: {item.datecreation}</span>
                        <p className="mr-2 mb-2">
                          Date d{"'"}expiration : {item.dateExpiration}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(index) => {
                        ActualiteInfo2(item)
                      }}
                      className="btn-plus"
                      style={{ paddingLeft: 15 }}
                    >
                      Voir plus
                    </button>
                  </div>
                </CCol>
              </div>
              <div className="buttons">
                <button
                  className="btn-Modf custom-btn"
                  title="Modifier"
                  onClick={() => {
                    getActualiteById2(item.id)
                    handleShowMdf()
                  }}
                >
                  <i className="far fa-edit fa-2x"></i>
                </button>
                <Modal
                  size="lg"
                  show={showMdf}
                  onHide={handleCloseMdf}
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
                    Modifier actualité
                  </Modal.Header>
                  <Modal.Body>
                    <CCard>
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
                        <CCol md={6}>
                          <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom01">
                            Titre
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            id="validationCustom01"
                            defaultValue=""
                            required
                            value={titre}
                            onChange={(e) => {
                              setTitre(e.target.value)
                            }}
                          />
                          <CFormFeedback invalid>Titre est requis</CFormFeedback>
                        </CCol>

                        <CCol md={6}>
                          <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="DateE">
                            Date d{"'"}expiration
                          </CFormLabel>
                          <CFormInput
                            type="date"
                            id="DateE"
                            defaultValue=""
                            required
                            value={dateExpiration}
                            onChange={(e) => {
                              setdateExpiration(e.target.value)
                            }}
                          />
                          <CFormFeedback invalid>
                            Vous devez ajouter une date d{"'"}éxpiration.
                          </CFormFeedback>
                        </CCol>
                        <CCol md={6}>
                          <div
                            style={{
                              'text-align': 'center',
                            }}
                          >
                            <img
                              src={image}
                              alt="photo"
                              className="responsive"
                              width="500"
                              height="200"
                            />
                          </div>
                          <div className="field-body mx-auto" style={{ 'margin-top': '15px' }}>
                            <div
                              className="field file mx-auto"
                              style={{
                                'border-radius': '30px',
                                color: 'white',
                                borderColor: 'white',
                                width: '150px',
                              }}
                            >
                              <label
                                className="upload control mx-auto"
                                style={{
                                  Float: 'center',
                                  align: 'center',
                                  'border-radius': '30px',
                                  color: 'white',
                                  borderColor: 'white',
                                  width: '150px',
                                }}
                              >
                                <a
                                  className="button blue"
                                  style={{
                                    color: '#213f77',
                                    'background-color': 'white',
                                    borderColor: '#213f77',
                                    width: '150px',
                                    border: '2.5px solid #213f77',
                                    paddingLeft: 5,
                                  }}
                                >
                                  Choisir une photo
                                </a>
                                <CFormInput
                                  type="file"
                                  accept="image/png, image/jpeg, image/jpg"
                                  onChange={(value) => imageHandler(value)}
                                  name="image"
                                />{' '}
                              </label>
                            </div>
                          </div>
                        </CCol>
                        <CCol md={6}>
                          {' '}
                          <CFormLabel
                            style={{ fontWeight: 'bold' }}
                            htmlFor="exampleFormControlTextarea1"
                          >
                            Contenu (minimum 100 caractères)
                          </CFormLabel>
                          <CFormTextarea
                            id="exampleFormControlTextarea1"
                            rows="8"
                            required
                            style={{ width: '100%', 'max-width': '100%' }}
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value)
                            }}
                            minLength="100"
                          ></CFormTextarea>
                          <CFormFeedback invalid>Déscription est requise</CFormFeedback>
                          <p style={{ color: 'dimgray' }}> {description.length} caractères </p>
                          {archivee == false ? (
                            <span>
                              <CFormLabel
                                htmlFor="validationCustom01"
                                style={{ fontWeight: 'bold' }}
                              >
                                Spécifier l{"'"}etat:
                              </CFormLabel>

                              <CFormCheck
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value="Non archivé"
                                label="Non archivé"
                                onChange={(e) => {
                                  setEtat(e.target.value)
                                }}
                                defaultChecked
                              />
                              <CFormCheck
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                value="Archivé"
                                label="Archivé"
                                onChange={(e) => {
                                  setEtat(e.target.value)
                                }}
                              />
                            </span>
                          ) : (
                            <span>
                              <CFormLabel
                                htmlFor="validationCustom01"
                                style={{ fontWeight: 'bold' }}
                              >
                                Spécifier l{"'"}etat:
                              </CFormLabel>

                              <CFormCheck
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value="Non archivé"
                                label="Non archivé"
                                onChange={(e) => {
                                  setEtat(e.target.value)
                                }}
                              />
                              <CFormCheck
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                value="Archivé"
                                label="Archivé"
                                onChange={(e) => {
                                  setEtat(e.target.value)
                                }}
                                defaultChecked
                              />
                            </span>
                          )}
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
                        </CCol>
                      </CForm>
                    </CCard>
                  </Modal.Body>
                </Modal>
                <button
                  className="btn-Supp custom-btn"
                  title="Supprimer"
                  onClick={() => supprimerActualite(item.id)}
                >
                  <i className="far fa-trash-alt fa-2x"></i>
                </button>

                {item.archivee == false ? (
                  <button className="btn-arch custom-btn" title="Non archivé">
                    <i
                      className="fa fa-eye fa-2x"
                      onClick={() => changerEtatEactualite1(item.id, item)}
                    ></i>
                  </button>
                ) : (
                  <button className="btn-arch custom-btn" title="Archiver">
                    <i
                      className="fa fa-eye-slash fa-2x"
                      onClick={() => changerEtatEactualite1(item.id, item)}
                    ></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          <br></br>
          <CPagination
            className="justify-content-center"
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
              <CPaginationItem style={{ background: '#140788', color: 'white' }}>
                {activeNumber}
              </CPaginationItem>
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
          </CPagination>

          <div className="row pagination_row" style={{ marginRight: 15, marginBottom: 15 }}>
            <div className="col">
              <div className="pagination_container d-flex flex-row align-items-center justify-content-start">
                <div className="courses_show_container ml-auto clearfix">
                  <div className="courses_show_text">
                    <span>1-{postsPerPage}</span> de <span>{posts.length}</span> resultats
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCard>
      </div>
    )
  }
}
export default Actualites
