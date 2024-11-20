import React, { useEffect, useState } from 'react'
import { getPendingLeaves, ApproveConge, RejectConge } from 'src/services/congesService'
import { fetchUserData } from 'src/services/UserService'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'src/views/Gestion_conges/Leave.css'
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
import 'src/views/GestionCongesRH/gestionCongesRH.css'

const CongesAttentes = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(5)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [bool, setBool] = useState(false)
  const [id, setId] = useState('')

  let navigate = useNavigate()
  //popup
  const [showAjt, setShowAjt] = useState(false)
  const [showMdf, setShowMdf] = useState(false)
  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => {
    setShowAjt(false)
  }

  function consulterConge(item) {
    navigate('/Gestion_conges/consulterConge', {
      state: { state: item },
    })
  }

  function approveLeave(id) {
    Swal.fire({
      title: 'Souhaitez-vous accepter ce Congé ?',
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
            ApproveConge(id, approverId)
              .then((response) => {
                console.log('Congé approuvé:', response.data);
  
                // Refresh the list of unprocessed leaves
                return getPendingLeaves();
              })
              .then((response) => {
                console.log('Congé updated:', response.data);
                setPosts(response.data); // Update the posts state
                Swal.fire('Le congé a été accepté avec succès!', '', 'success');
              })
              .catch((error) => {
                console.error('Error en approuvant le congé:', error);
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
  
  

  function rejectLeave(id) {
    Swal.fire({
      title: 'Souhaitez-vous refuser ce congé ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'refuser',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetchUserData()
       .then((response2) => {
        RejectConge(id,response2.data.id)
          .then((response) => {
            console.log('data', response.data)
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})})
          .catch((e) => {})

        Swal.fire('ce congé a été rejeter avec succes!', '', 'success')
        getPendingLeaves()
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
    getPendingLeaves()
      .then((response) => {
        console.log(response.data)
        setPosts(response.data)
      })
      .catch((e) => {})
  }, [showAjt, bool])
  function voirhistorique() {
    navigate('/GestionConges/CongesAttentes/CongesTraitees')
  }
  if (posts.length === 0)
    return (
      <div className="listeFormation reclamation">
        <div style={{ marginBottom: '70px' }}>
          <div className="col-12 text-end" style={{ height: '15px', marginBottom: '19px' }}>
            <button className="btnAdd btn-sm mb-0" onClick={voirhistorique}>
              <CIcon
                icon={cilEnvelopeLetter}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              Congés traités
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
                Congés non traités
              </h6>
            </div>
          </div>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>Aucun congé à traiter!</div>
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
            <button className="btnAdd btn-sm mb-0" onClick={voirhistorique}>
              <CIcon
                icon={cilList}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              Congés traités
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
                Congés non traités
              </h6>
            </div>
          </div>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Type
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Demander par
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Date début
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Date fin
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Statut
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPosts.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* Type*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={() => {
                         consulterConge(item)
                      }}
                    >
                      {item.type} 
                    </div>
                  </CTableDataCell>
                  {/* Request by*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={(id) => {
                        // handleShowInfo(item.id)
                      }}
                    >
                      {item.requestedBy.nom} {item.requestedBy.prenom}
                    </div>
                  </CTableDataCell>
                  {/* Date debut*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={() => {
                        consulterConge(item)
                      }}
                    >
                      {item.startDate}
                    </div>
                  </CTableDataCell>
                  {/* end date*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim "
                      onClick={() => {
                        consulterConge(item)
                      }}
                    >
                      {item.endDate}
                    </div>
                  </CTableDataCell>
                  {/* status*/}
                  <CTableDataCell className="text-center">
                    <div
                      className="meduim"
                      onClick={() => {
                        consulterConge(item)
                      }}
                    >
                      {item.status}
                    </div>
                  </CTableDataCell>
                  {/* Action*/}
                  <CTableDataCell className="text-center">
                  <div>
                        {item.status == "PENDING" ? (
                            <>
                                <button
                                className="Button_Accepter"
                                onClick={() => approveLeave(item.id)}
                                >
                                Accepter
                                </button>
                                <button
                                className="Button_Refuser"
                                onClick={() => rejectLeave(item.id)}
                                >
                                Refuser
                                </button>
                            </>
                            ) : (
                            
                            <span>
                            {item.status == "APPROVED" ? (
                            <>
                               <span className="state_Accepter"> {item.state}</span>
                            </>
                            ) : (
                            <span className="state_Refuser">{item.state}</span>
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
export default CongesAttentes
