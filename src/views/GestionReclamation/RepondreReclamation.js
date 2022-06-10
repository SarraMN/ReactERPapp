import React, { useEffect, useState } from 'react'
import 'src/views/GestionFormation/listeFormation.css'
import Swal from 'sweetalert2'
import { editReclamation } from 'src/services/ReclamationService'
import axios from 'axios'
import { uploadfile, getfile } from 'src/services/fileService'

import 'src/views/Reclamation/Reclamation.css'
import {
  CCard,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CFormInput,
} from '@coreui/react'
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const RepondreReclamation = () => {
  const dispatch = useDispatch()
  let nbrReclamations = useSelector((state) => state.nbrReclamations)
  const [validated, setValidated] = useState(false)
  const [bool, setbool] = useState(false)
  const [Bool, setBool] = useState(false)
  const [id, setId] = useState('')
  const [idDocuemnt, setidDocuemnt] = useState()
  const [logo, setlogo] = useState('')
  const [reponse, setReponse] = useState('')
  const [itemReclamation, setItemReclamation] = useState('')
  const [file, setFile] = useState('vide')
  const [values, setValues] = useState({
    id: '',
    objet: '',
    contenu: '',
    reponse: '',
    traitee: '',
    pieceadmin: { id: '' },
    piececand: { id: '' },
    dateenvoie: '',
    candidat: { id: '', authority: {} },
  })
  let reclamation = useLocation()

  const [basicActive, setBasicActive] = useState('tab1')

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return
    }

    setBasicActive(value)
  }

  function initialiser() {
    setValidated(false)
    setReponse('')
  }
  function Notification_taille() {
    Swal.fire({
      icon: 'error',
      title: 'Taille minimum',
      text: 'La taille de la réponse doit être au minimum 50 caractères',
    })
  }
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }

  function taillefichiertroplarge() {
    Swal.fire({
      icon: 'error',
      title: 'Taille du fichier',
      text: 'Le fichier est trop volumineux!',
    })
  }
  function Notification_PDF() {
    Swal.fire({
      icon: 'error',
      title: 'Type de fichier',
      text: 'La piéce jointe doit être de type pfd',
    })
  }
  function Notification_Succees() {
    Swal.fire(
      'Succès!',
      'Votre réponse a été envoyée avec succès! Vous pouvez la consulter dans la liste des reclamations traitées',
      'success',
    )
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  //popup
  let navigate = useNavigate()
  const handleSubmit = (event) => {
    console.log('file', file)
    if (reponse === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (reponse.length < 50) {
      Notification_taille()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (file != 'vide') {
      if (file.type != 'application/pdf') {
        Notification_PDF()
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)
      } else if (file.size >= 1048576) {
        taillefichiertroplarge()
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)
        setFile('')
      } else {
        console.log('fifiii', file)
        const formData = new FormData()
        formData.append('file', file)
        axios({
          method: 'post',
          url: 'http://localhost:8080/file/upload',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(
          function (response) {
            console.log('filleee', response)
            if (response.data === 0) {
              taillefichiertroplarge()
            } else {
              values.id = itemReclamation.id
              values.objet = itemReclamation.objet
              values.contenu = itemReclamation.contenu
              values.traitee = true
              if (itemReclamation.piececand != null) {
                values.piececand.id = itemReclamation.piececand.id
              } else values.piececand = null
              values.pieceadmin.id = response.data
              values.reponse = reponse
              values.candidat.id = itemReclamation.candidat.id
              values.dateenvoie = itemReclamation.dateenvoie
              values.candidat.authority = itemReclamation.authority
              setValidated(true)
              console.log('values', values)
              editReclamation(itemReclamation.id, values).then((response) => {
                console.log('staatus', response.status)
                if (response.status === 200) {
                  console.log('avec succée')
                  initialiser()
                  Notification_Succees()

                  dispatch({ type: 'set', nbrReclamations: nbrReclamations - 1 })
                  nbrReclamations = nbrReclamations - 1
                  navigate('/GestionReclamation/ReclamationAttentes')
                } else {
                  console.log('failure')
                  Notification_failure()
                }
              })
            }
          },
          function (error) {},
        )
      }
    } else {
      values.id = itemReclamation.id
      values.objet = itemReclamation.objet
      values.contenu = itemReclamation.contenu
      values.traitee = true
      if (itemReclamation.piececand != null) {
        values.piececand.id = itemReclamation.piececand.id
      } else values.piececand = null
      values.pieceadmin = null
      values.reponse = reponse
      values.candidat.id = itemReclamation.candidat.id
      values.dateenvoie = itemReclamation.dateenvoie
      values.candidat.authority = itemReclamation.authority
      setValidated(true)
      console.log('values', values)
      editReclamation(itemReclamation.id, values).then((response) => {
        console.log('staatus', response.status)
        if (response.status === 200) {
          console.log('avec succée')
          initialiser()
          Notification_Succees()
          dispatch({ type: 'set', nbrReclamations: nbrReclamations - 1 })
          nbrReclamations = nbrReclamations - 1
          navigate('/GestionReclamation/ReclamationAttentes')
        } else {
          console.log('failure')
          Notification_failure()
        }
      })
    }
  }
  function imageHandler(e) {
    console.log('coucou', e)
    console.log('coucou', e.target.files[0])
    setFile(e.target.files[0])
  }
  /*getReclamations */
  useEffect(() => {
    setItemReclamation(reclamation.state.state)
    if (reclamation.state.state.piececand != null) {
      setidDocuemnt(reclamation.state.state.piececand.id)
      console.log('helloo', reclamation.state.state)
      console.log('itemReclamation', itemReclamation)
      getfile(reclamation.state.state.piececand.id).then((response) => {
        setbool(false)
        setlogo(URL.createObjectURL(response.data))
      })
    }
  }, [bool, Bool, idDocuemnt])

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
  return (
    <div className="listeFormation">
      <CCard className="the_card">
        <header className="flex space space-between card-heade">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-account-circle"></i>
            </span>
            Référence: {itemReclamation.id}
          </p>
        </header>
        <MDBTabs fill className="mb-3" style={{ marginTop: 10 }}>
          <MDBTabsItem>
            <MDBTabsLink
              style={{ color: '#140788', border: 1, fontSize: 16, fontWeight: 500 }}
              onClick={() => handleBasicClick('tab1')}
              active={basicActive === 'tab1'}
            >
              <i
                className="fa fa-eye"
                aria-hidden="true"
                style={{ marginLeft: 10, marginRight: 10 }}
              ></i>
              Consulter
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              style={{ color: '#140788', border: 3, fontSize: 16, fontWeight: 500 }}
              onClick={() => handleBasicClick('tab2')}
              active={basicActive === 'tab2'}
            >
              <i
                className="fa fa-comments-o"
                aria-hidden="true"
                style={{ marginLeft: 10, marginRight: 10 }}
              ></i>
              Répondre
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={basicActive === 'tab1'}>
            <div>
              <div className="objet_recl">Objet: {itemReclamation.objet}</div>
              <div className="objet_recl">
                Contenu :<br></br>
              </div>
              <div className="contenu_recl">{itemReclamation.contenu}</div>
            </div>
            {itemReclamation.piececand != null ? (
              <div className="pdf_div">
                <i
                  className="fa fa-file-pdf-o"
                  aria-hidden="true"
                  style={{ marginRight: 12, fontSize: 25, color: '#140788' }}
                ></i>
                <a
                  onClick={() => downloadContract2()}
                  style={{
                    color: '#140788',
                    marginRight: 10,
                    fontSize: 15,
                  }}
                >
                  Voir pièce justificative
                </a>
              </div>
            ) : (
              <div></div>
            )}
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'tab2'}>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              style={{ paddingLeft: 35, paddingRight: 35, paddingTop: 20, paddingBottom: 15 }}
            >
              <CCol md={12}>
                <CFormLabel
                  htmlFor="exampleFormControlTextarea1"
                  style={{ fontWeight: 'bold', marginBottom: 20 }}
                >
                  Réponse : (minimum 50 caractères)
                </CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="7"
                  required
                  value={reponse}
                  onChange={(e) => {
                    setReponse(e.target.value)
                  }}
                  minLength="50"
                ></CFormTextarea>
                <CFormFeedback invalid>Champs requis</CFormFeedback>
                <p style={{ color: 'dimgray' }}> {reponse.length} caractères </p>
              </CCol>

              <CCol xs={12}>
                <CCol md={6}>
                  <CFormLabel htmlFor="formFileSm" style={{ fontWeight: 'bold' }} multiple>
                    Pièce justificative
                  </CFormLabel>
                  <CFormInput
                    style={{ borderRadius: 40 }}
                    type="file"
                    size="sm"
                    id="formFileSm"
                    accept="application/pdf"
                    onChange={(value) => imageHandler(value)}
                    minLength="50"
                  />
                  <CFormFeedback invalid>Champs requis</CFormFeedback>
                </CCol>
                <button
                  className="btn-Aj-Recl"
                  style={{
                    width: 100,
                    marginTop: 50,
                    marginRight: 20,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                  type="button"
                  onClick={(value) => handleSubmit(value)}
                >
                  Envoyer
                </button>
              </CCol>
            </CForm>
          </MDBTabsPane>
        </MDBTabsContent>
      </CCard>
    </div>
  )
}
export default RepondreReclamation
