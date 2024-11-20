import React, { useEffect, useState } from 'react'
import 'src/views/GestionFormation/listeFormation.css'
import Swal from 'sweetalert2'
import { getAllNotTraitedTimeSheets, filterLogsByCriteria, approveTimeSheet, rejectTimeSheet } from 'src/services/logsService';

import { fetchUserData } from 'src/services/UserService'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import 'src/views/Gestion_logs/log.css'
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
import CIcon from '@coreui/icons-react'
import { cilEnvelopeLetter, cilList } from '@coreui/icons'
import 'src/views/GestionReclamation/gestionReclamation.css'

const ListAllLogs = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(5)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [bool, setBool] = useState(false)

  let navigate = useNavigate()

  function voirJournauxTraites() {
    
    navigate('/Gestion_logs/ListLogsTraitees')
    
  }
  function ConsulterLog(item) {
    navigate('/Gestion_logs/ConsulterLog', {
      state: { state: item },
    })
  }

  function accepterReclamation(id) {
    Swal.fire({
      title: 'Souhaitez-vous accepter ce log ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Accepter',
      denyButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        // Fetch user data to get approver's ID
        fetchUserData()
          .then((response2) => {
            const approverId = response2.data.id;
  
            // Call the approve API
            approveTimeSheet(id, approverId)
              .then((response) => {
                console.log('Timesheet approved:', response.data);
  
                // Refresh the list of unprocessed timesheets
                return getAllNotTraitedTimeSheets();
              })
              .then((response) => {
                console.log('Updated timesheets:', response.data);
                setPosts(response.data); // Update the posts state
                Swal.fire('Le log a été accepté avec succès!', '', 'success');
              })
              .catch((error) => {
                console.error('Error during approval or list refresh:', error);
                Swal.fire('Une erreur est survenue.', '', 'error');
              });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            Swal.fire('Impossible de récupérer les informations de l\'utilisateur.', '', 'error');
          });
      } else if (result.isDenied) {
        Swal.fire('Aucune modification effectuée.', '', 'info');
      }
    });
  }
  
  

  function refuserReclamation(id) {
    Swal.fire({
      title: 'Souhaitez-vous Refuser ce logs ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'refuser',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetchUserData()
    .then((response2) => {
        rejectTimeSheet(id,response2.data.id)
          .then((response) => {
            console.log('data', response.data)
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})})
          .catch((e) => {})

        Swal.fire('cette actualité a été supprimé avec succes!', '', 'success')
        getAllNotTraitedTimeSheets()
        .then((response) => {
          console.log(response.data)
          setPosts(response.data)
        })
        .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Aucune modification ', '', 'info')
      }
    })
  }
  /*getReclamations */
  useEffect(() => {
    getAllNotTraitedTimeSheets()
      .then((response) => {
        console.log(response.data)
        setPosts(response.data)
      })
      .catch((e) => {})
  }, [])
 
  if (posts.length === 0)
    return (
      <div className="listeFormation reclamation">
        <div style={{ marginBottom: '70px' }}>
          <div className="col-12 text-end" style={{ height: '15px', marginBottom: '19px' }}>
            <button className="btnAdd btn-sm mb-0" onClick={voirJournauxTraites}>
              <CIcon
                icon={cilEnvelopeLetter}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              voir les journaux traités
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
                les journaux non traités

              </h6>
            </div>
          </div>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>Aucun journal!</div>
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
        <div style={{ marginBottom: '70px' }}>
          <div className="col-12 text-end" style={{ height: '15px', marginBottom: '19px' }}>
            <button className="btnAdd btn-sm mb-0" onClick={voirJournauxTraites}>
              <CIcon
                icon={cilList}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              voir les journaux traités
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
                Journaux non traités
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
                        ConsulterLog(item)
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
                        ConsulterLog(item)
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
                        ConsulterLog(item)
                      }}
                    >
                      {item.date}
                    </div>
                  </CTableDataCell>
                  {/* Objet*/}
                  <CTableDataCell className="text-center">
                  <div
                      className="meduim "
                      onClick={(id) => {
                        ConsulterLog(item)
                      }}
                    >
                      {item.hoursWorked} heures
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                  <div
                      className="meduim "
                      onClick={(id) => {
                        ConsulterLog(item)
                      }}
                    >
                      {item.taskTitle}
                    </div>
                  </CTableDataCell>             
                  {/* Action*/}
                  <CTableDataCell className="text-center">
                        <div>
                        {item.state == "PENDING" ? (
                            <>
                                <button
                                className="Button_Accepter"
                                onClick={() => accepterReclamation(item.id)}
                                >
                                Accepter
                                </button>
                                <button
                                className="Button_Refuser"
                                onClick={() => refuserReclamation(item.id)}
                                >
                                Refuser
                                </button>
                            </>
                            ) : (
                            
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
                            
                            )}
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
export default ListAllLogs
