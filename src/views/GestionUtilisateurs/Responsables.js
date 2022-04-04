import {
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
import { getformateurs, getusers, deleteuser } from 'src/services/gestionutilisateurs'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUserPlus,
  cilPlus,
  cilPencil,
  cilUserUnfollow,
  cilDataTransferDown,
  cilTrash,
  cilCalendar,
  cilFilter,
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import 'src/views/GestionUtilisateurs/liste_attente.css'
import { StylesProvider } from '@material-ui/core'

const Responsables = (id) => {
  function notification_deValidation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet utilisateur ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'valider',
      denyButtonText: `invalider`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteuser(id)
          .then((response) => {
            console.log('data', response.data)
          })
          .catch((e) => {})

        Swal.fire('cet compte est supprimé avec succes!', '', 'success')
        getformateurs()
          .then((response) => {
            setPosts(response.data)
            console.log('data', response.data)
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  let navigate = useNavigate()

  function RespoProfil(user) {
    navigate('/GestionUtilisateurs/Responsables/responsable', {
      state: { utilisateur: user },
    })
  }
  function AjouterResponsable() {
    navigate('/GestionUtilisateurs/Responsables/ajoutresponsable')
  }
  function Deleteuser(id) {
    console.log('yaa rabi', id)
    notification_deValidation(id)
  }

  const [posts, setPosts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)

  useEffect(() => {
    getformateurs()
      .then((response) => {
        setPosts(response.data)
        console.log('data', response.data)
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
      <>
        <div style={{ paddingbottom: '100px' }}>
          <div>
            <div className="table-data__tool-right">
              <button
                className="au-btn au-btn-icon au-btn--green au-btn--small"
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: '#213f77',
                  color: 'white',
                  /*    align: 'right',
                  float: 'right',
            */
                }}
                onClick={AjouterResponsable}
              >
                <CIcon
                  icon={cilPlus}
                  customClassName="nav-icon"
                  style={{
                    marginTop: 5,
                    width: 20,
                    height: 20,
                    color: 'white',
                  }}
                ></CIcon>
                <i className="zmdi zmdi-plus"></i> Ajouter Responsable
              </button>
            </div>
            {/*   <input
              style={{ height: '40px' }}
              id="searchbar"
              type="text"
              name="search"
              placeholder=" chercher responsable"
            /> */}
          </div>
          <br></br>
        </div>
        <CCard>
          <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
            <CIcon
              icon={cilPeople}
              style={{
                marginRight: 15,
              }}
            />
            Liste des responsables
          </CCardHeader>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Nom</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Prénom</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Genre</CTableHeaderCell>
                <CTableHeaderCell className="text-center">E-mail</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Numero</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Date de creation</CTableHeaderCell>
                <CTableHeaderCell className="text-center">derniere connexion</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Action a faire</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPosts.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* Nom*/}
                  <CTableDataCell className="text-center" onClick={(index) => RespoProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.nom}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Prénom*/}
                  <CTableDataCell className="text-center" onClick={(index) => RespoProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.prenom}</strong>
                    </div>
                  </CTableDataCell>
                  {/* genre*/}
                  <CTableDataCell className="text-center" onClick={(index) => RespoProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.genre}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Email*/}
                  <CTableDataCell className="text-center" onClick={(index) => RespoProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.email}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Numtell*/}
                  <CTableDataCell className="text-center" onClick={(index) => RespoProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.numero_de_telephone}</strong>
                    </div>
                  </CTableDataCell>
                  {/* LastLogin*/}
                  <CTableDataCell className="text-center" onClick={(index) => RespoProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.createdAt}</strong>
                    </div>
                  </CTableDataCell>
                  {/* LastLogin*/}
                  <CTableDataCell className="text-center" onClick={(index) => RespoProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.lastLogin}15/05/2022</strong>
                    </div>
                  </CTableDataCell>
                  {/* Approuver*/}
                  <CTableDataCell style={{ textAlign: 'center' }}>
                    <button
                      style={{
                        border: 0,
                        backgroundColor: 'transparent',
                      }}
                      onClick={(index) => Deleteuser(item.id)}
                    >
                      <CIcon
                        icon={cilTrash}
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
                    >
                      <CIcon
                        icon={cilDataTransferDown}
                        customClassName="nav-icon"
                        style={{
                          marginTop: 5,
                          width: 30,
                          height: 30,
                          color: 'blue',
                        }}
                      />
                    </button>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
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
        </CCard>
      </>
    )
  } else return <div>un probleme de connexion avec le serveur </div>
}
export default Responsables
