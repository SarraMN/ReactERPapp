import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
import ReactImg from 'src/assets/images/logo_actualite.jpg'

import { AjoutFormation, archiverformation } from 'src/services/FormationService'
import { fetchUserData, getUserById } from 'src/services/UserService'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { getfilebyid } from 'src/services/fileService'
import { ajouterActualite } from 'src/services/actualiteService'

const AjouterFormation = () => {
  const [image, setImage] = useState(ReactImg)
  const [image2, setImage2] = useState(ReactImg)

  const [profileimg, setProfileimg] = useState(ReactImg)
  const [validated, setValidated] = useState(false)
  const [titre, setTitre] = useState('')
  const [dateExpiration, setdateExpiration] = useState()
  const [description, setDescription] = useState('')
  const [archivee, setarchivee] = useState(false)
  const [values, setValues] = useState({
    titre: '',
    dateExpiration: '',
    datecreation: '',
    description: '',
    archivee: '',
    image: {
      id: '',
      name: '',
    },
  })
  //datttteee
  var today = new Date()
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  var dateExp = new Date(dateExpiration)
  var aujourdhui = new Date(date)

  function initialiser() {
    setTitre('')
    setDescription('')
    setdateExpiration('')
    setdateExpiration('')
    setarchivee(false)
    setValidated(false)
    setImage(ReactImg)
    setProfileimg(ReactImg)
    setImage2(ReactImg)
  }
  function ErrDateRxpiration() {
    Swal.fire({
      icon: 'error',
      title: `Date d'éxpiration `,
      text: `La date d'éxpiration doit être supérieur à la date d'aujourd'hui  `,
    })
  }
  function Notification_tailleDescription() {
    Swal.fire({
      icon: 'error',
      title: 'Taille description',
      text: 'La taille de la description doit être au minimum 50 caractères',
    })
  }
  function Notification_photo() {
    Swal.fire({
      icon: 'error',
      title: 'Photo',
      text: 'Il faut choisir une photo',
    })
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
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
    Swal.fire('Succès!', "L'actualité a été ajouter avec succès", 'success')
  }
  function Notification_problemedeimage() {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de Photo',
      text: 'La taille du photo choisi est trop grand SVP choisir autre photo',
    })
  }
  function imageHandler(e) {
    setImage(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileimg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = (event) => {
    if (
      titre === '' ||
      dateExpiration === '' ||
      description === '' ||
      dateExpiration == undefined
    ) {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (description.length < 100) {
      Notification_tailleDescription()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (aujourdhui > dateExp || aujourdhui === dateExp) {
      ErrDateRxpiration()
      event.preventDefault()
      event.stopPropagation()
      setValidated(false)
    } else if (image == ReactImg) {
      Notification_photo()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      values.titre = titre
      values.dateExpiration = dateExpiration
      values.description = description
      values.archivee = archivee
      const formData = new FormData()
      formData.append('file', image)
      axios({
        method: 'post',
        url: 'http://localhost:8080/file/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(
        function (response) {
          if (response.data !== 0) {
            values.image.id = response.data
            console.log('values', values)
            ajouterActualite(values).then((response3) => {
              if (response3.status === 200) {
                console.log('avec succée')
                initialiser()
                Notification_Succees()
              } else if (response3.status === 500) {
                console.log('failure')
                Notification_failure()
              }
            })
          } else {
            Notification_problemedeimage()
          }
        },
        function (error) {},
      )
    }
  }

  return (
    <>
      <div className="actualite">
        <CCard>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            style={{ paddingLeft: 15, paddingRight: 20, paddingTop: 15, paddingBottom: 15 }}
          >
            <CCol md={6}>
              <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom01">
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
              <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="DateE">
                Date d{"'"}expiration
              </CFormLabel>
              <CFormInput
                type="date"
                id="DateE"
                defaultValue=""
                required
                value={dateExpiration}
                onChange={(e) => {
                  setdateExpiration(e.target.value)
                }}
              />
              <CFormFeedback invalid>Vous devez ajouter une date d{"'"}expiration.</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <div /* className="image w-48 h-48 mx-auto" */ style={{ 'text-align': 'center' }}>
                <img
                  src={profileimg}
                  alt="Nature"
                  className="responsive"
                  width="500"
                  height="300"
                />
              </div>
              <div className="field-body mx-auto" style={{ 'margin-top': '15px' }}>
                <div
                  className="field file mx-auto"
                  style={{
                    'border-radius': '30px',
                    color: 'white',
                    borderColor: 'white',
                    width: '150px',
                  }}
                >
                  <label
                    className="upload control mx-auto"
                    style={{
                      Float: 'center',
                      align: 'center',
                      'border-radius': '30px',
                      color: 'white',
                      borderColor: 'white',
                      width: '150px',
                    }}
                  >
                    <a
                      className="button blue"
                      style={{
                        color: '#213f77',
                        'background-color': 'white',
                        borderColor: '#213f77',
                        width: '150px',
                        border: '2.5px solid #213f77',
                        paddingLeft: 5,
                      }}
                    >
                      Choisir une photo
                    </a>
                    <CFormInput
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(value) => imageHandler(value)}
                      name="image"
                    />
                  </label>
                </div>
              </div>
            </CCol>
            <CCol md={6}>
              {' '}
              <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
                Contenu (minimum 100 caractères)
              </CFormLabel>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                rows="8"
                required
                style={{ width: '100%', 'max-width': '100%' }}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                minLength="100"
              ></CFormTextarea>
              <CFormFeedback invalid>Contenu est requise</CFormFeedback>
              <p style={{ color: 'dimgray' }}> {description.length} caractères </p>
              <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: 'bold' }}>
                Spécifier l{"'"}etat:
              </CFormLabel>
              <CFormCheck
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="false"
                label="Non archivé"
                onChange={(e) => {
                  setarchivee(false)
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
                  setarchivee(true)
                }}
              />
            </CCol>

            <CCol xs={12} style={{ marginTop: '50px' }}>
              <button
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  'border-radius': '30px',
                  color: '#213f77',
                  borderColor: '#213f77',
                  width: '120px',
                  height: '40px',
                  'font-weight': 'bold',
                }}
                type="button"
                onClick={handleSubmit}
              >
                Ajouter
              </button>
            </CCol>
          </CForm>
        </CCard>
      </div>
    </>
  )
}
/* AjouterFormation.propTypes = {
  formation: PropTypes.object,
} */

export default AjouterFormation
