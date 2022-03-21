import React, { useState } from 'react'
import { sendMail } from 'src/services/UserService'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import 'src/views/pages/forgetpassword/forgetpassword.css'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = (props) => {
  function Vider_champs(evt) {
    evt.Email = ''
  }
  let navigate = useNavigate()

  function Notification_Echec() {
    Swal.fire({
      icon: 'error',
      title: 'utilisateur non trouvé',
      text: 'essayer de saisir un email valide',
    })
  }
  function Notification_codeinvalide() {
    Swal.fire({
      icon: 'error',
      title: 'Code invalide',
      text: 'essayer de saisir un code valide',
    })
  }
  function Notification_reussi(entier, user) {
    Swal.fire({
      title: 'Entrer le code',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Valider',
      showLoaderOnConfirm: true,
      preConfirm: (code) => {
        if (code == entier) {
          navigate('/Reinitialiser_mdp', { state: { utilisateur: user } })
          /*    props.history.push({
            pathname: '/Reinitialiser_mdp',
            state: { detail: id },
          })
  */
        } else {
          Notification_codeinvalide()
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }
  function confirmation(e, user) {
    Swal.fire({
      title: 'Mail envoyé',
      text:
        'Vérifiez votre boîte de réception ' +
        values.destinataire +
        ',vous allez recevoir un mail contenant votre code de autorisation ,veuilliez le renseigner ci-dessous pour valider la modification de votre mot de passe',
      showclassName: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideclassName: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        Notification_reussi(e, user)
      }
    })
  }

  const [values] = useState({
    destinataire: '',
    body: '',
    topic: '',
  })
  function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const handleSubmit = (e) => {
    var entier = entierAleatoire(1000, 9999)
    values.destinataire = e.Email
    values.body = 'code :' + entier
    values.topic = 'code de reinitialisation de mot de passe'
    console.log('entier', entier)
    sendMail(values).then((response) => {
      console.log(response.data)
      if (response.status === 200) {
        console.log('data', response.data)
        if (response.data == '') {
          Notification_Echec()
          Vider_champs(e)
        } else {
          confirmation(entier, response.data)
          // Notification_reussi(e);
        }
      } else {
        //  props.loginFailure('Something Wrong!Please Try Again')
      }
    })
  }

  return (
    <Formik
      initialValues={{
        Email: '',
      }}
      validationSchema={Yup.object().shape({
        Email: Yup.string().required('Email est requis').email('Email est invalide'),
      })}
      onSubmit={(values) => handleSubmit(values)}
      render={({ errors, status, touched }) => (
        <div className="page-content3">
          <div className="page-content4">
            <div className="form-v10-content">
              <Form className="form-detail" action="#" method="post" id="myform">
                <div
                  className="form-right"
                  style={{
                    'border-top-left-radius': 10,
                    'border-bottom-left-radius': 10,
                  }}
                >
                  <h2
                    style={{
                      'border-bottom-right-radius': 10,
                      'border-bottom-left-radius': 10,
                    }}
                  >
                    Mot de passe oublié
                  </h2>

                  <div className="label4">
                    {' '}
                    Saisissez votre adresse e-mail pour réinitialiser votre mot de passe.{' '}
                  </div>
                  <div
                    classNameName="form-row2 text-center"
                    style={{ 'text-align': 'center', marginTop: 40 }}
                  >
                    <Field
                      type="Email"
                      id="Email"
                      style={{ 'border-radius': 0, width: 'Auto' }}
                      name="Email"
                      classNameName={
                        ' form-control' + (errors.Email && touched.Email ? ' is-invalid' : '')
                      }
                      placeholder="Email"
                    />
                    <ErrorMessage
                      style={{ fontSize: 12, color: 'red' }}
                      name="Email"
                      component="div"
                      classNameName="invalid-feedback"
                    />
                  </div>

                  <div className="form-row-last" style={{ 'text-align': 'center' }}>
                    <input
                      type="submit"
                      name="register"
                      className="form-control register2"
                      value="Renitialiser"
                    />
                    {/*                  <input type="submit"  onClick={()=>{history.push("/EmailEnvoyeForgetPassword")} }name="register" className="register2" value="Renitialiser"/>
                     */}{' '}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    />
  )
}
export default ForgetPassword
