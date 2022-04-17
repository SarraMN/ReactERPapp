import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'
import { useLocation } from 'react-router-dom'
import { getfile } from 'src/services/fileService'
import { getpersonnelsByOrganisme } from 'src/services/organisme_conventionne'

const Organisme_conventionne = () => {
  let ORG = useLocation()
  console.log('amaaan', ORG)
  let [logo, setLogo] = useState()
  let [nbrPersonnels, setNbrPersonnels] = useState()
  let [Personnels, setPersonnels] = useState([])

  const [values] = useState({
    nom: ORG.state.Organisme.nom,
    date_creation: ORG.state.Organisme.date_creation,
    numero_de_telephone: ORG.state.Organisme.numero_de_telephone,
    adresse: ORG.state.Organisme.adresse,
    email: ORG.state.Organisme.email,
    id: ORG.state.Organisme.id,
    logo: '',
  })
  useEffect(() => {
    getfile(ORG.state.Organisme.logo.id)
      .then((response) => {
        values.logo = URL.createObjectURL(response.data)
      })
      .catch((e) => {})
    getpersonnelsByOrganisme(values.id)
      .then((response2) => {
        setNbrPersonnels(response2.data.length)
      })
      .catch((e) => {})
  }, [])

  useEffect(() => {
    getpersonnelsByOrganisme(values.id)
      .then((response2) => {
        console.log('coucoiuuuu', response2)
        setPersonnels(response2.data)
      })
      .catch((e) => {})
  }, [])
  console.log(nbrPersonnels)

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src={values.logo} alt="organisme" />

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
                    Personnels
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
                        Date de creation :
                      </label>
                      <span> {values.date_creation}</span>
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
                        Adresse :
                      </label>
                      <span> {values.adresse}</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Numero de telephone :
                      </label>
                      <span> {values.numero_de_telephone}</span>
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
                        Email:
                      </label>
                      <span> {values.email}</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Nombre des personnels inscrits :
                      </label>
                      <span>{nbrPersonnels}</span>
                      {/*                       <input type="text" className="form-control" value="" placeholder="Prenom" />
                       */}{' '}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <app-admin-etudiant></app-admin-etudiant>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Date de naissance</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Numero de telephone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Personnels.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.id}</th>
                          <td>{item.nom}</td>
                          <td>{item.prenom}</td>
                          <td>{item.date_de_naissance}</td>
                          <td>{item.email}</td>
                          <td>{item.numero_de_telephone}</td>
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
export default Organisme_conventionne
