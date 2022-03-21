import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { update_motdepasseoublie } from 'src/services/UserService'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'src/views/pages/Reinitialiser_mdp/reinitialiser_mdp.css'

const Reinitialiser_mdp = () => {
  let navigate = useNavigate()

  let userId = useLocation()
  const [values] = useState({
    userName: userId.state.utilisateur.userName,
    password: userId.state.utilisateur.password,
    nom: userId.state.utilisateur.nom,
    prenom: userId.state.utilisateur.prenom,
    date_de_naissance: userId.state.utilisateur.date_de_naissance,
    numero_de_telephone: userId.state.utilisateur.numero_de_telephone,
    adresse: userId.state.utilisateur.adresse,
    etat_civil: userId.state.utilisateur.etat_civil,
    email: userId.state.utilisateur.email,
    genre: userId.state.utilisateur.genre,
    authority: userId.state.utilisateur.authority,
    id: userId.state.utilisateur.id,
  })

  function Notification_succes() {
    Swal.fire({
      title: 'La reinitialisation du mot de passe a été effectuée avec succès.',
      confirmButtonText: 'Valider',
      preConfirm: (code) => {
        navigate('/')
      },
    })
  }
  const handleSubmit = (e) => {
    values.password = e.password

    update_motdepasseoublie(values)
      .then((response) => {
        if (response.status === 200) {
          //  props.setUser(response.data);
          //  props.history.push('/');
          Notification_succes()
        } else {
          //   props.loginFailure('Something Wrong!Please Try Again')
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log('401 status')
              break
            case 400:
              console.log('400 status')
              alert('hi')
              break
            default:
          }
        } else {
        }
      })
  }
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(6, 'Le mot de passe doit être au moins de 6 caractères')
          .required('Le mot de passe est requis'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'les mots de passe doivent correspondre')
          .required('Confirmer le mot de passe est requis'),
      })}
      onSubmit={(values) => handleSubmit(values)}
      render={({ errors, status, touched }) => (
        <div className="page-content3">
          <div className="page-content4">
            <div className="form-v10-content">
              <Form className="form-detail" action="#" method="post" id="myform">
                <div
                  className="form-right"
                  style={{ 'border-top-left-radius': 10, 'border-bottom-left-radius': 10 }}
                >
                  <h2 style={{ 'border-bottom-right-radius': 10, 'border-bottom-left-radius': 10 }}>
                    Reinitialiser le mot de passe
                  </h2>

                  <div className="label5">
                    {' '}
                    saisissez un nouveau mot de passe pour votre compte.
                  </div>

                  <div className="form-row-last">
                    <div classNameName="form-row3">
                      <Field
                        type="password"
                        id="password"
                        style={{ 'border-radius': 0 }}
                        name="password"
                        classNameName={
                          ' form-control' +
                          (errors.password && touched.password ? ' is-invalid' : '')
                        }
                        placeholder="password"
                      />
                      <ErrorMessage
                        style={{ fontSize: 12, color: 'red' }}
                        name="password"
                        component="div"
                        classNameName="invalid-feedback"
                      />
                      {/*              <input type="password"   required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" placeholder="Mot de passe"/>
                       */}{' '}
                      <br></br>
                      <br></br>
                      <Field
                        type="password"
                        id="confirmPassword"
                        style={{ 'border-radius': 0 }}
                        name="confirmPassword"
                        classNameName={
                          ' form-control' +
                          (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                        }
                        placeholder="Confirmer le mot de passe"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        style={{ fontSize: 12, color: 'red' }}
                        component="div"
                        classNameName="invalid-feedback"
                      />
                      {/*               <input type="password"   required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" placeholder="Confirmer mot de passe"/>
                       */}{' '}
                    </div>

                    <input
                      type="submit"
                      name="register"
                      className="register3"
                      value="Réinitialiser"
                      style={{ marginTop: 50 }}
                    />
                    <br></br>
                    <br></br>
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
export default Reinitialiser_mdp
