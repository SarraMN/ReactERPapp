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
        setimages([])
        console.log('data', response.data)
        response.data.map((item, index) => {
          let values = {
            id: '',
            image: '',
            candidat: '',
            emailcandidat: '',
            formation: '',
            categorie: '',
            dateE: '',
            dateT: '',
            etat: '',
          }
          values.id = item.id
          values.candidat = item.candidat.nom + ' ' + item.candidat.prenom
          values.emailcandidat = item.candidat.email
          values.formation = item.formation.titre
          values.categorie = item.formation.categorie
          values.dateE = item.dateCreation
          values.dateT = item.datetraitement
          values.etat = item.etat
          if (item.candidat.image == null) {
            values.image = avatar8
            images.push(avatar8)
          } else {
            getfile(item.candidat.image.id)
              .then((response) => {
                values.image = URL.createObjectURL(response.data)
                images.push(URL.createObjectURL(response.data))
              })
              .catch((e) => {})
          }
          posts2.push(values)
        })
        setPosts(posts2)
        setPosts2([])
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
    <div>
      <CAvatar src={images[1]} size="md" />

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
                    <CAvatar src={images[1]} size="md" />
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
                                <CAvatar src={item.image} size="md" />
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <>
                                  <h6 className="mb-0 text-sm">{item.candidat}</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    {item.emailcandidat}
                                  </p>
                                </>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold mb-0"> {item.formation}</p>
                            <p className="text-xs text-secondary mb-0"> {item.categorie}</p>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {item.dateE}
                            </span>
                          </td>{' '}
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {item.dateT}
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
