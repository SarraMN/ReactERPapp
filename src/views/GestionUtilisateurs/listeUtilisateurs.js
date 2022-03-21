import React, { useEffect, useState } from 'react'

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
import 'src/views/GestionUtilisateurs/liste_attente.css'
import { getusers } from 'src/services/gestionutilisateurs'

import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cilPlus,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cilUser,
  cifPl,
  cifUs,
  cilPeople,
  cilPencil,
  cilTrash,
  cilUserPlus,
  cilUserUnfollow,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const Listeattente = () => {
  let tableuser = []
  getusers()
    .then((response) => {
      for (var i of response.data) {
        tableuser.push(i)
      }

      console.log('mama', response.data)
    })
    .catch((e) => {})
  console.log('ya rab', tableuser)
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(tableuser)
    }

    fetchPosts()
  }, [])

  console.log('heeehi', posts)
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
      <div className="table-data__tool">
        <div className="table-data__tool-left">
          <div className="rs-select2--light rs-select2--md">
            <select
              className="js-select2"
              name="property"
              style={{
                height: 40,
                width: 150,
                'text-align': 'center',
                border: 'none',
                'font-size': '1.2em',
                color: '#888888',
              }}
            >
              <option
                selected="selected"
                style={{
                  height: 50,
                }}
              >
                Role
              </option>
              <option value="">Formateurs</option>
              <option value="">Candidats</option>
            </select>
          </div>
          <div className="rs-select2--light rs-select2--sm">
            <select
              className="js-select2"
              name="time"
              style={{
                height: 40,
                width: 110,
                'text-align': 'center',
                border: 'none',
                'font-size': '1.2em',
                color: '#888888',
              }}
            >
              <option selected="selected">Genre</option>
              <option value="">Homme</option>
              <option value="">Femme</option>
            </select>
          </div>

          <button
            className="au-btn-filter"
            style={{
              height: 40,
              width: 100,
              'text-align': 'center',
              border: 'none',
              'font-size': '1.2em',
              color: 'BLACK',
            }}
          >
            <i
              className="zmdi zmdi-filter-list"
              style={{ height: 40, width: 100, 'text-align': 'center' }}
            ></i>
            filters
          </button>
        </div>
        <div className="table-data__tool-right">
          <button
            className="au-btn au-btn-icon au-btn--green au-btn--small"
            style={{ width: 200, height: 50, backgroundColor: '#213f77', color: 'white' }}
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
            <i className="zmdi zmdi-plus"></i> Ajouter Formation
          </button>
        </div>
      </div>
      <CCard>
        <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
          Liste d{"'"}attente
        </CCardHeader>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>Nom</CTableHeaderCell>
              <CTableHeaderCell>Prénom</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Role</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Genre</CTableHeaderCell>
              <CTableHeaderCell>E-mail</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Etat civil</CTableHeaderCell>
              <CTableHeaderCell>Date Inscription</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentPosts.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src="#" status="#" />
                </CTableDataCell>

                {/* Nom*/}
                <CTableDataCell>
                  <div>{item.nom}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.nom ? 'New' : 'Recurring'}</span> | Registered: {item.nom}
                  </div>
                </CTableDataCell>
                {/* Prénom*/}
                <CTableDataCell>
                  <div>{item.prenom}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.prenom ? 'New' : 'Recurring'}</span> | Registered: {item.prenom}
                  </div>
                </CTableDataCell>
                {/* Role*/}
                <CTableDataCell>
                  <div>{item.prenom}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.authority[0].authority ? 'New' : 'Recurring'}</span>
                  </div>
                </CTableDataCell>
                {/* CIN*/}
                <CTableDataCell>
                  <div>{item.prenom}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.numero_de_telephone ? 'New' : 'Recurring'}</span>
                  </div>
                </CTableDataCell>
                {/* Email*/}
                <CTableDataCell>
                  <div>{item.prenom}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.email ? 'New' : 'Recurring'}</span>
                  </div>
                </CTableDataCell>
                {/* Date Inscription*/}
                <CTableDataCell>
                  <div className="small text-medium-emphasis">Last login</div>
                  <strong>{item.createdAt}</strong>
                </CTableDataCell>
                {/* Date Inscription*/}
                <CTableDataCell>
                  <div className="small text-medium-emphasis">Last login</div>
                  <strong>{item.lastLogin}</strong>
                </CTableDataCell>
                {/* Approuver*/}
                <CTableDataCell>
                  <button
                    style={{
                      border: 0,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <CIcon
                      icon={cilUser}
                      customClassName="nav-icon"
                      style={{
                        marginTop: 5,
                        width: 30,
                        height: 30,
                        color: '#213f77',
                        marginLeft: 7,
                        marginRight: 7,
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
                if (PreviewsPage != 0) setCurrentPage(PreviewsPage)
              }}
            >
              <CPaginationItem
                aria-label="Previous"
                disabled
                style={{ marginleft: 300, backgroundcolor: 'red' }}
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
            </a>
            {pageNumbers.map((number) => (
              <a key={number} onClick={() => paginate(number)}>
                <CPaginationItem>{number}</CPaginationItem>
              </a>
            ))}
            <a
              onClick={() => {
                setCurrentPage(NextPage)
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
}
export default Listeattente
