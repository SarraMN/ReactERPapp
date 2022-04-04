import { CCardImage } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { getformateurs, getusers, deleteuser } from 'src/services/gestionutilisateurs'
import ReactImg from 'src/images/work-1.jpg'
import ReactImg1 from 'src/images/work-9.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/work-8.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
const Formations = () => {
  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center pb-4">
            <div className="col-md-12 heading-section text-center ">
              <span className="subheading">Commencez à apprendre aujourd hui</span>
              <h2 className="mb-4">Une large sélection de cours</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-3 col-lg-2">
              <a
                href="#"
                className="course-category img d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url(${ReactImg})` }}
              >
                <div className="text w-100 text-center">
                  <h3>IT &amp; Software</h3>
                  <span>100 course</span>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-lg-2">
              <a
                href="#"
                className="course-category img d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url(${ReactImg1})` }}
              >
                <div className="text w-100 text-center">
                  <h3>Music</h3>
                  <span>100 course</span>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-lg-2">
              <a
                href="#"
                className="course-category img d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url(${ReactImg2})` }}
              >
                <div className="text w-100 text-center">
                  <h3>Photography</h3>
                  <span>100 course</span>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-lg-2">
              <a
                href="#"
                className="course-category img d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url(${ReactImg3})` }}
              >
                <div className="text w-100 text-center">
                  <h3>Marketing</h3>
                  <span>100 course</span>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-lg-2">
              <a
                href="#"
                className="course-category img d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url(${ReactImg4})` }}
              >
                <div className="text w-100 text-center">
                  <h3>Health</h3>
                  <span>100 course</span>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-lg-2">
              <a
                href="#"
                className="course-category img d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url(${ReactImg5})` }}
              >
                <span className="text w-100 text-center">
                  <h3>Audio Video</h3>
                  <span>100 course</span>
                </span>
              </a>
            </div>
            <div className="col-md-12 text-center mt-5">
              <a href="#" className="btn" style={{ 'background-color': '#213f77', color: 'white' }}>
                Voir tous les cours
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Formations
