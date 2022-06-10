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
import Formationcategorie from './Formationcategorie'
import { Link, useNavigate } from 'react-router-dom'
import 'src/views/Consulter_formation/formation.css'

const Formations = () => {
  const [categorie, setcategorie] = useState(false)

  let navigate = useNavigate()

  function voirBycategorie(c) {
    console.log('cou', c)
    setcategorie(c)
  }
  return (
    <div>
      <CCard style={{ marginBottom: '10px' }}>
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
                      <div className="text w-100 text-center" style={{ 'text-decoration': 'none' }}>
                        <h3
                          style={{ 'text-decoration': 'none' }}
                          onClick={() => voirBycategorie('IT And Software')}
                        >
                          IT &amp; Software
                        </h3>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3 col-lg-2">
                  <a
                    className="course-category img d-flex align-items-center justify-content-center"
                    style={{ backgroundImage: `url(${ReactImg1})` }}
                  >
                    <div
                      className="text w-100 text-center"
                      onClick={() => voirBycategorie('development mobile')}
                    >
                      <h3>development mobile</h3>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 col-lg-2">
                  <a
                    className="course-category img d-flex align-items-center justify-content-center"
                    style={{ backgroundImage: `url(${ReactImg2})` }}
                  >
                    <div
                      className="text w-100 text-center"
                      onClick={() => voirBycategorie('UX Designer')}
                    >
                      <h3>UX Designer</h3>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 col-lg-2">
                  <a
                    className="course-category img d-flex align-items-center justify-content-center"
                    style={{ backgroundImage: `url(${ReactImg3})` }}
                  >
                    {' '}
                    <div
                      className="text w-100 text-center"
                      onClick={() => voirBycategorie('Marketing')}
                    >
                      <h3>Marketing</h3>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 col-lg-2">
                  <a
                    className="course-category img d-flex align-items-center justify-content-center"
                    style={{ backgroundImage: `url(${ReactImg4})` }}
                  >
                    <div
                      className="text w-100 text-center"
                      onClick={() => voirBycategorie('Graphic Designer')}
                    >
                      <h3>Graphic Designer</h3>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 col-lg-2">
                  <a
                    className="course-category img d-flex align-items-center justify-content-center"
                    style={{ backgroundImage: `url(${ReactImg5})` }}
                  >
                    <div
                      className="text w-100 text-center"
                      onClick={() => voirBycategorie('Data Analyst')}
                    >
                      <h3>Data Analyst</h3>
                    </div>
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
            className="btnAdd2 justify-content-center"
            style={{ width: '300px', height: '40px', backgroundColor: 'white' }}
            onClick={() => voirBycategorie('voir tous')}
          >
            Voir tous les formations
          </button>
        </div>
      </CCard>
      {categorie === 'Data Analyst' ? (
        <Formationcategorie categorie="Data Analyst"></Formationcategorie>
      ) : (
        <span>
          {categorie === 'Graphic Designer' ? (
            <Formationcategorie categorie="Graphic Designer"></Formationcategorie>
          ) : (
            <span>
              {categorie === 'Marketing' ? (
                <Formationcategorie categorie="Marketing"></Formationcategorie>
              ) : (
                <span>
                  {categorie === 'UX Designer' ? (
                    <Formationcategorie categorie="UX Designer"></Formationcategorie>
                  ) : (
                    <span>
                      {categorie === 'development mobile' ? (
                        <Formationcategorie categorie="development mobile"></Formationcategorie>
                      ) : (
                        <span>
                          {categorie === 'IT And Software' ? (
                            <Formationcategorie categorie="IT And Software"></Formationcategorie>
                          ) : (
                            <div>
                              <Formationcategorie categorie="Data Analyst"></Formationcategorie>
                              <Formationcategorie categorie="Graphic Designer"></Formationcategorie>
                              <Formationcategorie categorie="Marketing"></Formationcategorie>
                              <Formationcategorie categorie="UX Designer"></Formationcategorie>
                              <Formationcategorie categorie="development mobile"></Formationcategorie>
                              <Formationcategorie categorie="IT And Software"></Formationcategorie>
                            </div>
                          )}
                        </span>
                      )}
                    </span>
                  )}
                </span>
              )}
            </span>
          )}
        </span>
      )}
    </div>
  )
}
export default Formations
