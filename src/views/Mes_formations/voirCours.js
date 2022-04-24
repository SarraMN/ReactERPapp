import React, { useEffect, useState } from 'react'
import 'src/views/Consulter_formation/formation.css'
import photo1 from 'src/assets/images/Software-development.jpg'
import { getFormations, getformationbycategorie } from 'src/services/FormationService'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { uploadfile, getfile } from 'src/services/fileService'
import ReactImg1 from 'src/images/banner_1.jpg'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import 'src/views/Mes_formations/voisCours.css'
import { fetchUserData, GetformationsCandidat, getUserById } from 'src/services/UserService'
import { CoursByIdFormation } from 'src/services/CoursService'
import CIcon from '@coreui/icons-react'
import { cilDataTransferDown, cilExternalLink } from '@coreui/icons'
import { Tab, Tabs } from 'react-bootstrap'
import Swal from 'sweetalert2'
import avatar8 from './../../assets/images/profile_homme.png'
import {
  CAvatar,
  CCard,
  CCardHeader,
  CCol,
  CDropdownToggle,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import Commentaires from 'src/views/Mes_formations/commentaires'

import { ajouterCommentaire, getAllcommentaire } from 'src/services/commentaireService'
const VoirCours = (props) => {
  const [validated, setValidated] = useState(false)

  let [images, setimages] = useState()
  let [candidat, setcandidat] = useState({})
  let [bool2, setbool2] = useState(true)
  const [ListeCommentaires, setListeCommentaires] = useState([])
  const [photopropreitaire, setphotopropreitaire] = useState([])
  const [values2, setValues2] = useState({
    id: '',
  })

  useEffect(() => {
    fetchUserData().then((response) => {
      setcandidat(response.data)
      if (response.data.idimage === 0) {
        setimages(avatar8)
      } else {
        getfile(response.data.idimage)
          .then((response) => {
            setimages(URL.createObjectURL(response.data))
          })
          .catch((e) => {})
      }
      setbool2(false)
    })
  }, [bool2])
  const [key, setKey] = useState('home')

  const location = useLocation()
  let [cours, setcours] = useState([])
  let [bool, setbool] = useState(false)
  let [bool3, setbool3] = useState(false)
  const [idDocuemnt, setidDocuemnt] = useState()
  const [IDcours, setIDcours] = useState(0)
  const [IDcours2, setIDcours2] = useState(0)
  const [numCours, setnumCours] = useState()
  const [NomCours, setNomCours] = useState()
  const [test, setTest] = useState(false)
  const [Description, setDescription] = useState()
  const [Objectif, setObjectif] = useState()
  useEffect(() => {
    CoursByIdFormation(location.state)
      .then((response) => {
        setidDocuemnt(response.data[0].document.id)
        setcours(response.data)
        setIDcours2(response.data[0].id)
        setnumCours(1)
        setNomCours(response.data[0].titre)
        setDescription(response.data[0].description)
        setObjectif(response.data[0].objectif)
      })
      .catch((e) => {})
  }, [bool3, location.state])

  useEffect(() => {
    setIDcours(IDcours2)
  }, [IDcours2])

  const [logo, setlogo] = useState('')
  useEffect(() => {
    getfile(idDocuemnt)
      .then((response) => {
        setbool(true)
        setlogo(URL.createObjectURL(response.data))
      })
      .catch((e) => {})
  }, [bool, idDocuemnt])

  function VoirCoursById(item, index) {
    setnumCours(index + 1)
    setidDocuemnt(item.document.id)
    setNomCours(item.titre)
    setDescription(item.description)
    setObjectif(item.objectif)
    setIDcours(item.id)
  }
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet)
  }

  function changePageBack() {
    changePage(-1)
  }

  function changePageNext() {
    changePage(+1)
  }
  const downloadContract = () => {
    let httpClient = new XMLHttpRequest()
    httpClient.open('get', logo, true)
    httpClient.responseType = 'blob'
    httpClient.onload = function () {
      const file = new Blob([httpClient.response], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = fileURL
      link.download = 'cours.pdf'
      link.click()
      URL.revokeObjectURL(fileURL)
    }
    httpClient.send()
  }

  const downloadContract2 = () => {
    var oReq = new XMLHttpRequest()

    oReq.open('GET', logo, true)

    oReq.responseType = 'blob'

    oReq.onload = function () {
      const file = new Blob([oReq.response], { type: 'application/pdf' })

      const fileURL = URL.createObjectURL(file)

      window.open(fileURL, '_blank')
    }

    oReq.send()
  }
  const [commentaire, setcommentaire] = useState('')
  const [values, setValues] = useState({
    commentaire: '',
    commentairePrincipale: null,
    datePublication: '',
    proprietaire: {
      id: '',
      authority: {},
    },
    cours: {
      id: '',
    },
  })
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Le commentaire ne peut pas etre vide doivent être remplis',
    })
  }
  const handleSubmit2 = (event) => {
    if (commentaire === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      values.commentaire = commentaire
      fetchUserData()
        .then((response) => {
          getUserById(response.data.id).then((response) => {
            values.proprietaire.id = response.data.id
            values.proprietaire.authority = response.data.authority
            values.cours.id = IDcours
            ajouterCommentaire(values).then((response3) => {
              if (response3.status === 200) {
                console.log('avec succée')
                setcommentaire('')
                setValidated(false)
                setIDcours2(IDcours)
                setIDcours(IDcours2)
                setTest(true)
                document.getElementById('alerte').style.display = 'block'
              } else if (response3.status === 500) {
                console.log('failure')
              }
            })
          })
        })
        .catch((e) => {})
    }
  }
  const closeAlerte = () => {
    document.getElementById('alerte').style.display = 'none'
  }
  const [bool5, setbool5] = useState(true)

  return (
    <div>
      <CCard>
        <div style={{ marginTop: '50px', marginLeft: '20px' }}>
          <div>
            <div>
              <div className="row">
                <div className="col-lg-8">
                  <div>
                    <h3>
                      Cours N° {numCours}: {NomCours}
                    </h3>

                    <div>
                      <div
                        className="col-12 text-end"
                        style={{ height: '15px', marginBottom: '39px' }}
                      >
                        <button
                          onClick={() => downloadContract()}
                          className="btn btn-outline-primary btn-sm mb-0"
                          style={{
                            'font-size': '18px',
                            'border-color': '#213f77',
                            marginRight: 10,
                          }}
                        >
                          <CIcon
                            icon={cilDataTransferDown}
                            customClassName="nav-icon"
                            style={{
                              width: 20,
                              height: 20,
                              'margin-right': 5,
                            }}
                          />
                          Telecharger
                        </button>
                        <button
                          onClick={() => downloadContract2()}
                          className="btn btn-outline-primary btn-sm mb-0"
                          style={{
                            'font-size': '18px',
                            'border-color': '#213f77',
                            marginLeft: '10',
                            marginRight: '20',
                          }}
                        >
                          <CIcon
                            icon={cilExternalLink}
                            customClassName="nav-icon"
                            style={{
                              width: 20,
                              height: 20,
                              'margin-right': 5,
                            }}
                          />
                          ouvrir dans une nouvelle page
                        </button>
                      </div>

                      <header className="App-header" style={{ align: 'center', float: 'center' }}>
                        <Document file={logo} onLoadSuccess={onDocumentLoadSuccess}>
                          <Page height="500" width="750" pageNumber={pageNumber} />
                        </Document>
                        <div
                          style={{
                            display: 'flex',
                            'align-items': 'center',
                            'justify-content': 'center',
                          }}
                        >
                          <p>
                            {' '}
                            Page {pageNumber}/{numPages}
                          </p>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            'align-items': 'center',
                            'justify-content': 'center',
                          }}
                        >
                          <br></br>
                          <br></br>
                          <br></br>
                          {pageNumber > 1 && pageNumber == numPages && (
                            <button
                              className="fa fa-hand-o-left"
                              onClick={changePageBack}
                              style={{
                                'border-color': '#0a0a23',
                                color: '#0a0a23',
                                'border-radius': '10px',
                                'min-height': '30px',
                                width: '210px',
                              }}
                            >
                              <span style={{ marginLeft: 5 }}>Previous Page</span>
                            </button>
                          )}
                          {pageNumber < numPages && pageNumber == 1 && (
                            <button
                              className="fa fa-hand-o-right"
                              onClick={changePageNext}
                              style={{
                                'border-color': '#0a0a23',
                                color: '#0a0a23',
                                'border-radius': '10px',
                                'min-height': '30px',
                                width: '200px',
                              }}
                            >
                              <span style={{ marginLeft: 5 }}>Next Page</span>
                            </button>
                          )}
                          {pageNumber > 1 && pageNumber < numPages && (
                            <div>
                              <button
                                className="fa fa-hand-o-left"
                                onClick={changePageBack}
                                style={{
                                  'border-color': '#0a0a23',
                                  color: '#0a0a23',
                                  'border-radius': '10px',
                                  'min-height': '30px',
                                  width: '200px',
                                  marginRight: '5px',
                                }}
                              >
                                <span style={{ marginLeft: 5 }}>Previous Page</span>
                              </button>
                              <button
                                className="fa fa-hand-o-right"
                                onClick={changePageNext}
                                style={{
                                  'border-color': '#0a0a23',
                                  color: '#0a0a23',
                                  'border-radius': '10px',
                                  'min-height': '30px',
                                  width: '200px',
                                }}
                              >
                                <span style={{ marginLeft: 5 }}>Next Page</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </header>
                    </div>
                  </div>{' '}
                </div>
                <div className="col-lg-4">
                  <div className="sidebarcategorie" style={{ marginTop: '90px' }}>
                    <div className="sidebar_section">
                      <div className="sidebar_section_title">Cours Disponibles :</div>
                      <div className="sidebar_categories">
                        <ul>
                          {cours.map((item, index) => (
                            <li key={index}>
                              <a href="#" onClick={() => VoirCoursById(item, index)}>
                                {' '}
                                Cours N°{index + 1} :{item.titre}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*     <div className="col-lg-12" style={{ marginBottom: '100px' }}>
              <div className="product__details__tab">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                  style={{
                    'font-size': '23px',
                    'border-color': '#213f77',
                    color: 'red',
                    paddingRight: '50px',
                    border: 'none',
                  }}
                >
                  <Tab eventKey="home" title="Description">
                    <p style={{ 'word-wrap': 'break-word' }}> {Description}</p>
                  </Tab>
                  <Tab eventKey="profile" title="Profile" className="fa fa-hand-o-left">
                    {Objectif}
                  </Tab>
                  <Tab eventKey="Question" title="Question">
                    <p>erhgerlthnrhyn</p>
                  </Tab>
                </Tabs>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </CCard>
      <div style={{ marginTop: '15px' }}>
        {IDcours === 0 ? <div></div> : <Commentaires idcours={IDcours} test={test}></Commentaires>}
      </div>
      <CCard>
        <div>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            style={{ paddingLeft: 15, paddingRight: 20, paddingTop: 15, paddingBottom: 15 }}
          >
            <CCol md={1}>
              <div className="d-flex px-2 py-1">
                <div style={{ float: 'right', align: 'right' }}>
                  {candidat.idimage !== 0 ? (
                    <img
                      src={images}
                      size="md"
                      style={{ width: '80px', height: '80px', float: 'right', align: 'right' }}
                    />
                  ) : (
                    <CAvatar src={avatar8} size="md" />
                  )}
                </div>
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ marginLeft: '10px' }}
                ></div>
              </div>
            </CCol>
            <CCol md={11}>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                rows="3"
                required
                style={{ width: '100%', 'max-width': '100%' }}
                value={commentaire}
                onChange={(e) => {
                  setcommentaire(e.target.value)
                }}
                minLength="50"
                placeholder="écrivez un commentaire"
              ></CFormTextarea>
              <CFormFeedback invalid>Commentaire est requis</CFormFeedback>
              <div
                className="alert alert-success"
                role="alert"
                id="alerte"
                style={{ display: 'none', marginTop: '5px' }}
              >
                Votre commentaire est ajouté avec succès{' '}
                <button
                  onClick={closeAlerte}
                  style={{ float: 'right', align: 'right' }}
                  className="btn-close"
                  type="button"
                  data-coreui-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </CCol>

            <CCol xs={12} style={{ marginTop: '50px' }}>
              <button
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  color: '#213f77',
                  borderColor: '#213f77',
                  width: '120px',
                  height: '40px',
                  'font-weight': 'bold',
                }}
                type="button"
                onClick={handleSubmit2}
              >
                Ajouter
              </button>
            </CCol>
          </CForm>
        </div>
      </CCard>
    </div>
  )
}
export default VoirCours
