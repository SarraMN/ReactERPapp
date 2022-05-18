import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CCard, CCol } from '@coreui/react'
import Pdf from 'react-to-pdf'
import 'src/views/GestionReclamation/gestionReclamation.css'

const ReclamationPdf = (props) => {
  const ref = React.createRef()
  return (
    <>
      <div ref={ref}>
        <div style={{ marginTop: 15, marginBottom: 50, fontWeight: 'bold' }}>
          {console.log('réreclamation', props.reclamation)}
          <CCard style={{ 'background-color': '#D5E6F3' }}>
            <CCol md={6}>
              <i
                className="fa fa-user"
                aria-hidden="true"
                style={{ marginRight: '3px', color: '#213f77' }}
              ></i>
              {props.reclamation.candidat.nom} {props.reclamation.candidat.prenom}
            </CCol>
            <CCol md={6}>
              <i
                className="fa fa-map-marker"
                aria-hidden="true"
                style={{ marginRight: '3px', color: '#213f77' }}
              ></i>
              {props.reclamation.candidat.adresse}
            </CCol>
            <CCol md={6}>
              <i
                className="fa fa-phone"
                aria-hidden="true"
                style={{ marginRight: '3px', color: '#213f77' }}
              ></i>
              {props.reclamation.candidat.numero_de_telephone}
            </CCol>
          </CCard>
        </div>
        <div style={{ marginBottom: 50, fontWeight: 'bold' }}>
          <span style={{ color: '#213f77' }}>Objet:</span> {props.reclamation.objet}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: '#213f77', 'word-wrap': 'break-word' }}>
            Contenu:
          </div>

          <span style={{ borderBlockColor: 'white', border: 0, marginBottom: 30 }}>
            Madame, Monsieur, <br></br> <br></br>
            <p style={{ 'word-wrap': 'break-word' }}>{props.reclamation.contenu}</p>
          </span>
        </div>
      </div>
      <Pdf targetRef={ref} filename="reclamtion.pdf">
        {({ toPdf }) => (
          <button
            className="btn-Aj-Recl "
            style={{
              width: 400,
              marginBottom: 20,
              marginLeft: 35,
              marginTop: 60,
            }}
            onClick={toPdf}
          >
            <i
              className="fa fa-download"
              aria-hidden="true"
              style={{ marginRight: 10, fontSize: 18 }}
            ></i>
            Télécharger réclamation
          </button>
        )}
      </Pdf>
    </>
  )
}
ReclamationPdf.propTypes = {
  reclamation: PropTypes.any,
}
export default ReclamationPdf
