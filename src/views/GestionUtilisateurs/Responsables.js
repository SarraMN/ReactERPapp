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
import { deleteuser, getcandidats, getformateurs } from 'src/services/gestionutilisateurs'
import { uploadfile, getfile } from 'src/services/fileService'

import 'src/views/gestion_demandes/demandes_inscriptions.css'
import ReactImg from 'src/images/teacher-2.jpg'

import CIcon from '@coreui/icons-react'
import {
  cilBan,
  cilCheckCircle,
  cilList,
  cilEnvelopeClosed,
  cilPhone,
  cilTrash,
} from '@coreui/icons'
import {
  getdemandes_ins_formations,
  accepterdemande,
  refuserdemande,
} from 'src/services/demandes_inscriptionService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Demandes_inscriptions = () => {
  let navigate = useNavigate()
  const [profileimg, setProfileimg] = useState(ReactImg)
  function Deleteuser(id) {
    notification_deValidation(id)
  }
  function notification_deValidation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet responsable ?',
      showDenyButton: true,
      confirmButtonText: 'valider',
      denyButtonText: `annuler`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteuser(id)
          .then((response) => {
            console.log('data', response.data)
          })
          .catch((e) => {})

        Swal.fire('La suppression de ce compte a réussi!', '', 'success')
        getformateurs()
          .then((response) => {
            console.log(response.data)
            response.data.map((item, index) =>
              getfile(item.image.id)
                .then((response) => {
                  images.push(URL.createObjectURL(response.data))
                  setProfileimg(URL.createObjectURL(response.data))
                })
                .catch((e) => {}),
            )
            setPosts(response.data)
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  function ResponsebleProfil(user) {
    navigate('/GestionUtilisateurs/Responsables/responsable', {
      state: { utilisateur: user },
    })
  }
  function Ajoutresponsable() {
    navigate('/GestionUtilisateurs/Responsables/Ajoutresponsable')
  }
  let [images, setimages] = useState([])
  const [posts, setPosts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  useEffect(() => {
    getformateurs()
      .then((response) => {
        console.log(response.data)
        response.data.map((item, index) =>
          getfile(item.image.id)
            .then((response) => {
              images.push(URL.createObjectURL(response.data))
              setProfileimg(URL.createObjectURL(response.data))
            })
            .catch((e) => {}),
        )
        setPosts(response.data)
      })
      .catch((e) => {})
  }, [])
  console.log('hello', posts[0])

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
      <div>
        <div>
          <div className="col-12 text-end" style={{ height: '15px', marginBottom: '19px' }}>
            <button className="btnAdd btn-sm mb-0" onClick={Ajoutresponsable}>
              <i
                className="flex fa fa-user-plus"
                aria-hidden="true"
                style={{ marginRight: 10 }}
              ></i>
              Ajouter Responsable
            </button>
          </div>
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div
                  className="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                  style={{ 'background-color': 'white' }}
                >
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6
                      className="text-white ps-3"
                      style={{ 'font-weight': 'bold', 'font-size': '22px' }}
                    >
                      Les responsables
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2" style={{ 'background-color': 'white' }}>
                  <div className="table-responsive p-0" style={{ 'background-color': 'white' }}>
                    <section className="" style={{ 'background-color': 'white' }}>
                      <div className="container" style={{ 'background-color': 'white' }}>
                        <div className="row" style={{ 'background-color': 'white' }}>
                          {currentPosts.map((item, index) => (
                            <div
                              className="col-md-6 col-lg-3  d-flex align-items-stretch"
                              key={index}
                            >
                              <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                  <div
                                    onClick={(index) => ResponsebleProfil(item)}
                                    className="img align-self-stretch"
                                    style={{
                                      backgroundImage: `url(${images[index]})`,
                                    }}
                                  ></div>
                                </div>
                                <div className="text pt-3">
                                  <h3>
                                    <a
                                      href="instructor-details.html"
                                      onClick={(index) => ResponsebleProfil(item)}
                                    >
                                      {item.nom} {item.prenom}
                                    </a>
                                  </h3>
                                  <span style={{ color: '#1D6BDF', 'font-size': '13px' }}>
                                    Date de naissance: {item.date_de_naissance}
                                  </span>{' '}
                                  <div className="faded">
                                    <p style={{ 'font-size': '14px', 'margin-top': '5px' }}>
                                      <CIcon
                                        icon={cilEnvelopeClosed}
                                        customClassName="nav-icon"
                                        style={{
                                          width: 15,
                                          height: 15,
                                          marginRight: 2,
                                        }}
                                      />
                                      {item.email}
                                      <br></br>
                                      <CIcon
                                        icon={cilPhone}
                                        customClassName="nav-icon"
                                        style={{
                                          width: 15,
                                          height: 15,
                                        }}
                                      />
                                      {item.numero_de_telephone}
                                    </p>

                                    <ul className="ftco-social text-center">
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
                                            width: 60,
                                            height: 60,
                                            color: '#DC1E1E',
                                          }}
                                        />
                                      </button>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
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
  } else return <div>un probleme de connexion avec le serveur </div>
}
export default Demandes_inscriptions
