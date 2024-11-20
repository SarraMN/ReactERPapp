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

import 'src/views/gestion_demandes/demandes_inscriptions.css'

import CIcon from '@coreui/icons-react'
import { cilBan, cilCheckCircle, cilList, cilDataTransferDown, cilTrash } from '@coreui/icons'
import avatar8 from './../../assets/images/profile_homme.png'
import { uploadfile, getfile } from 'src/services/fileService'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { getEmployeeList, deleteuser } from 'src/services/gestionutilisateurs'

import { getList ,remove} from 'src/services/evaluationService'

const ListeUtilisateurs = () => {
  let navigate = useNavigate()
  const [profileimg, setProfileimg] = useState(avatar8)
 
  function ajoutEvaluation() {
    navigate('/operation_rh/evaluations/ajout')
  }

  function notification_deValidation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet utilisateur ?',
      showDenyButton: true,
      confirmButtonText: 'valider',
      denyButtonText: `annuler`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        remove(id)
          .then((response) => {
            console.log('data', response.data)
          })
          .catch((e) => {})

        Swal.fire('La suppression de ce compte a réussi!', '', 'success')
        getEmployeeList()
          .then((response) => {
            response.data.map((item, index) => {
              if (item.image == null) {
                images[item.id] = avatar8
              } else {
                getfile(item.image.id)
                  .then((response) => {
                    settest(true)
                    images[item.id] = URL.createObjectURL(response.data)
                  })
                  .catch((e) => {})
              }
            })
            setPosts(response.data)
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }

  function userProfil(user) {
    navigate('/GestionUtilisateurs/listeUtilisateurs/userProfile', {
      state: { utilisateur: user },
    })
  }

  function Deleteuser(id) {
    notification_deValidation(id)
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
  let [test, settest] = useState(false)

  useEffect(() => {

    getList()
      .then((response) => {
        setPosts(response.data)
      })
      .catch((e) => {})
  }, [test, images])
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
            <button className="btnAdd btn-sm mb-0" onClick={ajoutEvaluation}>
              <i
                className="flex fa fa-user-plus"
                aria-hidden="true"
                style={{ marginRight: 10 }}
              ></i>
              Ajouter employé
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
                      Liste des evaluations
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
                          <th className="text-center ">
                            <p
                              style={{
                                color: 'light',
                                'font-size': '15px',
                                'font-weight': 'bold',
                              }}
                            >
                              Employee
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
                              Evaluator
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
                              Score
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
                            <td
                              className="align-middle text-center text-sm"
                              onClick={(index) => userProfil(item)}
                            >
                              <span
                                className="align-middle text-center"
                                style={{ 'font-size': '14px', color: '#3B3737' }}
                              >
                                {item.id}
                              </span>
                            </td>

                            <td
                              className="align-middle text-center text-sm"
                              onClick={(index) => userProfil(item)}
                            >
                              <span
                                className="align-middle text-center"
                                style={{ 'font-size': '14px', color: '#3B3737' }}
                              >
                                {item.employee}
                              </span>
                            </td>
                            
                            <td
                              className="align-middle text-center text-sm"
                              onClick={(index) => userProfil(item)}
                            >
                              <span
                                className="align-middle text-center"
                                style={{ 'font-size': '14px', color: '#3B3737' }}
                              >
                                {item.evaluator}
                              </span>
                            </td>

                            <td
                              className="align-middle text-center text-sm"
                              onClick={(index) => userProfil(item)}
                            >
                              <span
                                className="align-middle text-center"
                                style={{ 'font-size': '14px', color: '#3B3737' }}
                              >
                                {item.score}
                              </span>
                            </td>
                            <td
                              className="align-middle text-center text-sm"
                              onClick={(index) => userProfil(item)}
                            >
                              <span
                                className="align-middle text-center"
                                style={{ 'font-size': '14px', color: '#3B3737' }}
                              >
                                {item.date}
                              </span>
                            </td>

                            <td className="align-middle text-center">
                              <button
                                style={{
                                  border: 0,
                                  backgroundColor: 'transparent',
                                  marginBottom: '5px',
                                }}
                                onClick={(index) => Deleteuser(item.id)}
                              >
                                <CIcon
                                  icon={cilTrash}
                                  customClassName="nav-icon"
                                  style={{
                                    marginTop: 5,
                                    width: 25,
                                    height: 25,
                                    color: 'red',
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
export default ListeUtilisateurs
