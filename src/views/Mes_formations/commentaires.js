import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import { useLocation } from 'react-router-dom'
import { fetchUserData, GetformationsCandidat, getUserById } from 'src/services/UserService'
import { getfile } from 'src/services/fileService'
import avatar8 from './../../assets/images/profile_homme.png'
import {
  CAvatar,
  CCard,
  CCol,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import {
  deletecommentaire,
  getAllcommentaire,
  updatecommentaire,
} from 'src/services/commentaireService'
import { propTypes } from 'react-bootstrap/esm/Image'
import { getCoursById } from 'src/services/CoursService'
import Swal from 'sweetalert2'
import { Accordion, Modal, Button, Nav } from 'react-bootstrap'

const Commentaires = (props) => {
  console.log('hehehehheeh', props.test)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const [ListeCommentaires, setListeCommentaires] = useState([])
  const [commentaireModifie, setcommentaireModifie] = useState('')
  const [ListeCommentaires2, setListeCommentaires2] = useState([])
  const [ListeCommentaires3, setListeCommentaires3] = useState([])
  const [ListeCommentaires4, setListeCommentaires4] = useState([])
  const [photopropreitaire, setphotopropreitaire] = useState([])
  const [photopropreitaire2, setphotopropreitaire2] = useState([])
  const [bool, setbool] = useState(false)
  const [voirplus1, setvoirplus1] = useState(false)
  const [idcandidat, setidcandidat] = useState(0)

  useEffect(() => {
    console.log('jiyyt commentaires', props.idcours)
    fetchUserData().then((response) => {
      setidcandidat(response.data.id)
    })
  }, [])
  useEffect(() => {
    setvoirplus1(false)
    getAllcommentaire(props.idcours)
      .then((response) => {
        setListeCommentaires(response.data)
        if (response.data.length > 4) {
          console.log('true')
          setvoirplus1(true)
        }

        response.data.map((item, index) => {
          if (index < 4) {
            console.log('ena jiyyt')
            ListeCommentaires4.push(item)
          }
          if (item.proprietaire.image === null) {
            photopropreitaire2.push(avatar8)
          } else {
            getfile(item.proprietaire.image.id)
              .then((response) => {
                setbool(true)
                photopropreitaire2.push(URL.createObjectURL(response.data))
              })
              .catch((e) => {})
          }
        })
        setListeCommentaires2(ListeCommentaires4)
        setListeCommentaires3(ListeCommentaires4)
        setphotopropreitaire(photopropreitaire2.reverse())
        console.log('kifssh al tsawer', photopropreitaire2)
        setListeCommentaires4([])
        setphotopropreitaire2([])
      })
      .catch((e) => {})
  }, [props.idcours, bool, props.test])
  console.log('true', voirplus1)
  console.log('images', photopropreitaire)

  const voirplus = () => {
    setListeCommentaires2(ListeCommentaires)
    document.getElementById('voirmoins').style.display = 'block'
    document.getElementById('voirplus').style.display = 'none'
  }
  const voirmoins = () => {
    setListeCommentaires2(ListeCommentaires3)
    document.getElementById('voirmoins').style.display = 'none'
    document.getElementById('voirplus').style.display = 'block'
  }
  console.log(' ach andi ', ListeCommentaires2)
  function supprimercommentaire(e) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet commentaire ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      if (result.isConfirmed) {
        deletecommentaire(e)
          .then((response) => {})
          .catch((e) => {})

        Swal.fire('cet commentaire a été supprimé avec succes!', '', 'success')
        getAllcommentaire(props.idcours)
          .then((response) => {
            console.log('zoookkkk', response.data)
            setListeCommentaires(response.data)
            if (response.data.length > 4) {
              console.log('true')
              setvoirplus1(true)
            }

            response.data.map((item, index) => {
              if (index < 4) {
                console.log('ena jiyyt')
                ListeCommentaires4.push(item)
              }
              if (item.proprietaire.image === null) {
                photopropreitaire2.push(avatar8)
              } else {
                getfile(item.proprietaire.image.id)
                  .then((response) => {
                    photopropreitaire2.push(URL.createObjectURL(response.data))
                  })
                  .catch((e) => {})
              }
            })
            setListeCommentaires2(ListeCommentaires4)
            setListeCommentaires3(ListeCommentaires4)
            setphotopropreitaire(photopropreitaire2.reverse())
            console.log('kifssh al tsawer', photopropreitaire2)
            setListeCommentaires4([])
            setphotopropreitaire2([])
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  function modifiercommentaire(e) {
    setcommentaireModifie(e.commentaire)
    console.log('alll e', e)
    values2.commentaire = e.commentaire
    values2.commentairePrincipale = e.commentairePrincipale
    values2.datePublication = e.datePublication
    values2.proprietaire.id = e.proprietaire.id
    values2.proprietaire.authority = e.proprietaire.authority
    values2.cours.id = e.cours.id
    values2.id = e.id
    setShow(true)
  }
  const [validated, setValidated] = useState(false)
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  function Notification_Succees() {
    Swal.fire('Succès!', 'Votre commentaire a été modifier avec succès', 'success')
  }
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Problème',
      text: 'un problème dans la modification',
    })
  }
  const [values2, setValues2] = useState({
    id: '',
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
  function Modifier(event) {
    if (commentaireModifie === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      console.log('hhhh', commentaireModifie)
      values2.commentaire = commentaireModifie
      console.log('ach baathe', values2)
      updatecommentaire(values2).then((response) => {
        if (response.status === 200) {
          setValidated(false)
          Notification_Succees()
          getAllcommentaire(props.idcours)
            .then((response) => {
              setListeCommentaires(response.data)
              if (response.data.length > 4) {
                console.log('true')
                setvoirplus1(true)
              }

              response.data.map((item, index) => {
                if (index < 4) {
                  ListeCommentaires4.push(item)
                }
                if (item.proprietaire.image === null) {
                  photopropreitaire2.push(avatar8)
                } else {
                  getfile(item.proprietaire.image.id)
                    .then((response) => {
                      photopropreitaire2.push(URL.createObjectURL(response.data))
                    })
                    .catch((e) => {})
                }
              })
              setListeCommentaires2(ListeCommentaires4)
              setListeCommentaires3(ListeCommentaires4)
              setphotopropreitaire(photopropreitaire2.reverse())
              setListeCommentaires4([])
              setphotopropreitaire2([])
            })
            .catch((e) => {})
        } else Notification_failure()
      })
    }
  }
  return (
    <div>
      <CCard>
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-account"></i>
            </span>
            <h4 style={{ paddingLeft: '15px', paddingBottom: '15px' }}>
              {' '}
              <i
                className="fa fa-comments-o"
                aria-hidden="true"
                style={{ paddingRight: '10', marginRight: '10px' }}
              ></i>
              Les commentaires
            </h4>
          </p>
        </header>
        <div style={{ marginRight: '10px', marginTop: '20px' }}>
          {ListeCommentaires2.map((item, index) => (
            <div className="d-flex px-2 py-1" key={index} style={{ paddingLeft: '25px' }}>
              <CCol md={0}>
                <div style={{ marginRight: '10px', float: 'right', align: 'right' }}>
                  <CAvatar src={photopropreitaire[index]} size="md" />
                </div>
              </CCol>
              <CCol>
                <div
                  className=""
                  style={{
                    background: 'linear-gradient(to bottom right, #EFF1F2, #DDF7FF)',
                    'border-radius': '15px',
                    paddingTop: '15px',
                    paddingLeft: '7px',
                    paddingRight: '44px',
                    paddingBottom: '8px',
                    'word-wrap': 'break-word',
                  }}
                >
                  <h6 className="mb-0 text-sm">
                    {item.proprietaire.nom} {item.proprietaire.prenom}
                  </h6>
                  <p className="" style={{ 'word-wrap': 'break-word' }}>
                    {item.commentaire}
                  </p>
                </div>
                {/*   <i
                  onClick={repondre}
                  style={{ 'font-size': '15px', 'font-style': 'normal', marginLeft: '8px' }}
                >
                  Repondre
                </i>
             */}{' '}
                {idcandidat === item.proprietaire.id ? (
                  <span>
                    {' '}
                    {/*    <i
                      onClick={() => modifiercommentaire(item)}
                      className="fa fa-pencil-square-o"
                      aria-hidden="true"
                      style={{ paddingRight: '10', marginRight: '10px', fontSize: 20 }}
                    ></i> */}
                    <input
                      onClick={() => modifiercommentaire(item)}
                      type="submit"
                      value="modifier"
                      name="modifier"
                      style={{
                        border: 'none',
                        backgroundColor: 'white',
                        color: 'green',
                      }}
                    />
                    {/*      <i
                      onClick={() => supprimercommentaire(item.id)}
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      style={{ paddingRight: '10', marginRight: '10px', fontSize: 20 }}
                    > */}{' '}
                    <input
                      onClick={() => supprimercommentaire(item.id)}
                      type="reset"
                      value="supprimer"
                      name="supprimer"
                      style={{
                        border: 'none',
                        backgroundColor: 'white',
                        color: 'red',
                      }}
                    ></input>
                    {/*                     </i>
                     */}{' '}
                  </span>
                ) : (
                  <div></div>
                )}
                <p style={{ align: 'right', float: 'right' }}>{item.datePublication}</p>
              </CCol>
            </div>
          ))}
        </div>

        {voirplus1 === true ? (
          <div>
            <p
              onClick={() => voirplus()}
              style={{
                'text-align': 'center',
                display: 'block',
                color: 'black',
                'font-size': '20px',
              }}
              id="voirplus"
            >
              <i
                className="fa fa-caret-down"
                aria-hidden="true"
                style={{ paddingRight: '10', marginRight: '10px', fontSize: 20 }}
              ></i>
              voir plus
            </p>
            <p
              onClick={() => voirmoins()}
              style={{
                'text-align': 'center',
                display: 'none',
                marginBottom: '10px',
                color: 'black',
                'font-size': '20px',
              }}
              id="voirmoins"
            >
              <i
                className="fa  fa-caret-up"
                aria-hidden="true"
                style={{ paddingRight: '10', marginRight: '10px' }}
              ></i>
              voir moins
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </CCard>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier un commentaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CCol md={12}>
            <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: 'bold' }}>
              Commentaire
            </CFormLabel>
            <CFormTextarea
              type="text"
              id="validationCustom01"
              defaultValue=""
              required
              value={commentaireModifie}
              onChange={(e) => {
                setcommentaireModifie(e.target.value)
              }}
            />
            <CFormFeedback invalid>Titre est requis</CFormFeedback>
          </CCol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button style={{ height: 39 }} variant="primary" onClick={Modifier}>
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
Commentaires.propTypes = {
  idcours: propTypes.number,
  test: propTypes.boolean,
}
export default Commentaires
