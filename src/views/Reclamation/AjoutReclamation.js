import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import { AjoutReclamation } from 'src/services/ReclamationService'
import 'src/views/Reclamation/Reclamation.css'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { fetchUserData, getUserById } from 'src/services/UserService'
import axios from 'axios'
const AjouterReclamation = () => {
  const [validated, setValidated] = useState(false)
  const [objet, setObjet] = useState('')
  const [contenu, setContenu] = useState('')
  const [file, setFile] = useState('vide')
  const [fileInput, setfileInput] = useState('')
  const [values, setValues] = useState({
    id: '',
    objet: '',
    contenu: '',
    candidat: { id: '', authority: {} },
    pieceJointe: { id: '' },
  })
  const [values2, setValues2] = useState({
    id: '',
    objet: '',
    contenu: '',
    candidat: { id: '', authority: {} },
  })

  function initialiser() {
    setObjet('')
    setFile('vide')
    setValidated(false)
    setContenu('')
  }
  function Notification_taille() {
    Swal.fire({
      icon: 'error',
      title: 'Taille minimum',
      text: 'La taille du contenu doit être au minimum 50 caractères',
    })
  }
  function Notification_PDF() {
    Swal.fire({
      icon: 'error',
      title: 'Type de fichier',
      text: 'La piéce jointe doit être de type pfd',
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
  function Notification_Succees() {
    Swal.fire('Succès!', 'Votre réclamation a été ajouter avec succès', 'success')
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        getUserById(response.data.id).then((response) => {
          values.candidat.id = response.data.id
          values.candidat.authority = response.data.authority
          values2.candidat.id = response.data.id
          values2.candidat.authority = response.data.authority
        })
      })
      .catch((e) => {})
  }, [])
  //props.id contient l'id de la formation
  const handleSubmit = (event) => {
    console.log('file', file)
    if (objet === '' || contenu === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (contenu.length < 50) {
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
        const formData = new FormData()
        formData.append('file', file)
        axios({
          method: 'post',
          url: 'http://localhost:8080/file/upload',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(
          function (response) {
            if (response.data === 0) {
              taillefichiertroplarge()
            } else {
              values.piececand.id = response.data
              setValidated(true)
              values.objet = objet
              values.contenu = contenu
              console.log('values', values)
              AjoutReclamation(values).then((response) => {
                if (response.status === 200) {
                  console.log('avec succée')
                  initialiser()
                  Notification_Succees()
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
      setValidated(true)
      values2.objet = objet
      values2.contenu = contenu
      console.log('values', values2)
      AjoutReclamation(values2).then((response) => {
        if (response.status === 200) {
          console.log('avec succée')
          initialiser()
          Notification_Succees()
        } else {
          console.log('failure')
          Notification_failure()
        }
      })
    }
  }
  function imageHandler(e) {
    setFile(e.target.files[0])
  }
  return (
    <>
      <CCard>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          style={{ paddingLeft: 15, paddingRight: 20, paddingTop: 15, paddingBottom: 15 }}
        >
          <CCol md={8}>
            <CFormLabel htmlFor="exampleFormControlTextarea1" style={{ fontWeight: 'bold' }}>
              Objet
            </CFormLabel>
            <CFormInput
              type="text"
              id="validationCustom01"
              defaultValue=""
              required
              value={objet}
              onChange={(e) => {
                setObjet(e.target.value)
              }}
            />
            <CFormFeedback invalid>Objet est requis</CFormFeedback>
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="exampleFormControlTextarea1" style={{ fontWeight: 'bold' }}>
              Contenu (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="7"
              required
              value={contenu}
              onChange={(e) => {
                setContenu(e.target.value)
              }}
              minLength="50"
            ></CFormTextarea>
            <CFormFeedback invalid>Champs requis</CFormFeedback>
            <p style={{ color: 'dimgray' }}> {contenu.length} caractères </p>
          </CCol>
          <CCol md={6}>
            <CFormLabel
              htmlFor="formFileSm"
              style={{ fontWeight: 'bold' }}
              accept="application/pdf"
            >
              Pièce justificative
            </CFormLabel>
            <CFormInput
              style={{ borderRadius: 40 }}
              type="file"
              size="sm"
              accept="application/pdf"
              id="formFileSm"
              onChange={(value) => imageHandler(value)}
              minLength="50"
            />
            <CFormFeedback invalid>Champs requis</CFormFeedback>
          </CCol>
          <CCol xs={12}>
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
              onClick={handleSubmit}
            >
              Envoyer
            </button>
          </CCol>
        </CForm>
      </CCard>
    </>
  )
}

export default AjouterReclamation
