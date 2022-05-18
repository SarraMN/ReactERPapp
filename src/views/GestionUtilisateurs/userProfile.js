import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import { useLocation } from 'react-router-dom'
import { GetformationsCandidat, getUserById } from 'src/services/UserService'
import { getfile } from 'src/services/fileService'
import avatar8 from './../../assets/images/profile_homme.png'

const UserProfile = () => {
  let [formations, setFormations] = useState([])

  let userId = useLocation()
  console.log('amaaan', userId)
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
    date_creation: userId.state.utilisateur.createdAt,
    date_derniere_conn: userId.state.utilisateur.lastLogin,
    image: userId.state.utilisateur.image,
    organisme_conventionne: userId.state.utilisateur.organisme_conventionne,
    logo: avatar8,
  })

  useEffect(() => {
    GetformationsCandidat(values.id)
      .then((response) => {
        console.log('hiiii', response.data)
        setFormations(response.data)
      })
      .catch((e) => {})
    if (values.image !== null) {
      getfile(values.image.id)
        .then((response) => {
          console.log('taswira', response)
          values.logo = URL.createObjectURL(response.data)
        })
        .catch((e) => {})
    }
  }, [])
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src={values.logo} alt="user" />
            <span className="font-weight-bold">{values.userName}</span>
            <span className="text-black-50">{values.email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-9 border-right">
          <div className="p-3 py-5">
            <span>
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    style={{
                      height: '50px',
                      width: '250px',
                      'font-size': '18 px',
                      'font-weight': 'bold',
                    }}
                  >
                    informations generales
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    style={{
                      height: '50px',
                      width: '250px',
                      'font-size': '18 px',
                      'font-weight': 'bold',
                    }}
                  >
                    formations
                  </button>
                </li>
              </ul>
              <br></br>

              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="row mt-2">
                    <div className="col-md-6" style={{ paddingtop: 50 }}>
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Nom :
                      </label>
                      <span> {values.nom}</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Prenom :
                      </label>
                      <span> {values.prenom}</span>
                      {/*                       <input type="text" className="form-control" value="" placeholder="Prenom" />
                       */}{' '}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6" style={{ paddingtop: 50 }}>
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Date de naissance :
                      </label>
                      <span> {values.date_de_naissance}</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Adresse :
                      </label>
                      <span> {values.adresse}</span>
                      {/*                       <input type="text" className="form-control" value="" placeholder="Prenom" />
                       */}{' '}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6" style={{ paddingtop: 50 }}>
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Numero de telephone :
                      </label>
                      <span> {values.numero_de_telephone}</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        E-mail :
                      </label>
                      <span> {values.email}</span>
                      {/*                       <input type="text" className="form-control" value="" placeholder="Prenom" />
                       */}{' '}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6" style={{ paddingtop: 50 }}>
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Genre :
                      </label>
                      <span> {values.genre}</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Etat civil :
                      </label>
                      <span> {values.etat_civil}</span>
                      {/*                       <input type="text" className="form-control" value="" placeholder="Prenom" />
                       */}{' '}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6" style={{ paddingtop: 50 }}>
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Date de creation :
                      </label>
                      <span> {values.date_creation}</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Derniere connexion :
                      </label>
                      <span> {values.date_derniere_conn}</span>
                      {/*                       <input type="text" className="form-control" value="" placeholder="Prenom" />
                       */}{' '}
                    </div>
                  </div>
                  {values.organisme_conventionne === null ? (
                    <span></span>
                  ) : (
                    <div className="row mt-2">
                      <div className="col-md-6" style={{ paddingtop: 50 }}>
                        <label
                          className="labels"
                          style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                        >
                          Organisme conventioné :
                        </label>
                        <span> {values.organisme_conventionne.nom}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">titre</th>
                        <th scope="col">categorie</th>
                        <th scope="col">prix</th>
                        <th scope="col">Nombre de cours</th>
                        <th scope="col">Date de creation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formations.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.id}</th>
                          <td>{item.titre}</td>
                          <td>{item.categorie}</td>
                          <td>{item.prix}</td>
                          <td>{item.nbrCours}</td>
                          <td>{item.dateCreation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserProfile
