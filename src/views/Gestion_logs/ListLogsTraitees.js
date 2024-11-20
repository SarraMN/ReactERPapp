import React, { useEffect, useState } from 'react'
import 'src/views/GestionFormation/listeFormation.css'
import { getAllTraitedTimeSheets } from 'src/services/logsService';

import { useNavigate } from 'react-router-dom'
import 'src/views/GestionReclamation/gestionReclamation.css'

import 'src/views/Reclamation/Reclamation.css'
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

const LogsTraitees = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(5)
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

  /*getReclamations */
  useEffect(() => {
    getAllTraitedTimeSheets()
      .then((response) => {
        console.log(response.data)
        setPosts(response.data)
      })
      .catch((e) => {})
  }, [bool])

  if (posts.length == 0)
    return (
      <div className="listeFormation reclamation">
        <CCard style={{ marginTop: '90px' }}>
          <div
            className="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
            style={{ marginBottom: '5px' }}
          >
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                les journaux traités
              </h6>
            </div>
          </div>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>Aucune réclamation!</div>
          </div>
        </CCard>
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
    return (
      <div className="listeFormation reclamation">
        <CCard style={{ marginTop: '90px' }}>
          <div
            className="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
            style={{ marginBottom: '5px' }}
          >
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                les journaux traités
              </h6>
            </div>
          </div>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Employe
                </CTableHeaderCell>
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
                Description
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                Statut 
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
                      {item.employee.prenom} {item.employee.nom}
                    </div>
                  </CTableDataCell>
                  {/* Référence*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={(id) => {
                        // handleShowInfo(item.id)
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
                        // handleShowInfo(item.id)
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
                        // handleShowInfo(item.id)
                      }}
                    >
                      {item.hoursWorked} heures
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim"
                      onClick={(id) => {
                        // handleShowInfo(item.id)
                      }}
                    >
                      {item.taskTitle}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim"
                      onClick={(id) => {
                        // handleShowInfo(item.id)
                      }}
                    >
                      {item.description}
                    </div>
                  </CTableDataCell>
                  {/* Action*/}
                  <CTableDataCell className="text-center">
                        <div> 
                            <span>
                            {item.state == "APPROVED" ? (
                            <>
                               <span className="state_Accepter"> {item.state}</span>
                            </>
                            ) : (
                            <span className="state_Refuser">{item.state}           
                            </span>
                            )}
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
      </div>
    )
  }
}
export default LogsTraitees
