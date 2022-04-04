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
import { getcandidats, deleteuser } from 'src/services/gestionutilisateurs'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUserPlus,
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

const Listeattente = (id) => {
  /*   const [values, setValues] = useState({
    dateDebut: '',
    dateFin: '',
  }) */

  function handleSubmit() {
    var date1 = document.getElementById('start1').value
    var date2 = document.getElementById('start2').value
    if (date2 == '') {
      console.log('fergha2')
    }
    if (date1 == '') {
      console.log('fergha 1')
    }

    if (date2 < date1) {
      console.log('hehi ghalta 1')
    } else {
      if (date1 == date2) {
      } else {
        console.log(posts.length)
        for (let i = 0; i < posts.length; i++) {
          if (posts.createdAt < date2 && posts.createdAt > date1) {
            return console.log('al kharya hedhi', posts)
          }
        }
      }
    }
    console.log('hhhhh', date1)
    console.log('hhhhh', date2)
  }
  //varaible 1
  const [filtrer_Datedecreation, setFiltrer_Datedecreation] = useState(false)

  useEffect(() => {
    setFiltrer_Datedecreation(false)
  }, [])
  //variable 2
  const [filtrer_Datedelogin, setFiltrer_Datedelogin] = useState(false)

  useEffect(() => {
    setFiltrer_Datedelogin(false)
  }, [])

  let section1 = document.getElementsByTagName('filtrer1')

  function handleChange(event) {
    console.log('valeuri', event.target.value)
    if (event.target.value == 'alo1') {
      if (filtrer_Datedecreation == false) {
        setFiltrer_Datedecreation(true)
        Document.getElementsByTagName('property').options[0].selected = true
      }
      if (filtrer_Datedecreation == true) {
        setFiltrer_Datedecreation(false)
      }
    }

    if (event.target.value == 'alo2') {
      if (filtrer_Datedelogin == false) {
        setFiltrer_Datedelogin(true)
      } else {
        setFiltrer_Datedelogin(false)
      }
    }
  }

  function supprimerfiltrage() {
    /*     document.getElementById(document.getElementById('property1').options).selected = 'false'
     */ setFiltrer_Datedecreation(false)
  }
  function supprimerfiltrage2() {
    setFiltrer_Datedelogin(false)
  }
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
        getcandidats()
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

  function userProfil(user) {
    navigate('/GestionUtilisateurs/listeUtilisateurs/userProfile', {
      state: { utilisateur: user },
    })
  }

  function Deleteuser(id) {
    notification_deValidation(id)
  }
  const [posts, setPosts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)

  useEffect(() => {
    getcandidats()
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
        <div style={{ paddingLeft: '15px', paddingRight: '10px', paddingBottom: '15px' }}>
          <label style={{ 'font-size': '1.2em', 'font-weight': 'bold', paddingRight: '10px' }}>
            <CIcon
              icon={cilFilter}
              customClassName="nav-icon"
              style={{
                marginTop: 5,
                width: 'Auto',
                height: 22,
                color: 'blue',
              }}
            />{' '}
            Filtrage par :
          </label>
          <div className="rs-select2--light rs-select2--md">
            <select
              name="property"
              id="property1"
              className="js-select2"
              style={{
                height: '40px',
                width: 250,
                'text-align': 'center',
                'font-size': '1.2em',
                color: '#888888',
                'border-radius': '10px',
              }}
              onClick={handleChange}
            >
              <option id="property2" value="" selected hidden></option>
              <option value="alo1">Date De creation</option>
              <option value="alo2">Date de derniere connexion</option>
            </select>
          </div>
          {/*  <input
            style={{ height: '40px', align: 'right', float: 'right' }}
            id="searchbar"
            type="text"
            name="search"
            placeholder=" chercher candidat"
          />
     */}{' '}
        </div>
        <div>
          {filtrer_Datedecreation ? (
            <div name="filtrer1" onChange="">
              <CCardHeader
                style={{
                  'border-top-left-radius': '10px',
                  'border-top-right-radius': '10px',
                  backgroundColor: '#213f77',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                <CIcon
                  icon={cilCalendar}
                  style={{
                    marginRight: 15,
                  }}
                />
                Date de de creation :
                <label
                  style={{
                    width: 100,
                    'text-align': 'center',
                    border: 'none',
                    'font-size': '1.2em',
                    color: 'BLACK',
                    align: 'right',
                    float: 'right',
                  }}
                  onClick={supprimerfiltrage}
                >
                  X
                </label>
              </CCardHeader>

              <div
                className="table-data__tool-left"
                style={{
                  backgroundColor: 'white',
                  'border-bottom-right-radius': '10px',
                  'border-bottom-left-radius': '10px',
                  'padding-bottom': '15px',
                }}
              >
                <div style={{ paddingLeft: '15px', paddingRight: '10px' }}>
                  <br></br>

                  <label style={{ paddingRight: '20px' }}> De : </label>
                  <input
                    type="date"
                    id="start1"
                    name="dateDebut"
                    min="2010-01-01"
                    max="2022-06-15"
                  />
                  <label style={{ paddingLeft: '20px', paddingRight: '10px' }}> A : </label>
                  <input type="date" id="start2" name="dateFin" min="2010-01-01" max="2022-06-15" />
                  <button
                    type="submit"
                    className="au-btn-filter"
                    style={{
                      height: 'Auto',
                      width: 200,
                      'text-align': 'center',
                      border: 'solid',
                      bordercolor: 'black',
                      'font-size': '1.2em',
                      color: 'BLACK',
                      marginLeft: '75px',
                      align: 'right',
                      float: 'right',
                      marginRight: '20px',
                      'border-width': '1px',
                    }}
                    onClick={handleSubmit}
                  >
                    filtrer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div>
          {filtrer_Datedelogin ? (
            <div name="filtrer1" onChange="">
              <CCardHeader
                style={{
                  marginTop: '15px',
                  'border-top-left-radius': '10px',
                  'border-top-right-radius': '10px',
                  backgroundColor: '#213f77',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                <CIcon
                  icon={cilCalendar}
                  style={{
                    marginRight: 15,
                  }}
                />
                Date de derniere connexion :
                <label
                  style={{
                    width: 100,
                    'text-align': 'center',
                    border: 'none',
                    'font-size': '1.2em',
                    color: 'BLACK',
                    align: 'right',
                    float: 'right',
                  }}
                  onClick={supprimerfiltrage2}
                >
                  X
                </label>
              </CCardHeader>

              <div
                className="table-data__tool-left"
                style={{
                  backgroundColor: 'white',
                  'border-bottom-right-radius': '10px',
                  'border-bottom-left-radius': '10px',
                  'padding-bottom': '15px',
                }}
              >
                <div style={{ paddingLeft: '15px', paddingRight: '10px' }}>
                  <br></br>
                  <label style={{ paddingRight: '20px' }}> De : </label>
                  <input
                    type="date"
                    id="start"
                    name="trip-start"
                    min="2010-01-01"
                    max="2022-06-15"
                  />
                  <label style={{ paddingLeft: '20px', paddingRight: '10px' }}> A : </label>
                  <input
                    type="date"
                    id="start"
                    name="trip-start"
                    min="2010-01-01"
                    max="2022-06-15"
                  />
                  <button
                    className="au-btn-filter"
                    style={{
                      height: 'Auto',
                      width: 200,
                      'text-align': 'center',
                      border: 'solid',
                      bordercolor: 'black',
                      'font-size': '1.2em',
                      color: 'BLACK',
                      marginLeft: '75px',
                      align: 'right',
                      float: 'right',
                      marginRight: '20px',
                      'border-width': '1px',
                    }}
                  >
                    <i
                      className="zmdi zmdi-filter-list"
                      style={{ height: 40, width: 100, 'text-align': 'center' }}
                    ></i>
                    filtrer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <br></br>
        <CCard>
          <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
            <CIcon
              icon={cilPeople}
              style={{
                marginRight: 15,
              }}
            />
            Liste des candidats
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
                  <CTableDataCell className="text-center" onClick={(index) => userProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.nom}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Prénom*/}
                  <CTableDataCell className="text-center" onClick={(index) => userProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.prenom}</strong>
                    </div>
                  </CTableDataCell>
                  {/* genre*/}
                  <CTableDataCell className="text-center" onClick={(index) => userProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.genre}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Email*/}
                  <CTableDataCell className="text-center" onClick={(index) => userProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.email}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Numtell*/}
                  <CTableDataCell className="text-center" onClick={(index) => userProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.numero_de_telephone}</strong>
                    </div>
                  </CTableDataCell>
                  {/* LastLogin*/}
                  <CTableDataCell className="text-center" onClick={(index) => userProfil(item)}>
                    <div className="small text-medium-emphasis">
                      <strong>{item.createdAt}</strong>
                    </div>
                  </CTableDataCell>
                  {/* LastLogin*/}
                  <CTableDataCell className="text-center" onClick={(index) => userProfil(item)}>
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
export default Listeattente
