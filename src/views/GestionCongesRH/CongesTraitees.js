import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { DeleteReclamation, ReclamationsTraitees } from 'src/services/ReclamationService'
import { Link, useNavigate } from 'react-router-dom'
import 'src/views/GestionCongesRH/gestionCongesRH.css'
import { getNonPendingLeaves, ApproveConge, RejectConge } from 'src/services/congesService'

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

const CongesTraitees = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(5)
  const [bool, setBool] = useState(false)

  let navigate = useNavigate()

  function consulterConge(item) {
    navigate('/Gestion_conges/consulterConge', {
      state: { state: item },
    })
  }

  /*getReclamations */
  useEffect(() => {
    getNonPendingLeaves()
      .then((response) => {
        console.log(response.data)
        setPosts(response.data)
      })
      .catch((e) => {})
  }, [bool])

  if (posts.length == 0)
    return (
      <div className="listeConges reclamation">
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
                Congés traités
              </h6>
            </div>
          </div>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>Aucun congés!</div>
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
      <div className="listeConges reclamation">
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
                Reclamations traitées
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
    </CTableRow>
  </CTableHead>
  <CTableBody>
    {currentPosts.map((item, index) => (
      <CTableRow key={index}>
        {/* Type */}
        <CTableDataCell className="text-center">
          <div className="meduim"
                onClick={() => {
                  consulterConge(item)
              }}
         >{item.type}</div>
        </CTableDataCell>
        {/* Requested by */}
        <CTableDataCell className="text-center">
          <div className="meduim"
               onClick={() => {
                  consulterConge(item)
                }}
           >
            {item.requestedBy.nom} {item.requestedBy.prenom}
          </div>
        </CTableDataCell>
        {/* Start Date */}
        <CTableDataCell className="text-center">
          <div className="meduim"
           onClick={() => {
            consulterConge(item)
          }}>{item.startDate}</div>
        </CTableDataCell>
        {/* End Date */}
        <CTableDataCell className="text-center">
          <div className="meduim"  
          onClick={() => {
          consulterConge(item)
        }}>{item.endDate}</div>
        </CTableDataCell>
        {/* Status */}
        <CTableDataCell className="text-center" style={{ textAlign: 'right' }}>
          <div
            className="meduim"
            onClick={() => {
              consulterConge(item)
            }}
            style={{
              backgroundColor:
                item.status === 'APPROVED'
                  ? '#008000' // Dark green for APPROVED
                  : item.status === 'REJECTED'
                  ? '#8B0000' // Dark red for REJECTED
                  : '#D3D3D3', // Light gray for other statuses (no transparency)
              color: item.status === 'APPROVED' || item.status === 'REJECTED' ? 'white' : 'black',
              padding: '5px',
              borderRadius: '5px',
              display: 'inline-block', // Ensures the badge fits its content
              width: 'auto', // Reduces width to fit content
              textAlign: 'center', // Centers text inside the badge
            }}
          >
            {item.status}
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
export default CongesTraitees
