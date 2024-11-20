import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import 'src/views/GestionUtilisateurs/AjoutUser.css'
import Swal from 'sweetalert2'
import { addUser, UserIns } from 'src/services/UserService'
import { sendMail } from 'src/services/UserService'
import axios from 'axios'
import ReactImg from 'src/assets/images/profile_homme.png'

import { add } from 'src/services/evaluationService'
import { fetchUserData, getUserById } from 'src/services/UserService'

const AjoutEmploye = () => {
  const [image, setImage] = useState(ReactImg)

  const [profileimg, setProfileimg] = useState(ReactImg)
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
  const [test, setest] = useState(false)

  ////////////////////
  const [mail] = useState({
    destinataire: '',
    body: '',
    topic: '',
  })

  function Notification_succes() {
    Swal.fire(
      'La ajout de cet employé a été effectuée avec succès.',
      'Il va etre informé par un Mail',
      'success',
    )
    mail.destinataire = values.email
    mail.body =
      'Votre compte sur le plate-forme GoMyCode est activé , Votre UserName: ' +
      values.userName +
      ' et Mot de passe: ' +
      values.password +
      ' Lorsque vous vous connectez à votre compte, vous pouvez mettre à jour vos informations personnelles (sur vous-mêmes, vos intérêts etc..). Merci!'
    mail.topic = 'Bonjour et bienvenue sur GoMyFormation Tunisia'
    sendMail(mail).then((response) => {
      if (response.status === 200) {
        if (response.data == '') {
          /*    Notification_Echec()
          Vider_champs(e)
      */
        } else {
        }
      } else {
      }
    })
  }
  function Notification_problemedesaisie(err) {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de saisie',
      text: err,
    })
  }
  function Notification_problemedeimage() {
    Swal.fire({
      icon: 'Error',
      title: 'Probleme de Photo',
      text: 'La taille du photo choisi est trop grand SVP choisir autre photo',
    })
  }
  function ChoixPhoto() {
    Swal.fire({
      icon: 'warning',
      title: 'Il faut choisir une photo',
      text: '',
    })
  }
  function Notification_probleme() {
    Swal.fire({
      icon: 'error',
      title: 'Probleme !',
      text: 'Quelque chose ne va pas ! Veuillez réessayer',
    })
  }
  const [values, setValues] = useState({
    evaluator: {id:'',authority: {}},
    employee: 0,
    score: 0,
    evaluation:'',
  })
  const handleSubmit = (evt) => {
    console.log(evt);
    add(evt);
    
    
  }

  const [initialValues2, setinitialValues2] = useState({
    employee: 0,
    score: 0,
    evaluation:'',
    evaluator: {id:'',authority: {}},
  })
  useEffect(() => {
    fetchUserData()
    .then((response) => {
      getUserById(response.data.id).then((response) => {
        values.evaluator.id = response.data.id
        values.evaluator.authority = response.data.authority
        initialValues2.evaluator.id = response.data.id
        initialValues2.evaluator.authority = response.data.authority
      })
    })
    .catch((e) => {})
    values.employee = 0
    values.score = 0
    values.evaluation = ''
    initialValues2.employee = 0
    initialValues2.score = 0
    initialValues2.evaluation = ''
  }, [test])

  return (
    <div className="userProfil">
      <section className="moncompte">
        <Formik
          initialValues={initialValues2}
          validationSchema={Yup.object().shape({
            employee: Yup.string().required('Employee est requis'),
            score: Yup.string().required('Score est requis').typeError('Le score doit être un nombre'),
            evaluation: Yup.string().required('l\'evaluation est requis')
          })}
          onSubmit={(values) => handleSubmit(values)}
          render={({ errors, status, touched }) => (
            <Form>
              <>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">
                        <span className="icon">
                          <i className="mdi mdi-account"></i>
                        </span>
                        Ajout Evaluation
                      </p>
                    </header>

                    <div className="card-content">
                      <div className="field">
                        <label className="label">Employee</label>
                        <div className="control">
                          <Field
                            type="number"
                            name="employee"
                            placeholder="Employee"
                            className={'input' + (errors.employee && touched.employee ? ' is-invalid' : '')}
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="employee"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Score</label>
                        <div className="control">
                          <Field
                            type="number"
                            name="score"
                            placeholder="Score"
                            className={
                              'input' + (errors.score && touched.score ? ' is-invalid' : '')
                            }
                          />
                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="prenom"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-content">
                      <div className="field">
                        <label className="label">Evaluation</label>
                        <div className="control">
                          <Field
                            as="textarea"
                            id="evaluation"
                            name="evaluation"
                            placeholder="Evaluation"
                            
                          />

                          <ErrorMessage
                            style={{ fontSize: 12, color: 'red' }}
                            name="evaluation"
                            component="div"
                            classNameName="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div style={{ 'margin-top': '5px', float: 'right', align: 'right' }}>
                        <div>
                          <div className="control">
                            <button
                              type="submit"
                              className="button blue"
                              style={{ width: '100px', 'background-color': '#213f77' }}
                            >
                              Valider
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </Form>
          )}
        />
      </section>
    </div>
  )
}
export default AjoutEmploye
