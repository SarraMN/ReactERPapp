import { cilPencil, cilPlus } from '@coreui/icons'
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
  CFormTextarea,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CAlert,
} from '@coreui/react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import 'src/App.css'
import React, { useEffect, useState } from 'react'
import 'src/views/GestionCours/cours.css'
import { Modal, Button } from 'react-bootstrap'
import AjoutForm from 'src/views/GestionCours/AjouterCours'
import {
  CoursByIdFormation,
  getCoursById,
  editCours,
  DeleteCours,
  ChangerEtatCours,
} from 'src/services/CoursService'
import { useLocation, useNavigate } from 'react-router-dom'
import CoursInfo from './CoursInfo'
import { getfile, downloadContract } from 'src/services/fileService'
import axios from 'axios'

const ListeCours = () => {
  let location = useLocation()
  let nomFormation = ''
  let idcours = null
  console.log('sousous', location)
  if (location.state === null) {
    idcours = localStorage.getItem('liste_cours')
    nomFormation = localStorage.getItem('nomFormation')
  } else {
    idcours = location.state.state.id
    nomFormation = location.state.titre
    localStorage.setItem('liste_cours', location.state.state.id)
    localStorage.setItem('nomFormation', nomFormation)
  }
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(6)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [selectValue, setselectValue] = useState('3')
  const [bool, setBool] = useState(false)
  const [boolarchive, setBoolarchive] = useState(false)
  const [etat, setEtat] = useState('Non archivé')
  const [etat2, setEtat2] = useState('Non archivé')
  //bool si il a supprimer
  // Formulaire d'ajout
  const [validated, setValidated] = useState(false)
  const [id, setId] = useState('')
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [objectif, setObjectif] = useState('')
  const [file, setFile] = useState('')
  const [titre2, setTitre2] = useState('')
  const [description2, setDescription2] = useState('')
  const [objectif2, setObjectif2] = useState('')
  const [file2, setFile2] = useState('')
  const [nom_doc, setnom_doc] = useState('')
  const [boolAjoutDoc, setboolAjoutDoc] = useState(false)
  /*   const [document, setdocument] = useState('')
   */ //coursInfo
  const [selectCoursId, setselectCoursId] = useState('')
  const [values, setValues] = useState({
    id: '',
    titre: '',
    description: '',
    dateCreation: '',
    objectif: '',
    formation: { id: '' },
    etat: ',',
    document: { id: '' },
  })

  function Notification_taille() {
    Swal.fire({
      icon: 'error',
      title: 'Taille minimum',
      text: 'La taille de la description et du chams objectif doivent être au minimum 50 caractères',
    })
  }
  function Notification_Pas_changement() {
    Swal.fire({
      icon: 'error',
      title: 'Pas de changement',
      text: 'Il faut changer des données pour effectuer une modification',
    })
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  function Notification_Succees() {
    Swal.fire('Succès!', 'La formation a été modifier avec succès', 'success')
  }

  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Problème',
      text: 'un problème dans la modification',
    })
  }
  //modification
  function CoursById(id) {
    console.log('ena njib fi cours')
    setId(id)
    setboolAjoutDoc(false)
    getCoursById(id)
      .then((response) => {
        //setData to the form
        console.log(response.data)
        setTitre(response.data.titre)
        setDescription(response.data.description)
        setObjectif(response.data.objectif)
        setEtat(response.data.etat)
        setTitre2(response.data.titre)
        setDescription2(response.data.description)
        setObjectif2(response.data.objectif)
        setEtat2(response.data.etat)
        //set les valeurs dans lobjet de l'update pour qu'il ne soient pas null
        values.dateCreation = response.data.dateCreation
        values.formation.id = idcours
        values.document.id = response.data.document.id

        setnom_doc(response.data.document.name)
        getfile(8)
          .then((response) => {
            /*             setdocument(URL.createObjectURL(response.data))
             */
            /*                         document.getElementById('formFileSm').value = URL.createObjectURL(response.data)
             */ setFile(URL.createObjectURL(response.data))
            setFile2(URL.createObjectURL(response.data))
          })
          .catch((e) => {})
      })
      .catch((e) => {})
  }
  let navigate = useNavigate()

  function pdfbyid(id) {
    navigate('/GestionFormation/listeFormation/listeCours/pdf', {
      state: { pdf: id },
    })
  }
  function taillefichiertroplarge() {
    Swal.fire({
      icon: 'error',
      title: 'Taille du fichier',
      text: 'Le fichier est trop volumineux!',
    })
  }
  function handleSubmitMdf(event) {
    const form = event.currentTarget
    if (titre === '' || description === '' || objectif === '' || etat === '' || file === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (
      titre === titre2 &&
      description === description2 &&
      objectif === objectif2 &&
      etat === etat2 &&
      boolAjoutDoc === false
    ) {
      Notification_Pas_changement()
    } else if (description.length < 50 || objectif.length < 50) {
      Notification_taille()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      values.id = id
      values.titre = titre
      values.description = description
      values.objectif = objectif
      values.etat = etat
      if (boolAjoutDoc === true) {
        const formData = new FormData()
        formData.append('file', file)
        axios({
          method: 'post',
          url: 'http://localhost:8080/file/upload',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(function (response) {
          console.log('filleee', response)
          if (response.data === 0) {
            taillefichiertroplarge()
          } else {
            console.log('ena  im', values)
            values.document.id = response.data
            editCours(id, values).then((response) => {
              if (response.status === 200) {
                setValidated(false)
                Notification_Succees()
                CoursById(values.id)
              } else Notification_failure()
            })
          }
        })
      } else {
        console.log('ena blach im', values)
        editCours(id, values).then((response) => {
          if (response.status === 200) {
            setValidated(false)
            Notification_Succees()
            CoursById(values.id)
          } else Notification_failure()
        })
      }
    }
  }
  //popup
  const [showAjt, setShowAjt] = useState(false)
  const [showMdf, setShowMdf] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => setShowAjt(false)

  const handleShowMdf = () => setShowMdf(true)

  const handleCloseMdf = () => setShowMdf(false)

  //pour afficher les details d'un cour losque en clique sur le titre
  const handleShowInfo = (id) => {
    setShowInfo(true)
    setselectCoursId(id)
  }
  const handleCloseInfo = () => setShowInfo(false)

  function ArchiverCours(id, item) {
    Swal.fire({
      title: 'Cette formation est ' + item.etat + '! ' + `Voulez vous changez l'état?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        ChangerEtatCours(id)
          .then(() => {
            Swal.fire('Modification avec succes!', '', 'success')
            setBoolarchive(true)
            setBoolarchive(false)
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Pas de changement!', '', 'info')
      }
    })
  }
  function supprimerCours(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet cours ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DeleteCours(id)
          .then((response) => {
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})

        Swal.fire('cette formation a été supprimé avec succes!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  //getallCours de la formation séléctionner (vide)
  useEffect(() => {
    CoursByIdFormation(idcours)
      .then((response) => {
        setPosts(response.data.reverse())
      })
      .catch((e) => {})
  }, [showAjt, showMdf, bool, boolarchive])
  const [logo, setlogo] = useState('')
  function imageHandler(e) {
    setnom_doc(e.target.files[0].name)
    setFile(e.target.files[0])
    setboolAjoutDoc(true)
  }
  /*s'il ya aucun cours*/
  if (posts.length === 0)
    return (
      <div className="cours">
        <div className="listeFormation">
          <CCard>
            <header className="card-heade">
              <p className="card-header-title">
                <span className="icon">
                  <i className="mdi mdi-account-circle"></i>
                </span>
                Les cours du formation {nomFormation}
              </p>
              <button href="tutorial-single.html" className="btn-Aj" onClick={handleShowAjt}>
                <i
                  className="flex fa fa-plus-circle"
                  aria-hidden="true"
                  style={{ marginRight: 10, paddingTop: 5 }}
                ></i>
                Ajouter cours
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
                <CIcon
                  icon={cilPlus}
                  style={{
                    marginRight: 15,
                  }}
                />
                Ajouter Cours
              </Modal.Header>
              <Modal.Body>
                <AjoutForm id={idcours} />
              </Modal.Body>
            </Modal>
            <div>
              <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>
                Aucun cours n{"'"}est créer pour cette formation!
              </div>
            </div>
          </CCard>
          <br></br>
          <CAlert color="danger" dismissible onClose={() => {}}>
            <strong> Remarque :</strong> une formation ne peut pas etre envoyer a un candidat que
            lorsqu
            {"'"}il presente au minimum cinque cours.
          </CAlert>
        </div>
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
      setselectValue(event.target.value)
      setpostsPerPage(selectValue)
    }

    return (
      <div className="cours">
        <div className="listeFormation">
          <CCard>
            <header className="card-heade">
              <p className="card-header-title">
                <span className="icon">
                  <i className="mdi mdi-account-circle"></i>
                </span>
                Les cours du {nomFormation}
              </p>
              <button
                href="tutorial-single.html"
                className="btn-Aj"
                onClick={handleShowAjt}
                type="submit"
              >
                <i
                  className="flex fa fa-plus-circle"
                  aria-hidden="true"
                  style={{ marginRight: 10, paddingTop: 5 }}
                ></i>
                Ajouter Cours
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
                <CIcon
                  icon={cilPlus}
                  style={{
                    marginRight: 15,
                    color: '#213f77',
                    fontWeight: 'bold',
                  }}
                />
                Ajouter cours
              </Modal.Header>{' '}
              <Modal.Body>
                <AjoutForm id={idcours} />
              </Modal.Body>
            </Modal>

            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                    Ressources
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                    Titre
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                    Etat
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                    Date création
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                    Dernière modification
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentPosts.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    {/* Ressources*/}
                    <CTableDataCell className="text-center">
                      <div className="small text-medium-emphasis">
                        <span
                          onClick={() => {
                            pdfbyid(item.document.id)
                          }}
                        >
                          <i
                            className="fa fa-file-pdf-o"
                            aria-hidden="true"
                            style={{ marginRight: 10, fontSize: 20, color: '#3399ff' }}
                            title="consulter"
                          ></i>
                        </span>
                      </div>
                    </CTableDataCell>
                    {/* Titre*/}
                    <CTableDataCell className="text-center">
                      <div
                        className="meduim "
                        onClick={(id) => {
                          handleShowInfo(item.id)
                        }}
                      >
                        {' '}
                        {item.titre}
                      </div>
                    </CTableDataCell>
                    {/* Etat*/}
                    <CTableDataCell className="text-center">
                      <div
                        className="meduim "
                        onClick={(id) => {
                          handleShowInfo(item.id)
                        }}
                      >
                        {item.etat}
                      </div>
                    </CTableDataCell>
                    {/* Date création*/}
                    <CTableDataCell className="text-center">
                      <div
                        className="meduim "
                        onClick={(id) => {
                          handleShowInfo(item.id)
                        }}
                      >
                        {item.dateCreation}
                      </div>
                    </CTableDataCell>
                    {/* Date modification*/}
                    <CTableDataCell className="text-center">
                      <div
                        className="meduim"
                        onClick={(id) => {
                          handleShowInfo(item.id)
                        }}
                      >
                        {item.dateMdf}
                      </div>
                    </CTableDataCell>
                    {/* Action*/}
                    <CTableDataCell className="text-center">
                      <div>
                        <span
                          onClick={() => {
                            CoursById(item.id)
                            handleShowMdf()
                          }}
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                            style={{ marginRight: 12, fontSize: 22, color: 'green' }}
                            title="Modifier"
                          ></i>
                        </span>

                        <Modal
                          size="lg"
                          show={showMdf}
                          onHide={handleCloseMdf}
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header
                            closeButton
                            style={{ color: '#213f77', fontWeight: 'bold' }}
                          >
                            <CIcon
                              icon={cilPencil}
                              style={{
                                marginRight: 15,
                                color: '#213f77',
                                fontWeight: 'bold',
                              }}
                            />
                            Modifier Cours
                          </Modal.Header>{' '}
                          <Modal.Body>
                            {/* <AjoutForm formation={formation} /> */}
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
                                  <CFormLabel
                                    htmlFor="validationCustom01"
                                    style={{ fontWeight: 'bold' }}
                                  >
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
                                {etat === 'Non archivé' ? (
                                  <CCol md={6}>
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
                                  </CCol>
                                ) : (
                                  <CCol md={6}>
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
                                  </CCol>
                                )}

                                <CCol md={6}>
                                  <CFormLabel
                                    htmlFor="exampleFormControlTextarea1"
                                    style={{ fontWeight: 'bold' }}
                                  >
                                    Déscription (min 50 caractères)
                                  </CFormLabel>
                                  <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    required
                                    value={description}
                                    onChange={(e) => {
                                      setDescription(e.target.value)
                                    }}
                                    minLength="50"
                                  ></CFormTextarea>
                                  <CFormFeedback invalid>Déscription est requise</CFormFeedback>
                                  <p style={{ color: 'dimgray' }}>
                                    {' '}
                                    {description.length} caractères{' '}
                                  </p>
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel
                                    htmlFor="exampleFormControlTextarea1"
                                    style={{ fontWeight: 'bold' }}
                                  >
                                    Objectifs (min 50 caractères)
                                  </CFormLabel>
                                  <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    required
                                    value={objectif}
                                    onChange={(e) => {
                                      setObjectif(e.target.value)
                                    }}
                                    minLength="50"
                                  ></CFormTextarea>
                                  <CFormFeedback invalid>Champs requis</CFormFeedback>
                                  <p style={{ color: 'dimgray' }}> {objectif.length} caractères </p>
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel style={{ fontWeight: 'bold' }}>
                                    Ajouter le cours en format pdf
                                  </CFormLabel>
                                  {/* <CFormInput
                                  required
                                  type="file"
                                  size="sm"
                                  id="formFileSm"
                                  name="sou"
                                  onChange={(value) => imageHandler(value)}

                                                                   value={file}

                                                                    onChange={(e) => {setFile(e.target.value) }}

                                /> */}
                                  <div className="field-body mx-auto">
                                    <div className="field file mx-auto">
                                      <label
                                        className="upload control mx-auto"
                                        style={{
                                          border: 'solid',
                                          'border-width': '0.5px',
                                          padding: '5px',
                                        }}
                                      >
                                        <a
                                          className="button blue"
                                          style={{
                                            color: '#213f77',
                                            'background-color': 'white',
                                          }}
                                        >
                                          Choisir le document
                                        </a>
                                        {/*  <Field
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(value) => imageHandler(value)}
                                        name="image"
                                        className={
                                          errors.image && touched.image ? ' is-invalid' : ''
                                        }
                                      /> */}
                                        <CFormInput
                                          required
                                          type="file"
                                          size="sm"
                                          id="formFileSm"
                                          name="sou"
                                          accept="application/pdf"
                                          onChange={(value) => imageHandler(value)}

                                          /*                                   value={file}
                                           */
                                          /*     onChange={(e) => {
                                          setFile(e.target.value)
                                        }} */
                                        />
                                      </label>
                                    </div>
                                    <p>{nom_doc}</p>
                                  </div>
                                  <CFormFeedback invalid>Champs requis</CFormFeedback>
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

                        <span onClick={() => supprimerCours(item.id)}>
                          <i
                            className="fa fa-trash-o"
                            aria-hidden="true"
                            style={{ marginRight: 12, fontSize: 22, color: 'red' }}
                            title="Supprimer"
                          ></i>
                        </span>
                        {item.etat === 'Non archivé' ? (
                          <span onClick={() => ArchiverCours(item.id, item)}>
                            <i
                              className="fa fa-eye"
                              aria-hidden="true"
                              style={{ fontSize: 19, color: '#140788' }}
                              title="Non archivé"
                            ></i>
                          </span>
                        ) : (
                          <span onClick={() => ArchiverCours(item.id, item)}>
                            <i
                              className="fa fa-eye-slash"
                              aria-hidden="true"
                              style={{ fontSize: 19, color: '#140788' }}
                              title="Archiver"
                            ></i>
                          </span>
                        )}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
                {/* modal de l'afichage des inoformations */}
                <Modal
                  show={showInfo}
                  onHide={handleCloseInfo}
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
                    Détails Cours
                  </Modal.Header>
                  <Modal.Body>
                    <CCard>
                      <CoursInfo id={selectCoursId}></CoursInfo>
                    </CCard>
                  </Modal.Body>
                </Modal>
              </CTableBody>
            </CTable>
            <br></br>
            <CPagination
              className="justify-content-end"
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
          <br></br>
          <CAlert color="danger" dismissible onClose={() => {}}>
            <strong> Remarque :</strong> une formation ne peut pas etre envoyer a un candidat que
            lorsqu
            {"'"}il presente au minimum cinque cours.
          </CAlert>
        </div>
      </div>
    )
  }
}
export default ListeCours
