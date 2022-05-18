import React, { useEffect, useState } from 'react'
import images from 'src/assets/images/Software-development.jpg'
import { CCard, CPagination, CPaginationItem } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { uploadfile, getfile } from 'src/services/fileService'
import { getAllActualitesForCandidat } from 'src/services/actualiteService'
import CIcon from '@coreui/icons-react'
import { cilFeaturedPlaylist } from '@coreui/icons'

const ActualiteInfo = () => {
  let Actualite = useLocation()
  console.log('khraya', Actualite.state)
  return (
    <CCard>
      <div style={{ marginTop: '60px', marginLeft: '50px', marginRight: '50px' }}>
        <section className="section-sm">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="section-title">{Actualite.state.actualite.titre}</h2>
              </div>
              <div className="col-12 mb-4">
                <img
                  src={Actualite.state.actualite.image}
                  alt="event thumb"
                  className="img-fluid w-100"
                  style={{ width: '200px', height: '370px' }}
                />
              </div>
            </div>
            <div className="row align-items-center mb-5">
              <div className="col-lg-9">
                <ul className="list-inline">
                  <li className="list-inline-item mr-xl-5 mr-4 mb-3 mb-lg-0">
                    <div className="d-flex align-items-center">
                      <i className="ti-location-pin text-primary icon-md mr-2"></i>
                      <div className="text-left">
                        <h6 className="mb-0">
                          {' '}
                          <i className="fa fa-calendar" aria-hidden="true">
                            {' '}
                            Date de publication
                          </i>
                        </h6>{' '}
                        <p className="mb-0">{Actualite.state.actualite.datecreation}</p>
                      </div>
                    </div>
                  </li>
                  <li className="list-inline-item mr-xl-5 mr-4 mb-3 mb-lg-0">
                    <div className="d-flex align-items-center">
                      <i className="ti-calendar text-primary icon-md mr-2"></i>
                      <div className="text-left">
                        <h6>
                          {' '}
                          <i className="fa fa-calendar" aria-hidden="true">
                            {' '}
                            Date d{"'"}expiration
                          </i>
                        </h6>
                        <p className="mb-0">{Actualite.state.actualite.dateExpiration}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-12 mt-4 order-4">
                <div className="border-bottom border-primary"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-50">
                <h3>Article:{Actualite.state.actualite.titre}</h3>
                <p style={{ 'word-wrap': 'break-word' }}>{Actualite.state.actualite.description}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CCard>
  )
}

export default ActualiteInfo
