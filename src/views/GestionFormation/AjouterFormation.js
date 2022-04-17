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
import ReactImg from 'src/assets/images/image.jpg'

import { AjoutFormation, archiverformation } from 'src/services/FormationService'
import { fetchUserData, getUserById } from 'src/services/UserService'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { getfilebyid } from 'src/services/fileService'

const AjouterFormation = () => {
  const [image, setImage] = useState(ReactImg)
  const [image2, setImage2] = useState(ReactImg)

  const [profileimg, setProfileimg] = useState(ReactImg)
  const [validated, setValidated] = useState(false)
  const [titre, setTitre] = useState('')
  const [categorie, setCategorie] = useState('Data Analyst')
  const [description, setDescription] = useState('')
  const [prix, setPrix] = useState('')
  const [prix_organismes_conventiones, setprix_organismes_conventiones] = useState('')
  const [etat, setEtat] = useState('Non archivé')
  const [values, setValues] = useState({
    titre: '',
    categorie: '',
    description: '',
    prix: '',
    prix_organismes_conventiones: '',
    nbrCours: '',
    auteur: {
      id: '',
      authority: {},
    },
    etat: '',
    image: {
      id: '',
      name: '',
    },
  })

  function initialiser() {
    setTitre('')
    setCategorie('Data Analyst')
    setDescription('')
    setPrix('')
    setValidated(false)
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
    Swal.fire('Succès!', 'La formation a été ajouter avec succès', 'success')
  }
  function Notification_problemedeimage() {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de Photo',
      text: 'La taille du photo choisi est trop grand SVP choisir autre photo',
    })
  }
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        console.log('userinfo', response.data)
        console.log('id', response.data.id)
        getUserById(response.data.id).then((response) => {
          console.log('respose', response.data)
          values.auteur.id = response.data.id
          values.auteur.authority = response.data.authority
          console.log('values.auteur', values.auteur)
        })
      })
      .catch((e) => {})
  }, [])
  function imageHandler(e) {
    console.log('coucou', e.target.files[0])
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
    console.log('imageee', image)
    if (image == ReactImg) console.log('tbadel walo')
    else console.log('tbadel hajet')

    if (
      titre === '' ||
      categorie === '' ||
      description === '' ||
      prix === '' ||
      etat === '' ||
      prix_organismes_conventiones == ''
    ) {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (description.length < 50) {
      Notification_tailleDescription()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (image == ReactImg) {
      Notification_photo()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      console.log('waah', values.auteur)
      values.titre = titre
      values.categorie = categorie
      values.nbrCours = 0
      values.description = description
      values.prix = prix
      values.prix_organismes_conventiones = prix_organismes_conventiones
      values.etat = etat
      console.log(values)
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
            AjoutFormation(values).then((response3) => {
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
      <CCard>
        <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
          <CIcon
            icon={cilPencil}
            style={{
              marginRight: 15,
            }}
          />
          Ajouter Formation
        </CCardHeader>
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
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom04">
              Catégorie
            </CFormLabel>
            <CFormSelect
              id="validationCustom04"
              value={categorie}
              onChange={(e) => {
                setCategorie(e.target.value)
              }}
              defaultValue="Data Analyst"
            >
              <option value="Data Analyst">Data Analyst</option>
              <option value="Marketing">Marketing</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="UX Designer">UX Designer</option>
              <option value="development mobile">development mobile</option>
              <option value="IT And Software">IT &amp; Software</option>
            </CFormSelect>
            <CFormFeedback invalid>Vous devez séléctionner une Catégorie.</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom01">
              Prix
            </CFormLabel>
            <CFormInput
              type="number"
              id="validationCustom01"
              placeholder="0.00"
              required
              value={prix}
              onChange={(e) => {
                setPrix(e.target.value)
              }}
            />
            <CFormFeedback invalid>Prix est requis</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom01">
              Prix d{"'"}organismes conventionés
            </CFormLabel>
            <CFormInput
              type="number"
              id="validationCustom01"
              placeholder="0.00"
              required
              value={prix_organismes_conventiones}
              onChange={(e) => {
                setprix_organismes_conventiones(e.target.value)
              }}
            />
            <CFormFeedback invalid>prix_organismes_conventiones est requis</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <div /* className="image w-48 h-48 mx-auto" */ style={{ 'text-align': 'center' }}>
              <img src={profileimg} alt="Nature" className="responsive" width="600" height="400" />
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
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
              Déscription (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="3"
              required
              style={{ width: '100%', 'max-width': '100%' }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              minLength="50"
            ></CFormTextarea>
            <CFormFeedback invalid>Déscription est requise</CFormFeedback>
            <p style={{ color: 'dimgray' }}> {description.length} caractères </p>
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
          {/*    <CCol md={6}>
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
              Déscription (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="3"
              required
              style={{ width: '100%', 'max-width': '100%' }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              minLength="50"
            ></CFormTextarea>
            <CFormFeedback invalid>Déscription est requise</CFormFeedback>
            <p style={{ color: 'dimgray' }}> {description.length} caractères </p>
          </CCol>{' '} */}
          <CCol xs={12} style={{ marginTop: '50px' }}>
            {/*    <Button
              className="btn-Aj"
              style={{
                backgroundColor: 'white',
                color: '#140788',
                width: 100,
                marginTop: 20,
                marginRight: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              onClick={handleSubmit}
            >
              Ajouter
            </Button> */}
            {/* <button
              type="button"
              style={{
                backgroundColor: 'white',
                color: '#140788',
                width: 100,
                marginTop: 20,
                marginRight: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              className="btn-info"
            >
              Ajouter
            </button> */}
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
    </>
  )
}
/* AjouterFormation.propTypes = {
  formation: PropTypes.object,
} */

export default AjouterFormation
