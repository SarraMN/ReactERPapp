import {
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect ,
} from '@coreui/react'
import { createTimeSheet } from 'src/services/logsService';
import { add } from 'src/services/evaluationService'
import { getEmployeeList } from 'src/services/gestionutilisateurs'

import 'src/views/Reclamation/Reclamation.css'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { fetchUserData, getUserById } from 'src/services/UserService'
const AjoutEvaluation = () => {
  const [validated, setValidated] = useState(false)
  const [score, setscore] = useState(0)
  const [feedback, setfeedback] = useState('')
  const [employee, setemployee] = useState('')
  const [employees, setemployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState('');


  const [values, setValues] = useState({
    score: 0,
    feedback: '',
    employee: { id: '', authority: {} },
    evaluator: { id: '', authority: {} },
  })
  const [values2, setValues2] = useState({
    score: 0,
    feedback: '',
    employee: { id: '', authority: {} },
    evaluator: { id: '', authority: {} },
  })

  function initialiser() {
    setscore(0)
    setValidated(false)
    setemployee({ id: '', authority: {} })
  }


  function Notification_taille() {
    Swal.fire({
      icon: 'error',
      title: 'Taille minimum',
      text: 'La taille du description doit être au minimum 50 caractères',
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
          values.evaluator.id = response.data.id
          values.evaluator.authority = response.data.authority
          values2.evaluator.id = response.data.id
          values2.evaluator.authority = response.data.authority
        })
      })
      .catch((e) => {})

      getEmployeeList()
      .then((response) => {
        // Directly use response.data as it's already an array
        setemployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setemployees([]); // Handle errors by setting an empty array
      });
  }, []);

  //props.id contient l'id de la formation
  const handleSubmit = (event) => {
    //console.log('file', file)
    if (feedback === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    }
    else if (feedback.length < 50) {
        Notification_taille()
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)
      } 

    else {
      setValidated(true)
      values2.feedback = feedback
      values2.score =  parseInt(score);
      const selectedEmployeePayload = {
        id: selectedEmployee.id,
        authority: selectedEmployee.authority,
      };
      values2.employee = selectedEmployeePayload    
      add(values2).then((response) => {
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
  return (
    <>
      <CCard>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          style={{ padding: 15 }}
        >

          <CCol md={6}>
                <CFormLabel htmlFor="employeeSelect" style={{ fontWeight: 'bold' }}>
                  Nom de l'employé *
                </CFormLabel>
                <CFormSelect
  id="employeeSelect"
  required
  value={selectedEmployee}
  onChange={(e) => setSelectedEmployee(JSON.parse(e.target.value))} // Parse the value back to JSON
>
  <option value="" disabled>
    -- Sélectionnez un employé --
  </option>
  {employees.map((employee) => (
    <option key={employee.id} value={JSON.stringify(employee)}>
      {employee.nom} {employee.prenom}
    </option>
  ))}
</CFormSelect>

                <CFormFeedback invalid>Champs requis</CFormFeedback>
              </CCol>

          <CCol md={6}>
          <CFormLabel htmlFor="numericField" style={{ fontWeight: 'bold' }}>
          Score *
          </CFormLabel>
          <CFormInput
              type="number" // Restricts input to numeric values
              id="numericField"
              required
              value={score}
              onChange={(e) => setscore(e.target.value)}
          />
          <CFormFeedback invalid>Champs requis</CFormFeedback>
          </CCol>

          <CCol md={12}>
            <CFormLabel htmlFor="description" style={{ fontWeight: 'bold' }}>
              Feedback (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="description"
              rows="7"
              required
              value={feedback}
              onChange={(e) => setfeedback(e.target.value)}
            ></CFormTextarea>
            <CFormFeedback invalid>Champs requis</CFormFeedback>
            <p style={{ color: 'dimgray' }}>{feedback.length} caractères</p>
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

export default AjoutEvaluation