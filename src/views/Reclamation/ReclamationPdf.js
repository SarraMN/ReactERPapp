import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CCard, CCol } from '@coreui/react'
import Pdf from 'react-to-pdf'
import 'src/views/GestionReclamation/gestionReclamation.css'

const ReclamationPdf = (props) => {
  const [bool, setBool] = useState(false)
  const ref = React.createRef()
  const options = {
    unit: 'in',
    format: [8, 6],
  }
  return (
    <>
      <div ref={ref}>
        <div style={{ marginTop: 15, marginBottom: 50, fontWeight: 'bold' }}>
          <CCard style={{ border: 'none' }}>
            <CCol md={6}>
              <i
                className="fa fa-user"
                aria-hidden="true"
                style={{ marginRight: 10, color: '#213f77' }}
              ></i>
              {props.reclamation.candidat.nom} {props.reclamation.candidat.prenom}
            </CCol>
            <CCol md={6}>
              <i
                className="fa fa-map-marker"
                aria-hidden="true"
                style={{ marginRight: 10, color: '#213f77' }}
              ></i>
              {props.reclamation.candidat.adresse}
            </CCol>
            <CCol md={8}>
              <i
                className="fa fa-envelope"
                aria-hidden="true"
                style={{ marginRight: 10, color: '#213f77' }}
              ></i>
              {props.reclamation.candidat.email}
            </CCol>
            <CCol md={6}>
              <i
                className="fa fa-phone"
                aria-hidden="true"
                style={{ marginRight: 9, color: '#213f77' }}
              ></i>
              {props.reclamation.candidat.numero_de_telephone}
            </CCol>
          </CCard>
          <div style={{ marginTop: 18, marginLeft: 290, fontWeight: 'bold' }}>
            A Tunis, le {props.reclamation.dateenvoie}
          </div>
        </div>
        <div style={{ marginBottom: 40, fontWeight: 'bold' }}>
          <span style={{ color: '#213f77' }}>Objet:</span> {props.reclamation.objet}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: '#213f77', 'word-wrap': 'break-word' }}>
            Contenu :
          </div>

          <span style={{ borderBlockColor: 'white', border: 0, marginBottom: 30 }}>
            Madame, Monsieur, <br></br> <br></br>
            <p style={{ 'word-wrap': 'break-word' }}>{props.reclamation.contenu}</p>
          </span>
        </div>
        <div style={{ marginLeft: 370, color: ' #213f77', fontWeight: 'bold', marginTop: 20 }}>
          signature
        </div>
      </div>
      <Pdf targetRef={ref} filename="reclamtion.pdf" options={options} x={0.5} y={0.5}>
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
