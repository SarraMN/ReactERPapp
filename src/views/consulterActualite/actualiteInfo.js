import React, { useEffect, useState } from 'react'
import { CCard, CPagination, CPaginationItem } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ActualiteInfo = () => {
  let Actualite = useLocation()
  console.log('actualité', Actualite.state)
  return (
    <CCard>
      <div style={{ marginTop: '40px', marginLeft: '40px', marginRight: '50px' }}>
        <section className="section-sm">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="section-title tilte-act" style={{ color: '#3399ff' }}>
                  {Actualite.state.actualite.titre}
                </h2>
              </div>
              <div className="col-8 mb-4" style={{ marginTop: '10px' }}>
                <img
                  src={Actualite.state.actualite.image}
                  className="img-fluid w-100"
                  style={{ width: '50px', height: '250px' }}
                />
              </div>
              <div className="col-4 mb-4">
                <div className="text-left" style={{ marginTop: '60px', marginLeft: '5px' }}>
                  {' '}
                  <i
                    className="fa fa-calendar-o"
                    style={{ fontSize: 30, color: '#3399ff' }}
                    aria-hidden="true"
                  ></i>
                  <span style={{ fontSize: 25, marginLeft: 11, fontFamily: 'serif' }}>
                    Date de publication
                  </span>
                  <p className="mb-0">{Actualite.state.actualite.datecreation}</p>
                </div>
                <div className="text-left" style={{ marginTop: '30px', marginLeft: '5px' }}>
                  {' '}
                  <i
                    className="fa fa-calendar-o"
                    aria-hidden="true"
                    style={{ fontSize: 30, color: '#3399ff' }}
                  ></i>{' '}
                  <span style={{ fontSize: 25, marginLeft: 11, fontFamily: 'serif' }}>
                    {' '}
                    Date d{"'"}éxpiration
                  </span>
                  <p className="mb-0">{Actualite.state.actualite.dateExpiration}</p>
                </div>
              </div>
            </div>
            <div className="row align-items-center mb-5" style={{ marginTop: 15 }}>
              <div className="col-12 mt-4 order-4">
                <div
                  className="border-bottom border-primary"
                  style={{ fontSize: 30, color: '#3399ff' }}
                ></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-50">
                <p
                  style={{
                    'word-wrap': 'break-word',
                    marginBottom: 50,
                    fontSize: 20,
                  }}
                >
                  {Actualite.state.actualite.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CCard>
  )
}

export default ActualiteInfo
