import { CCard, CCardImage } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { getformateurs, getusers, deleteuser } from 'src/services/gestionutilisateurs'
import ReactImg from 'src/images/work-1.jpg'
import ReactImg1 from 'src/images/mobile_dev.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/Graphic_designer.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
import { Link, useNavigate } from 'react-router-dom'
import 'src/views/Consulter_formation/formation.css'

const Formations = () => {
  let navigate = useNavigate()

  function voirtous() {
    navigate('/Consulter_formation/formations/tousFormations')
  }
  const voirBycategorie = (C) => {
    console.log('haya c', C)
    navigate('/Consulter_formation/formations/formationsByCategorie', {
      state: { categorie: C },
    })
  }
  return (
    <CCard>
      <div style={{ marginRight: '10px', marginLeft: '5px' }}>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center pb-4">
              <div className="col-md-12 heading-section text-center ">
                <span className="subheading">Commencez à apprendre aujourd hui</span>
                <h2 className="mb-4">Une large sélection de formations</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-3 col-lg-2">
                <div>
                  <a
                    className="course-category img d-flex align-items-center justify-content-center"
                    style={{ backgroundImage: `url(${ReactImg})` }}
                  >
                    {' '}
                    <Link
                      to="/Consulter_formation/formations/formationsByCategorie"
                      state="IT And Software"
                      style={{ 'text-decoration': 'none' }}
                    >
                      <div className="text w-100 text-center" style={{ 'text-decoration': 'none' }}>
                        <h3 style={{ 'text-decoration': 'none' }}>IT &amp; Software</h3>
                      </div>
                    </Link>
                  </a>
                </div>
              </div>
              <div className="col-md-3 col-lg-2">
                <a
                  className="course-category img d-flex align-items-center justify-content-center"
                  style={{ backgroundImage: `url(${ReactImg1})` }}
                >
                  <Link
                    to="/Consulter_formation/formations/formationsByCategorie"
                    state="development mobile"
                    style={{ 'text-decoration': 'none' }}
                  >
                    <div className="text w-100 text-center">
                      <h3>development mobile</h3>
                    </div>
                  </Link>
                </a>
              </div>
              <div className="col-md-3 col-lg-2">
                <a
                  className="course-category img d-flex align-items-center justify-content-center"
                  style={{ backgroundImage: `url(${ReactImg2})` }}
                >
                  <Link
                    to="/Consulter_formation/formations/formationsByCategorie"
                    state="UX Designer"
                    style={{ 'text-decoration': 'none' }}
                  >
                    <div className="text w-100 text-center">
                      <h3>UX Designer</h3>
                    </div>
                  </Link>
                </a>
              </div>
              <div className="col-md-3 col-lg-2">
                <a
                  className="course-category img d-flex align-items-center justify-content-center"
                  style={{ backgroundImage: `url(${ReactImg3})` }}
                >
                  {' '}
                  <Link
                    to="/Consulter_formation/formations/formationsByCategorie"
                    state="Marketing"
                    style={{ 'text-decoration': 'none' }}
                  >
                    <div className="text w-100 text-center">
                      <h3>Marketing</h3>
                    </div>
                  </Link>
                </a>
              </div>
              <div className="col-md-3 col-lg-2">
                <a
                  className="course-category img d-flex align-items-center justify-content-center"
                  style={{ backgroundImage: `url(${ReactImg4})` }}
                >
                  <Link
                    to="/Consulter_formation/formations/formationsByCategorie"
                    state="Graphic Designer"
                    style={{ 'text-decoration': 'none' }}
                  >
                    <div className="text w-100 text-center">
                      <h3>Graphic Designer</h3>
                    </div>
                  </Link>
                </a>
              </div>
              <div className="col-md-3 col-lg-2">
                <a
                  className="course-category img d-flex align-items-center justify-content-center"
                  style={{ backgroundImage: `url(${ReactImg5})` }}
                >
                  <Link
                    to="/Consulter_formation/formations/formationsByCategorie"
                    state="Data Analyst"
                    style={{ 'text-decoration': 'none' }}
                  >
                    <div className="text w-100 text-center">
                      <h3>Data Analyst</h3>
                    </div>
                  </Link>
                </a>
              </div>
              {/*   <div className="col-md-12 text-center mt-5" onClick={voirtous}>
                <a className="btn" style={{ 'background-color': '#213f77', color: 'white' }}>
                  Voir tous les formations
                </a>
              </div> */}
            </div>
          </div>
        </section>
      </div>
      <div className="row justify-content-center pb-4">
        <button
          className="btnAdd justify-content-center"
          onClick={voirtous}
          style={{ width: '200px' }}
        >
          Voir tous les formations
        </button>
      </div>
    </CCard>
  )
}
export default Formations
