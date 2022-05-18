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
import 'src/views/gestion_organismes_conventionnes/Organisme.css'

import CIcon from '@coreui/icons-react'
import {
  cilBan,
  cilCheckCircle,
  cilList,
  cilDataTransferDown,
  cilTrash,
  cilPencil,
  cilPlus,
  cilIndustry,
} from '@coreui/icons'
import avatar8 from 'src/assets/images/logo1.jpg'
import { uploadfile, getfile } from 'src/services/fileService'

import {
  getdemandes_ins_formations,
  accepterdemande,
  refuserdemande,
} from 'src/services/demandes_inscriptionService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { getcandidats, deleteuser } from 'src/services/gestionutilisateurs'
import {
  deleteorganisme,
  getAllorganismes,
  getpersonnelsByOrganisme,
} from 'src/services/organisme_conventionne'

const Organismes_conventionnes = () => {
  let navigate = useNavigate()
  const [profileimg, setProfileimg] = useState(avatar8)

  function notification_deValidation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet organisme ?',
      showDenyButton: true,
      confirmButtonText: 'valider',
      denyButtonText: `annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteorganisme(id)
          .then((response) => {
            console.log('data', response.data)
          })
          .catch((e) => {})

        Swal.fire('La suppression de ce organsime a réussi!', '', 'success')
        getAllorganismes()
          .then((response) => {
            console.log('data', response)
            response.data.map((item, index) => {
              console.log('alo')
              getfile(item.logo.id)
                .then((response) => {
                  images.push(URL.createObjectURL(response.data))
                  setProfileimg(URL.createObjectURL(response.data))
                  console.log('hello', response.data)
                })
                .catch((e) => {})
              getpersonnelsByOrganisme(item.id)
                .then((response2) => {
                  console.log('hello', response2)
                  nbrPersonnels.push(response2.data.length)
                })
                .catch((e) => {})
            })
            setPosts(response.data)
            console.log('data', response.data)
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }

  function organsimeProfil(organisme) {
    navigate('/gestion_organismes_conventionnes/organismes_conventionnes/organisme_conventionne', {
      state: { Organisme: organisme },
    })
  }

  function Deleteorganisme(id) {
    notification_deValidation(id)
  }
  function Updateorganisme(id) {
    navigate('/gestion_organismes_conventionnes/organismes_conventionnes/updateOrganisme', {
      state: { organisme: id },
    })
  }
  function AjouterOrganisme() {
    navigate(
      '/gestion_organismes_conventionnes/organismes_conventionnes/Ajout_organisme_conventionne',
    )
  }
  const [posts, setPosts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  let [images, setimages] = useState([])
  let [nbrPersonnels, setNbrPersonnels] = useState([])

  useEffect(() => {
    getAllorganismes()
      .then((response) => {
        console.log('data', response)
        response.data.map((item, index) => {
          console.log('alo')
          getfile(item.logo.id)
            .then((response) => {
              images.push(URL.createObjectURL(response.data))
              setProfileimg(URL.createObjectURL(response.data))
              console.log('hello', response.data)
            })
            .catch((e) => {})
          getpersonnelsByOrganisme(item.id)
            .then((response2) => {
              console.log('hello', response2)
              nbrPersonnels.push(response2.data.length)
            })
            .catch((e) => {})
        })
        setPosts(response.data)
        console.log('data', response.data)
      })
      .catch((e) => {})
  }, [])
  console.log(nbrPersonnels)

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
            <button
              className="btnAdd btn-sm mb-0"
              style={{ 'font-size': '18px' }}
              onClick={AjouterOrganisme}
            >
              <CIcon
                icon={cilIndustry}
                customClassName="nav-icon"
                style={{
                  width: 20,
                  height: 20,
                  'margin-right': 5,
                }}
              />
              Ajouter un organisme
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
                      Liste des organismes conventionnés
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
                            ></p>
                          </th>
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
                              {' '}
                              Nom
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
                              E-mail
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
                              Numero de telephone
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
                              Adresse
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
                              Nombre des personnels
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
                              onClick={(index) => organsimeProfil(item)}
                            >
                              <span
                                className="badge badge-sm"
                                style={{ color: 'black', 'font-size': '12px' }}
                              >
                                <CAvatar src={images[index]} size="md" />
                              </span>
                            </td>
                            <td
                              className="align-middle text-center text-sm"
                              onClick={(index) => organsimeProfil(item)}
                            >
                              <span
                                className="badge badge-sm"
                                style={{ color: 'black', 'font-size': '12px' }}
                              >
                                {item.id}
                              </span>
                            </td>
                            <td
                              className="align-middle text-center"
                              onClick={(index) => organsimeProfil(item)}
                            >
                              <span className="text-secondary text-xs font-weight-bold">
                                {item.nom} {item.prenom}
                              </span>
                            </td>
                            <td
                              className="align-middle text-center"
                              onClick={(index) => organsimeProfil(item)}
                            >
                              <span className="text-secondary text-xs font-weight-bold">
                                {item.email}
                              </span>
                            </td>
                            <td
                              className="align-middle text-center"
                              onClick={(index) => organsimeProfil(item)}
                            >
                              <span className="text-secondary text-xs font-weight-bold">
                                {item.numero_de_telephone}
                              </span>
                            </td>
                            <td
                              className="align-middle text-center"
                              onClick={(index) => organsimeProfil(item)}
                            >
                              <span className="text-secondary text-xs font-weight-bold">
                                {item.adresse}
                              </span>
                            </td>
                            <td
                              className="align-middle text-center"
                              onClick={(index) => organsimeProfil(item)}
                            >
                              <span className="text-secondary text-xs font-weight-bold">
                                {nbrPersonnels[index]}
                              </span>
                            </td>{' '}
                            <td className="align-middle text-center">
                              <button
                                style={{
                                  border: 0,
                                  backgroundColor: 'transparent',
                                }}
                                onClick={(index) => Deleteorganisme(item.id)}
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
                                onClick={(index) => Updateorganisme(item.id)}
                              >
                                <CIcon
                                  icon={cilPencil}
                                  customClassName="nav-icon"
                                  style={{
                                    marginTop: 5,
                                    width: 30,
                                    height: 30,
                                    color: 'green',
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
export default Organismes_conventionnes
