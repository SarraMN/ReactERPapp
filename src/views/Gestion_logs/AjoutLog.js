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
  import { createTimeSheet } from 'src/services/logsService';

  import 'src/views/Reclamation/Reclamation.css'
  import React, { useEffect, useState } from 'react'
  import Swal from 'sweetalert2'
  import { fetchUserData, getUserById } from 'src/services/UserService'
  const AddLog = () => {
    const [validated, setValidated] = useState(false)
    const [taskTitle, setTaskTitle] = useState('')
    const [description, setdescription] = useState('')
    const [hoursWorked, setHoursWorked] = useState('') 
    const [date, setDate] = useState('') 
    const [values, setValues] = useState({
      id: '',
      taskTitle: '',
      description: '',
      hoursWorked: '',
      date: '',
      employee: { id: '', authority: {} },
    })
    const [values2, setValues2] = useState({
      id: '',
      taskTitle: '',
      description: '',
      hoursWorked: '',
      date: '',
      employee: { id: '', authority: {} },
    })
  
    function initialiser() {
      setTaskTitle('')
      setValidated(false)
      setdescription('')
      setHoursWorked('');
      setDate('');
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
         
            values.employee.id = response.data.id
            values.employee.authority = response.data.authority
            values2.employee.id = response.data.id
            values2.employee.authority = response.data.authority
          })
        })
        .catch((e) => {})
    }, [])
  
    //props.id contient l'id de la formation
    const handleSubmit = (event) => {
      //console.log('file', file)
      if (taskTitle === '' || description === '' || date === '' || hoursWorked === '') {
        Notification_NonVide()
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
  
 else {
     
  
        setValidated(true)
        values2.taskTitle = taskTitle
        values2.date = date
        values2.hoursWorked = hoursWorked
        values2.description = description
        console.log('values', values2)
        createTimeSheet(values2).then((response) => {
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
            <CCol md={8}>
              <CFormLabel htmlFor="type" style={{ fontWeight: 'bold' }}>
              Task Title *
              </CFormLabel>
              <CFormInput
                type="text"
                id="type"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <CFormFeedback invalid>Type est requis</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="startDate" style={{ fontWeight: 'bold' }}>
                Date *
              </CFormLabel>
              <CFormInput
                type="date"
                id="startDate"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <CFormFeedback invalid>Champs requis</CFormFeedback>
            </CCol>
  
            <CCol md={6}>
            <CFormLabel htmlFor="numericField" style={{ fontWeight: 'bold' }}>
            hours Worked *
            </CFormLabel>
            <CFormInput
                type="number" // Restricts input to numeric values
                id="numericField"
                required
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
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
  
  export default AddLog