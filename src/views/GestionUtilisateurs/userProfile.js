import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/userProfile.css'

const userProfile = () => {
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">user name</span>
            <span className="text-black-50">edogaru@mail.com.my</span>
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

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                    style={{
                      height: '50px',
                      width: '250px',
                      'font-size': '18px',
                      'font-weight': 'bold',
                    }}
                  >
                    Examens
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
                      <span> Amdouni</span>
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
                      <span> sirine</span>
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
                      <span> 22929388</span>
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
                      <span> Manouba,mornaguia</span>
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
                      <span> Femme</span>
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
                      <span>Celibataire</span>
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
                      <span> 12/05/2021</span>
                      {/*                       <input type="text" className="form-control" placeholder="Amdouni" value="" />
                       */}{' '}
                    </div>
                    <div className="col-md-6">
                      <label
                        className="labels"
                        style={{ 'font-size': '17px', 'font-weight': 'bold' }}
                      >
                        Date de derniere connexion :
                      </label>
                      <span>26/01/2022</span>
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
                  <h1>hello</h1>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <app-admin-departements></app-admin-departements>
                  <h1>coucou</h1>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default userProfile
