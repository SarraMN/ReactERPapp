import {
  CAvatar,
  CCard,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import avatar8 from './../../assets/images/profile_homme.png'
import { uploadfile, getfile } from 'src/services/fileService'

import 'src/views/gestion_demandes/demandes_inscriptions.css'

import CIcon from '@coreui/icons-react'
import { cilBan, cilCheckCircle, cilFolderOpen, cilList } from '@coreui/icons'

import {
  getdemandes_ins_formations,
  accepterdemande,
  refuserdemande,
} from 'src/services/demandes_inscriptionService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Demandes_inscriptions = () => {
  let navigate = useNavigate()
  const [bool, setBool] = useState(false)
  const dispatch = useDispatch()
  let nbrDemandes = useSelector((state) => state.nbrDemandes)

  function notification_deValidation(id) {
    Swal.fire({
      title: 'Souhaitez-vous refuser cette demande?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'valider',
      denyButtonText: `annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        refuserdemande(id)
          .then((response) => {
            console.log('data', response.data)
          })
          .catch((e) => {})

        Swal.fire('cette demande est rejetée avec succés.', '', 'success')
        setBool(true)
        setBool(false)
        getdemandes_ins_formations()
          .then((response) => {
            console.log('hayd data', response.data)
            setPosts(response.data)
          })
          .catch((e) => {})
        dispatch({ type: 'set', nbrDemandes: nbrDemandes - 1 })
        nbrDemandes = nbrDemandes - 1
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  function notification_deValidation2(id) {
    Swal.fire({
      title: 'Seriez-vous prêt à accepter cette demande?',
      showDenyButton: true,
      confirmButtonText: 'valider',
      denyButtonText: `annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        accepterdemande(id)
          .then((response) => {
            console.log('data', response.data)
          })
          .catch((e) => {})

        Swal.fire('cette demande est acceptée avec succés', '', 'success')
        setBool(true)
        setBool(false)

        getdemandes_ins_formations()
          .then((response) => {
            setPosts(response.data)
          })
          .catch((e) => {})
        dispatch({ type: 'set', nbrDemandes: nbrDemandes - 1 })
        nbrDemandes = nbrDemandes - 1
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  function demanderefusée(id) {
    notification_deValidation(id)
  }
  function demandeacceptée(id) {
    notification_deValidation2(id)
  }
  function voirhistorique() {
    navigate('/gestion_demandes/demandes_inscription_formation/historiques_demandes_formations')
  }
  const [posts, setPosts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  let [images, setimages] = useState([])

  useEffect(() => {
    getdemandes_ins_formations()
      .then((response) => {
        response.data.map((item, index) => {
          if (item.candidat == null) {
          } else {
            if (item.candidat.image == null) {
              images[item.candidat.id] = avatar8
            } else {
              getfile(item.candidat.image.id)
                .then((response) => {
                  images[item.candidat.id] = URL.createObjectURL(response.data)
                })
                .catch((e) => {})
            }
          }
        })
        setPosts(response.data)
        console.log('data', response.data)
      })
      .catch((e) => {})
  }, [bool])
  if (posts) {
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
    return (
      <div className="demandeINS">
        <div>
          <div className="col-12 text-end" style={{ height: '15px', marginBottom: '19px' }}>
            <button className="btnAdd btn-sm mb-0" onClick={voirhistorique}>
              <CIcon
                icon={cilFolderOpen}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              Voir historiques
            </button>
          </div>
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6
                      className="text-white ps-3"
                      style={{ 'font-weight': 'bold', 'font-size': '22px' }}
                    >
                      Les demandes d{"'"}inscription aux formations
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              Id
                            </p>
                          </th>
                          <th>
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              {' '}
                              Candidat
                            </p>
                          </th>
                          <th>
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              {' '}
                              Formation
                            </p>
                          </th>
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              {' '}
                              Date
                            </p>
                          </th>
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              {' '}
                              Action
                            </p>
                          </th>

                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts.map((item, index) => (
                          <tr key={index}>
                            <td className="align-middle text-center text-sm">
                              <span
                                className="badge badge-sm"
                                style={{ color: 'black', 'font-size': '12px' }}
                              >
                                {item.id}
                              </span>
                            </td>

                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <CAvatar src={images[item.candidat.id]} size="md" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  {item.candidat != null ? (
                                    <>
                                      <h6 className="mb-0 text-sm">
                                        {item.candidat.nom} {item.candidat.prenom}
                                      </h6>
                                      <p className="text-xs text-secondary mb-0">
                                        {item.candidat.email}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <h6 className="mb-0 text-sm">John Michael</h6>
                                      <p className="text-xs text-secondary mb-0">
                                        john@creative-tim.com
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {item.formation.titre}
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                {' '}
                                {item.formation.categorie}
                              </p>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {item.dateCreation}
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <button
                                style={{
                                  border: 0,
                                  backgroundColor: 'transparent',
                                }}
                                onClick={(index) => demanderefusée(item.id)}
                              >
                                <CIcon
                                  icon={cilBan}
                                  customClassName="nav-icon"
                                  style={{
                                    marginTop: 5,
                                    width: 30,
                                    height: 30,
                                    color: 'red',
                                  }}
                                />
                              </button>
                              <button
                                style={{
                                  border: 0,
                                  backgroundColor: 'transparent',
                                }}
                                onClick={(index) => demandeacceptée(item.id)}
                              >
                                <CIcon
                                  icon={cilCheckCircle}
                                  customClassName="nav-icon"
                                  style={{
                                    marginTop: 5,
                                    width: 30,
                                    height: 30,
                                    color: 'green',
                                  }}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ 'text-align': ' center' }}>
                      <br></br>
                      <div
                        className="row pagination_row"
                        style={{ marginRight: 15, marginBottom: 15 }}
                      >
                        <div className="col">
                          <div className="pagination_container d-flex flex-row align-items-center justify-content-start">
                            <div className="courses_show_container ml-auto clearfix">
                              <div className="courses_show_text">
                                <span>1-{postsPerPage}</span> de <span>{posts.length}</span>{' '}
                                resultats
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
                          <CPaginationItem active>{activeNumber}</CPaginationItem>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return <div>un probleme de connexion avec le serveur </div>
}
export default Demandes_inscriptions
