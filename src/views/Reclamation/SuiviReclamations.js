import React, { useEffect, useState } from 'react'
import 'src/views/Reclamation/Reclamation.css'
import 'src/views/GestionFormation/listeFormation.css'
import Swal from 'sweetalert2'
import { DeleteReclamation, ReclamationByIdCandidat } from 'src/services/ReclamationService'
import AjouterReclamation from 'src/views/Reclamation/AjoutReclamation'

import { fetchUserData, getUserById } from 'src/services/UserService'
import { Link, useNavigate } from 'react-router-dom'
import {
  CCard,
  CPagination,
  CPaginationItem,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'
import 'src/views/GestionReclamation/gestionReclamation.css'

import { Modal, Button } from 'react-bootstrap'
import { cilFeaturedPlaylist, cilList, cilPencil, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const SuiviReclamations = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(5)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [bool, setBool] = useState(false)
  const [id, setId] = useState('')
  const [values, setValues] = useState({
    id: '',
    reference: '',
    objet: '',
    contenu: '',
    reponse: '',
    traitee: '',
    candidat: { id: '', authority: {} },
  })
  let navigate = useNavigate()
  //popup
  const [showAjt, setShowAjt] = useState(false)
  const [showMdf, setShowMdf] = useState(false)
  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => {
    setShowAjt(false)
  }

  function consulterReclamation(item) {
    navigate('/Reclamations/SuiviReclamations/ConsulterReclamation', {
      state: { state: item },
    })
  }

  function supprimerReclamation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cette reclamation ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DeleteReclamation(id)
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
        ReclamationByIdCandidat(response.data.id).then((response2) => {
          setPosts(response2.data)
          console.log(response2.data)
        })
      })
      .catch((e) => {})
  }, [showAjt, bool])

  if (posts.length == 0)
    return (
      <>
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
              Nouvelle reclamation
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
                Mes reclamations
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
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <AjouterReclamation />
            </Modal.Body>
          </Modal>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>
              Vous n{"'"}avez créer aucune reclamation!
            </div>
          </div>
        </CCard>
      </>
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
      <>
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
              Nouvelle reclamation
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
                Mes reclamations
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
              Ajouter reclamation
            </Modal.Header>
            <Modal.Body>
              <AjouterReclamation />
            </Modal.Body>
          </Modal>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Etat
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Référence
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Date de l{"'"}envoi
                </CTableHeaderCell>

                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Objet
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPosts.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* Etat*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={(id) => {
                        //  handleShowInfo(item.id)
                      }}
                    >
                      {item.traitee && (
                        <i
                          className="fa fa-check"
                          aria-hidden="true"
                          style={{
                            fontSize: 25,
                            color: '#140788',
                            color: 'green',
                          }}
                        ></i>
                      )}
                      {console.log(item.traitee)}
                    </div>
                  </CTableDataCell>
                  {/* Référence*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={() => {
                        consulterReclamation(item)
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
                        consulterReclamation(item)
                      }}
                    >
                      {item.dateenvoie}
                    </div>
                  </CTableDataCell>
                  {/* Objet*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim"
                      onClick={(id) => {
                        consulterReclamation(item)
                      }}
                    >
                      {item.objet}
                    </div>
                  </CTableDataCell>
                  {/* Action*/}
                  <CTableDataCell className="text-center">
                    <div>
                      {item.traitee != true && (
                        <span onClick={() => supprimerReclamation(item.id)}>
                          <i
                            className="fa fa-trash-o"
                            aria-hidden="true"
                            style={{ marginRight: 12, fontSize: 22, color: 'red' }}
                            title="Supprimer"
                          ></i>
                        </span>
                      )}
                      <span onClick={() => consulterReclamation(item)}>
                        <i
                          className="fa fa-external-link-square"
                          aria-hidden="true"
                          style={{ marginRight: 12, fontSize: 25, color: '#140788' }}
                          title="Consulter"
                        ></i>
                      </span>
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
      </>
    )
  }
}
export default SuiviReclamations
