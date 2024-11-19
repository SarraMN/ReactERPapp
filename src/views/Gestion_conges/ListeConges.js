import {
    CPagination,
    CPaginationItem
  } from '@coreui/react'
  import React, { useEffect, useState } from 'react'
  
  import 'src/views/gestion_demandes/demandes_inscriptions.css'
  
  import CIcon from '@coreui/icons-react'
  import {  cilTrash } from '@coreui/icons'
  
  import Swal from 'sweetalert2'
  import { useNavigate } from 'react-router-dom'
  import { GetListConges, DeleteConge } from 'src/services/congesService'
  import { fetchUserData } from 'src/services/UserService'

  const ListeConges = () => {
    let navigate = useNavigate()
   
    function AjoutConge() {
      navigate('/Gestion_conges/AddConge')
    }
  
    function notification_deValidation(id) {
      Swal.fire({
        title: 'Souhaitez-vous supprimer ce congé ?',
        showDenyButton: true,
        confirmButtonText: 'valider',
        denyButtonText: `annuler`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            DeleteConge(id)
            .then((response) => {
              console.log('data', response.data)
            })
            .catch((e) => {})
  
          Swal.fire('La suppression de ce compte a réussi!', '', 'success')
          GetListConges()
            .then((response) => {
              response.data.map((item, index) => {              
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
      navigate('/Gestion_conges/consulterConge', {
        state: { utilisateur: user },
      })
    }
  
    function deleteConge(id) {
      notification_deValidation(id)
    }

    const [posts, setPosts] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)
    const [NextPage, setNextPage] = useState(currentPage + 1)
    const [PreviewsPage, setPreviewsPage] = useState(1)
    const [activeNumber, setactiveNumber] = useState(1)
  
    useEffect(() => {
        fetchUserData()
        .then((response2) => {
            GetListConges(response2.data.id)
            .then((response) => {
            response.data.map((item, index) => {
            })
            setPosts(response.data)
            })
            .catch((e) => {})
    })
    .catch((e) => {})
    }, [])

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
              <button className="btnAdd btn-sm mb-0" onClick={AjoutConge}>
                <i
                  className="flex fa fa-user-plus"
                  aria-hidden="true"
                  style={{ marginRight: 10 }}
                ></i>
                Ajouter Congé
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
                        Liste des congés
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
                            <th className="text-center " style={{ width: '240px' }}>
                              <p
                                style={{
                                  color: 'light',
                                  'font-size': '15px',
                                  'font-weight': 'bold',
                                }}
                              >
                                {' '}
                                Type
                              </p>
                            </th>{' '}
                            <th className="text-center ">
                              <p
                                style={{
                                  color: 'light',
                                  'font-size': '15px',
                                  'font-weight': 'bold',
                                }}
                              >
                                {' '}
                                start Date
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
                                end Date
                              </p>
                            </th>
                            <th className="text-center " style={{ width: '200px' }}>
                              <p
                                style={{
                                  color: 'light',
                                  'font-size': '15px',
                                  'font-weight': 'bold',
                                }}
                              >
                                {' '}
                                description
                              </p>
                            </th>
                            <th className="text-center " style={{ width: '200px' }}>
                              <p
                                style={{
                                  color: 'light',
                                  'font-size': '15px',
                                  'font-weight': 'bold',
                                }}
                              >
                                {' '}
                                status
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
                                className="align-middle text-center"
                                onClick={(index) => userProfil(item)}
                              >
                                <span
                                  className="text-secondary text-xs "
                                  style={{ 'font-size': '14px', color: '#3B3737' }}
                                >
                                  {item.nom} {item.type}
                                </span>
                              </td>
                              <td
                                className="align-middle text-center"
                                onClick={(index) => userProfil(item)}
                                style={{ width: '200px' }}
                              >
                                <span
                                  className="text-secondary text-xs "
                                  style={{ 'font-size': '14px', color: '#3B3737', width: '100px' }}
                                >
                                  {item.startDate}
                                </span>
                              </td>
                              <td
                                className="align-middle text-center"
                                onClick={(index) => userProfil(item)}
                              >
                                <span
                                  className="text-secondary text-xs "
                                  style={{ 'font-size': '14px', color: '#3B3737' }}
                                >
                                  {item.endDate}
                                </span>
                              </td>
                              <td
                                className="align-middle text-center"
                                onClick={(index) => userProfil(item)}
                              >
                                <span
                                  className="text-secondary text-xs "
                                  style={{ 'font-size': '14px', color: '#3B3737' }}
                                >
                                  {item.description}
                                </span>
                              </td>
                              <td
                                className="align-middle text-center"
                                onClick={(index) => userProfil(item)}
                              >
                                <span
                                  className="text-secondary text-xs "
                                  style={{ 'font-size': '14px', color: '#3B3737' }}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <button
                                  style={{
                                    border: 0,
                                    backgroundColor: 'transparent',
                                    marginBottom: '5px',
                                  }}
                                  onClick={(index) => deleteConge(item.id)}
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
  export default ListeConges
  