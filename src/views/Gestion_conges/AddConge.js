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
import { CreateConge } from 'src/services/congesService'

import 'src/views/Reclamation/Reclamation.css'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { fetchUserData, getUserById } from 'src/services/UserService'
import axios from 'axios'
const AddConge = () => {
  const [validated, setValidated] = useState(false)
  const [type, setType] = useState('')
  const [description, setdescription] = useState('')
  const [startDate, setStartDate] = useState('') // Ajout du champ startDate
  const [endDate, setEndDate] = useState('') // Ajout du champ endDate
  const [soldeLeaves, setSoldeLeaves] = useState('')
  const [values, setValues] = useState({
    id: '',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    requestedBy: { id: '', authority: {} },
    piececand: { id: '' },
  })
  const [values2, setValues2] = useState({
    id: '',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    requestedBy: { id: '', authority: {} },
    piececand: { id: '' },
  })

  function initialiser() {
    setType('')
    setValidated(false)
    setdescription('')
    setStartDate('');
    setEndDate('');
    getUpdateSoldeLeaves()
  }

  function getUpdateSoldeLeaves() {
    fetchUserData()
    .then((response) => {
      getUserById(response.data.id).then((response) => {
        setSoldeLeaves(response.data.soldeLeaves)
      })
    })
  }
  function Notification_taille() {
    Swal.fire({
      icon: 'error',
      title: 'Taille minimum',
      text: 'La taille du description doit être au minimum 50 caractères',
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
          setSoldeLeaves(response.data.soldeLeaves)
          values.requestedBy.id = response.data.id
          values.requestedBy.authority = response.data.authority
          values2.requestedBy.id = response.data.id
          values2.requestedBy.authority = response.data.authority
        })
      })
      .catch((e) => {})
  }, [])

  //props.id contient l'id de la formation
  const handleSubmit = (event) => {
    //console.log('file', file)
    if (type === '' || description === '' || startDate === '' || endDate === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (new Date(startDate) > new Date(endDate)) {
        Swal.fire({
          icon: 'error',
          title: 'Dates invalides',
          text: 'La date de début doit être avant la date de fin',
        })
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)
    } 
    else if (description.length < 50) {
        Notification_taille()
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)
      } 
    
/*     else if (file != 'vide') {
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
              values.type = type
              values.description = description
              console.log('values', values)
              CreateConge(values).then((response) => {
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
    } */ else {
    // Calcul du nombre de jours demandés
    const start = new Date(startDate)
    const end = new Date(endDate)
    const daysRequested = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1

    // Vérification du solde
    if (soldeLeaves < daysRequested) {
      Swal.fire({
        icon: 'error',
        title: 'Solde insuffisant',
        text: `Votre solde actuel est de ${soldeLeaves} jours. Vous avez demandé ${daysRequested} jours.`,
      })
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      return
    }

    // Si tout est valide
      setValidated(true)
      values2.type = type
      values2.startDate = startDate
      values2.endDate = endDate
      values2.description = description
      console.log('values', values2)
      CreateConge(values2).then((response) => {
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
          style={{ padding: 15 }}
        >
          <CCol md={12}>
            <CFormLabel htmlFor="type" style={{ fontWeight: 'bold' }}>
              Votre Solde est : {soldeLeaves}
            </CFormLabel>
           
          </CCol>
          <CCol md={8}>
            <CFormLabel htmlFor="type" style={{ fontWeight: 'bold' }}>
              Type *
            </CFormLabel>
            <CFormInput
              type="text"
              id="type"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <CFormFeedback invalid>Type est requis</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="startDate" style={{ fontWeight: 'bold' }}>
              Date de début *
            </CFormLabel>
            <CFormInput
              type="date"
              id="startDate"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <CFormFeedback invalid>Champs requis</CFormFeedback>
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="endDate" style={{ fontWeight: 'bold' }}>
              Date de fin *
            </CFormLabel>
            <CFormInput
              type="date"
              id="endDate"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <CFormFeedback invalid>Champs requis</CFormFeedback>
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="description" style={{ fontWeight: 'bold' }}>
              Description (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="description"
              rows="7"
              required
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></CFormTextarea>
            <CFormFeedback invalid>Champs requis</CFormFeedback>
            <p style={{ color: 'dimgray' }}>{description.length} caractères</p>
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

export default AddConge
