import React, { useEffect, useState } from 'react'
import 'src/views/GestionFormation/listeFormation.css'
import Swal from 'sweetalert2'
import { DeleteReclamation, editReclamation } from 'src/services/ReclamationService'
import axios from 'axios'
import { uploadfile, getfile } from 'src/services/fileService'

import 'src/views/Reclamation/Reclamation.css'
import {
  CCard,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CFormInput,
} from '@coreui/react'
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import { useLocation, useNavigate } from 'react-router-dom'

const ConsulterCongeTraite = () => {
  const [bool, setbool] = useState(false)
  const [Bool, setBool] = useState(false)
  const [idDocuemnt, setidDocuemnt] = useState()
  const [logo, setlogo] = useState('')
  const [pAdmin, setPAdmin] = useState('')
  const [itemReclamation, setItemReclamation] = useState('')

  let reclamation = useLocation()

  const [basicActive, setBasicActive] = useState('tab1')

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return
    }

    setBasicActive(value)
  }

  /*getReclamations */
  useEffect(() => {
    DeleteReclamation('1')
      .then((response) => {})
      .catch((e) => {})
    DeleteReclamation(2)
      .then((response) => {})
      .catch((e) => {})
    DeleteReclamation(3)
      .then((response) => {})
      .catch((e) => {})
    DeleteReclamation(4)
      .then((response) => {})
      .catch((e) => {})
    setItemReclamation(reclamation.state.state)
    if (reclamation.state.state.piececand != null) {
      setidDocuemnt(reclamation.state.state.piececand.id)
      console.log('helloo', reclamation.state.state)
      console.log('itemReclamation', itemReclamation)
      getfile(reclamation.state.state.piececand.id).then((response) => {
        setbool(false)
        setlogo(URL.createObjectURL(response.data))
      })
    }
    if (reclamation.state.state.pieceadmin != null) {
      getfile(reclamation.state.state.pieceadmin.id).then((response) => {
        setbool(false)
        setPAdmin(URL.createObjectURL(response.data))
      })
    }
  }, [bool, Bool, idDocuemnt])

  const downloadContractCand = () => {
    var oReq = new XMLHttpRequest()

    oReq.open('GET', logo, true)

    oReq.responseType = 'blob'

    oReq.onload = function () {
      const file = new Blob([oReq.response], { type: 'application/pdf' })

      const fileURL = URL.createObjectURL(file)

      window.open(fileURL, '_blank')
    }

    oReq.send()
  }
  const downloadContractAdmin = () => {
    var oReq = new XMLHttpRequest()

    oReq.open('GET', pAdmin, true)

    oReq.responseType = 'blob'

    oReq.onload = function () {
      const file = new Blob([oReq.response], { type: 'application/pdf' })

      const fileURL = URL.createObjectURL(file)

      window.open(fileURL, '_blank')
    }

    oReq.send()
  }
  return (
    <div className="listeFormation">
      <CCard className="the_card">
        <header className="flex space space-between card-heade">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-account-circle"></i>
            </span>
            Référence: {itemReclamation.id}
          </p>
        </header>
        <MDBTabs fill className="mb-3" style={{ marginTop: 10 }}>
          <MDBTabsItem>
            <MDBTabsLink
              style={{ color: '#140788', border: 1, fontSize: 16, fontWeight: 500 }}
              onClick={() => handleBasicClick('tab1')}
              active={basicActive === 'tab1'}
            >
              <i
                className="fa fa-eye"
                aria-hidden="true"
                style={{ marginLeft: 10, marginRight: 10 }}
              ></i>
              Consulter
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              style={{ color: '#140788', border: 3, fontSize: 16, fontWeight: 500 }}
              onClick={() => handleBasicClick('tab2')}
              active={basicActive === 'tab2'}
            >
              <i
                className="fa fa-comments-o"
                aria-hidden="true"
                style={{ marginLeft: 10, marginRight: 10 }}
              ></i>
              Réponse
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={basicActive === 'tab1'}>
            <div>
              <div className="objet_recl">Objet: {itemReclamation.objet}</div>
              <div className="objet_recl">
                Contenu :<br></br>
              </div>
              <div className="contenu_recl">{itemReclamation.contenu}</div>
            </div>
            {itemReclamation.piececand != null ? (
              <div className="pdf_div">
                <i
                  className="fa fa-file-pdf-o"
                  aria-hidden="true"
                  style={{ marginRight: 12, fontSize: 25, color: '#140788' }}
                ></i>
                <a
                  onClick={() => downloadContractCand()}
                  style={{
                    color: '#140788',
                    marginRight: 10,
                    fontSize: 15,
                  }}
                >
                  Voir pièce justificative
                </a>
              </div>
            ) : (
              <div></div>
            )}
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'tab2'}>
            <div className="objet_recl">
              Réponse :<br></br>
            </div>
            <div className="contenu_recl">{itemReclamation.reponse}</div>
            {itemReclamation.pieceadmin != null ? (
              <div className="pdf_div">
                <i
                  className="fa fa-file-pdf-o"
                  aria-hidden="true"
                  style={{ marginRight: 12, fontSize: 25, color: '#140788' }}
                ></i>
                <a
                  onClick={() => downloadContractAdmin()}
                  style={{
                    color: '#140788',
                    marginRight: 10,
                    fontSize: 15,
                  }}
                >
                  Voir pièce justificative
                </a>
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <hr noshade style={{ width: 755, height: 1, border: 1, marginLeft: 15 }}></hr>
              <div style={{ marginLeft: 15, fontSize: 15, marginTop: 20, marginBottom: 30 }}>
                Cette réclamation a bien été traitée le {itemReclamation.datetraitement}
              </div>
            </div>
          </MDBTabsPane>
        </MDBTabsContent>
      </CCard>
    </div>
  )
}
export default ConsulterCongeTraite
