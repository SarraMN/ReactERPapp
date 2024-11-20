import React, { useEffect, useState } from 'react'
import 'src/views/Reclamation/Reclamation.css'
import Swal from 'sweetalert2'
import AjouterLog from 'src/views/Gestion_logs/AjoutLog'
import { getTimeSheetsByEmployee, DeleteLog,getTimeSheetById,updateTimeSheet } from 'src/services/logsService';

import { fetchUserData } from 'src/services/UserService'
import {  useNavigate } from 'react-router-dom'
import {
  CCard,
  CPagination,
  CPaginationItem,
  CTable,
  CForm,
  CCol,CFormLabel,CFormInput,
  CFormFeedback,
  CFormTextarea,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'
import 'src/views/Reclamation/ConsulterReclamation.css'

import { Modal, Button } from 'react-bootstrap'
import { cilFeaturedPlaylist, cilList, cilPencil, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import 'src/views/Gestion_logs/log.css'

const ListeMesLogs = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(5)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [bool, setBool] = useState(false)
 
  let navigate = useNavigate()
  //popup
  const [showAjt, setShowAjt] = useState(false)
  const [showMdf, setShowMdf] = useState(false)
  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => {
    setShowAjt(false)
  }
  const handleShowMdf = () => setShowMdf(true)
  const handleCloseMdf = () => setShowMdf(false)

  function ConsulterLog(item) {
  }
  const [validated, setValidated] = useState(false)
  const [id, setId] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [description, setdescription] = useState('')
  const [hoursWorked, setHoursWorked] = useState('') 
  const [date, setDate] = useState('') 
  const [values, setValues] = useState({
    id: '',
    taskTitle: '',
    description: '',
    hoursWorked: '',
    date: '',
    employee: { id: '', authority: {} },
  })

  const [values2, setValues2] = useState({
    id: '',
    taskTitle: '',
    description: '',
    hoursWorked: '',
    date: '',
    employee: { id: '', authority: {} },
  })

  function Notification_Succees() {
    Swal.fire('Succès!', 'La formation a été modifié avec succès', 'success')
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  function Notification_tailleDescription() {
    Swal.fire({
      icon: 'error',
      title: 'Taille description',
      text: 'La taille de la description doit être au minimum 50 caractères',
    })
  }

  const handleSubmit = (event) => {
    //console.log('file', file)
    if (taskTitle === '' || description === '' || date === '' || hoursWorked === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    }
    else if (description.length < 50) {
        Notification_taille()
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)
      } 
    else {
      setValidated(true)
      values2.taskTitle = taskTitle
      values2.date = date
      values2.id = id
      values2.hoursWorked = hoursWorked
      values2.description = description
      updateTimeSheet(values2.id,values2).then((response) => {
        if (response.status === 200) {
          console.log('avec succée')
          Notification_Succees()
          setBool(true)
          setBool(false)
        } else {
          console.log('failure')
          Notification_failure()
        }
      })
    }
  }
  
  function getLogById(id) {
    setId(id)
    getTimeSheetById(id)
      .then((response) => {
        //setData to the form
        setTaskTitle(response.data.taskTitle)
        setHoursWorked(response.data.hoursWorked)
        setdescription(response.data.description)
        setDate(response.data.date)
        values2.employee.authority = response.data.employee.authority
        values2.employee.id = response.data.employee.id

      })
      .catch((e) => {})
  }

  function supprimerLog(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cette journal ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      if (result.isConfirmed) {
          DeleteLog(id)
          .then((response) => {
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})

        Swal.fire('La reclamation a été supprimé avec succes!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }

  /*getReclamations */
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        console.log(response.data.id)
        getTimeSheetsByEmployee(response.data.id).then((response2) => {
          setPosts(response2.data)
          console.log(response2.data)
        })
      })
      .catch((e) => {})
  }, [showAjt, bool])

  if (posts.length == 0)
    return (
      <div className="SuivreReclamation">
        <div style={{ marginBottom: '70px' }}>
          <div className="col-12 text-end" style={{ height: '15px', marginBottom: '19px' }}>
            <button
              className="btnAdd btn-sm mb-0"
              style={{ 'font-size': '18px' }}
              onClick={handleShowAjt}
            >
              <CIcon
                icon={cilFeaturedPlaylist}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              nouveau Journal
            </button>
          </div>
        </div>
        <CCard>
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                Mes journaux
              </h6>
            </div>
          </div>

          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>
              Vous n{"'"}avez créer aucun journal!
            </div>
          </div>
        </CCard>
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
            Ajouter nouveau journal
          </Modal.Header>
          <Modal.Body>
            <AjouterLog />
          </Modal.Body>
        </Modal>
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
    /* const handleChange = (event) => {
      console.log(event.target.value)
      setselectValue(event.target.value)
      setpostsPerPage(selectValue)
    }
 */
    return (
      <div className="SuivreReclamation">
        <div style={{ marginBottom: '70px' }}>
          <div className="col-12 text-end" style={{ height: '15px', marginBottom: '19px' }}>
            <button className="btnAdd btn-sm mb-0" onClick={handleShowAjt}>
              <CIcon
                icon={cilFeaturedPlaylist}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              Nouveau journal
            </button>
          </div>
        </div>
        <CCard>
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                Mes journaux
              </h6>
            </div>
          </div>
          <Modal
            size="lg"
            show={showAjt}
            onHide={handleCloseAjt}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}
            >
              <CIcon
                icon={cilPencil}
                style={{
                  marginRight: 15,
                }}
              />
              Ajouter journal
            </Modal.Header>
            <Modal.Body>
              <AjouterLog />
            </Modal.Body>
          </Modal>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Référence
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                Date
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                Heures travaillées
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                Titre de la tâche
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                Statut 
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPosts.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={(id) => {
                        ConsulterLog(item)
                      }}
                    >
                      {item.id}
                    </div>
                  </CTableDataCell>
                  {/* Date création*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={(id) => {
                        ConsulterLog(item)
                      }}
                    >
                      {item.date}
                    </div>
                  </CTableDataCell>
                  {/* Objet*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim"
                      onClick={(id) => {
                        ConsulterLog(item)
                      }}
                    >
                      {item.hoursWorked} heures
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim"
                      onClick={(id) => {
                        ConsulterLog(item)
                      }}
                    >
                      {item.taskTitle}
                    </div>
                  </CTableDataCell>
                  {/* Action*/}
                  <CTableDataCell className="text-center">
                        <div>
                        {item.state == "PENDING" ? (
                            <>
                                <span > {item.state}</span>
                            </>
                            ) : (
                            
                            <span>
                            {item.state == "APPROVED" ? (
                            <>
                               <span className="state_Accepter"> {item.state} BY {item.approvedBy.nom} {item.approvedBy.prenom}</span>
                            </>
                            ) : (
                            <span className="state_Refuser">{item.state} BY {item.approvedBy.nom} {item.approvedBy.prenom}
                            
                            
                            </span>
                            )}
                            </span>
                            
                            )}
                        </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                    <div>
                      {item.state == "PENDING" && (
                        <span>
                        <span onClick={() => supprimerLog(item.id)}>
                          <i
                            className="fa fa-trash-o"
                            aria-hidden="true"
                            style={{ marginRight: 12, fontSize: 22, color: 'red' }}
                            title="Supprimer"
                          ></i>
                        </span>

                        <div className="buttons">
                <span
                  className="btn-Modf custom-btn"
                  title="Modifier"
                  onClick={() => {
                    getLogById(item.id)
                    handleShowMdf()
                  }}
                >
                  <i className="far fa-edit"
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
                  <Modal.Header closeButton style={{ color: '#213f77', fontWeight: 'bold' }}>
                    <CIcon
                      icon={cilPencil}
                      style={{
                        marginRight: 15,
                      }}
                    />
                    Modifier un journal
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
                      <CCol md={8}>
                      <CFormLabel htmlFor="type" style={{ fontWeight: 'bold' }}>
                      Titre de la tâche *
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="type"
                        required
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                      />
                      <CFormFeedback invalid>Type est requis</CFormFeedback>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="startDate" style={{ fontWeight: 'bold' }}>
                        Date *
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        id="startDate"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <CFormFeedback invalid>Champs requis</CFormFeedback>
                    </CCol>
          
                    <CCol md={6}>
                    <CFormLabel htmlFor="numericField" style={{ fontWeight: 'bold' }}>
                    Heures travaillées *
                    </CFormLabel>
                    <CFormInput
                        type="number" // Restricts input to numeric values
                        id="numericField"
                        required
                        value={hoursWorked}
                        onChange={(e) => setHoursWorked(e.target.value)}
                    />
                    <CFormFeedback invalid>Champs requis</CFormFeedback>
                    </CCol>

                    <CCol md={12}>
                      <CFormLabel htmlFor="description" style={{ fontWeight: 'bold' }}>
                        Description (min 50 caractères)
                      </CFormLabel>
                      <CFormTextarea
                        id="description"
                        rows="7"
                        required
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                      ></CFormTextarea>
                      <CFormFeedback invalid>Champs requis</CFormFeedback>
                      <p style={{ color: 'dimgray' }}>{description.length} caractères</p>
                    </CCol>
          
                    <CCol xs={12}>
                      <button
                        className="btn-Aj-Recl"
                        style={{
                          width: 100,
                          marginTop: 50,
                          marginRight: 20,
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                        }}
                        type="button"
                        onClick={handleSubmit}
                      >
                        Envoyer
                      </button>
                    </CCol>
                      </CForm>
                    </CCard>
                  </Modal.Body>
                </Modal>
              
              </div>
              </span>
                      )}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <br></br>
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
        </CCard>
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
            Ajouter journal
          </Modal.Header>
          <Modal.Body>
            <AjouterLog />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default ListeMesLogs
