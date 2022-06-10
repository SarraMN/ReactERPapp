import {
  CAvatar,
  CButton,
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

import 'src/views/gestion_demandes/demandes_inscriptions.css'

import CIcon from '@coreui/icons-react'
import { cilBan, cilCheckCircle, cilList } from '@coreui/icons'

import avatar8 from './../../assets/images/profile_homme.png'
import { uploadfile, getfile } from 'src/services/fileService'
import {
  getdemandes_ins_formations,
  accepterdemande,
  refuserdemande,
  gethistorique,
} from 'src/services/demandes_inscriptionService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Demandes_inscriptions = () => {
  const [posts2, setPosts2] = useState([])
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  let [images, setimages] = useState([])
  let [bool, setbool] = useState(false)

  useEffect(() => {
    gethistorique()
      .then((response) => {
        response.data.map((item, index) => {
          if (item.candidat.image == null) {
            images[item.candidat.id] = avatar8
          } else {
            getfile(item.candidat.image.id)
              .then((response) => {
                setbool(true)
                images[item.candidat.id] = URL.createObjectURL(response.data)
              })
              .catch((e) => {})
          }
        })
        setPosts(response.data)
      })
      .catch((e) => {})
  }, [bool])
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
                    Historique des demandes
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
                            la date d{"'"}envoi{' '}
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
                            la date de traitement
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
                            Etat
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
                                <>
                                  <h6 className="mb-0 text-sm">
                                    {item.candidat.nom} {item.candidat.prenom}
                                  </h6>
                                  <p className="text-xs text-secondary mb-0">
                                    {item.candidat.email}
                                  </p>
                                </>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold mb-0"> {item.formation.titre}</p>
                            <p className="text-xs text-secondary mb-0">
                              {' '}
                              {item.formation.categorie}
                            </p>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {item.dateCreation}
                            </span>
                          </td>{' '}
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {item.datetraitement}
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {item.etat == 'acceptée' ? (
                                <button
                                  className="btn btn-success active"
                                  type="button"
                                  aria-pressed="true"
                                  style={{ width: '120px' }}
                                >
                                  acceptée
                                </button>
                              ) : (
                                <button
                                  className="btn btn-danger active"
                                  type="button"
                                  aria-pressed="true"
                                  style={{ width: '120px' }}
                                >
                                  refusée
                                </button>
                              )}
                            </span>
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
}
export default Demandes_inscriptions
