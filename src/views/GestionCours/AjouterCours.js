import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import { AjoutCours } from 'src/services/CoursService'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import axios from 'axios'
const AjouterCours = (props) => {
  const [validated, setValidated] = useState(false)
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [objectif, setObjectif] = useState('')
  const [etat, setEtat] = useState('Non archivé')
  const [file, setFile] = useState('')
  const [values, setValues] = useState({
    titre: '',
    description: '',
    objectif: '',
    formation: {
      id: '',
    },
    etat: '',
    document: { id: '' },
  })

  function initialiser() {
    setTitre('')
    setDescription('')
    setValidated(false)
    setObjectif('')
  }
  function Notification_taille() {
    Swal.fire({
      icon: 'error',
      title: 'Taille minimum',
      text: 'La taille de la description et du chams objectif doivent être au minimum 50 caractères',
    })
  }
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }
  function Notification_Succees() {
    Swal.fire('Succès!', 'Le cours a été ajouter avec succès', 'success')
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  //props.id contient l'id de la formation
  const handleSubmit = (event) => {
    console.log('id formation', props.id)
    console.log('file', file)
    if (titre === '' || description === '' || objectif === '' || etat === '' || file === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (description.length < 50 || objectif.length < 50) {
      Notification_taille()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
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
          values.document.id = response.data
          setValidated(true)
          console.log('etat', etat)
          values.titre = titre
          values.description = description
          values.objectif = objectif
          values.formation.id = props.id
          values.etat = etat
          console.log('values', values)
          AjoutCours(values).then((response) => {
            if (response.status === 200) {
              console.log('avec succée')
              initialiser()
              Notification_Succees()
            } else if (response.status === 500) {
              console.log('failure')
              Notification_failure()
            }
          })
        },
        function (error) {},
      )
    }
  }
  function imageHandler(e) {
    console.log('coucou', e)
    console.log('coucou', e.target.files[0])
    setFile(e.target.files[0])
  }
  return (
    <>
      <CCard>
        <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
          <CIcon
            icon={cilPencil}
            style={{
              marginRight: 15,
            }}
          />
          Ajouter Cours
        </CCardHeader>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          style={{ paddingLeft: 15, paddingRight: 20, paddingTop: 15, paddingBottom: 15 }}
        >
          <CCol md={6}>
            <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: 'bold' }}>
              Titre
            </CFormLabel>
            <CFormInput
              type="text"
              id="validationCustom01"
              defaultValue=""
              required
              value={titre}
              onChange={(e) => {
                setTitre(e.target.value)
              }}
            />
            <CFormFeedback invalid>Titre est requis</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: 'bold' }}>
              Spécifier l{"'"}etat:
            </CFormLabel>
            <CFormCheck
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="Non archivé"
              label="Non archivé"
              onChange={(e) => {
                setEtat(e.target.value)
              }}
              defaultChecked
            />
            <CFormCheck
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="Archivé"
              label="Archivé"
              onChange={(e) => {
                setEtat(e.target.value)
              }}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="exampleFormControlTextarea1" style={{ fontWeight: 'bold' }}>
              Déscription (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="3"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              minLength="50"
            ></CFormTextarea>
            <CFormFeedback invalid>Déscription est requise</CFormFeedback>
            <p style={{ color: 'dimgray' }}> {description.length} caractères </p>
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="exampleFormControlTextarea1" style={{ fontWeight: 'bold' }}>
              Objectifs (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="3"
              required
              value={objectif}
              onChange={(e) => {
                setObjectif(e.target.value)
              }}
              minLength="50"
            ></CFormTextarea>
            <CFormFeedback invalid>Champs requis</CFormFeedback>
            <p style={{ color: 'dimgray' }}> {objectif.length} caractères </p>
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="formFileSm" style={{ fontWeight: 'bold' }}>
              Ajouter le cours en format pdf
            </CFormLabel>
            <CFormInput
              required
              type="file"
              size="sm"
              id="formFileSm"
              /*               value={file}
               */ /* onChange={(e) => {
                setFile(e.target.value)
              }} */
              onChange={(value) => imageHandler(value)}
              minLength="50"
            />
            <CFormFeedback invalid>Champs requis</CFormFeedback>
          </CCol>

          <CCol xs={12}>
            <Button
              className="btn-Aj"
              style={{
                backgroundColor: 'white',
                color: '#140788',
                width: 100,
                marginTop: 50,
                marginRight: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              onClick={handleSubmit}
            >
              Ajouter
            </Button>
          </CCol>
        </CForm>
      </CCard>
    </>
  )
}
AjouterCours.propTypes = {
  id: PropTypes.number,
}

export default AjouterCours
