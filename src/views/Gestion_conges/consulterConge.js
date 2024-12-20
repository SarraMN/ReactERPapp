import React, { useEffect, useState } from 'react'
import 'src/views/Reclamation/Reclamation.css'
import 'src/views/Reclamation/ConsulterReclamation.css'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { deleteLeave } from 'src/services/congesService'

import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import { uploadfile, getfile } from 'src/services/fileService'
import { CCard } from '@coreui/react'
import iconePdf from 'src/images/pdf1.png'
import { useLocation, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPin } from '@coreui/icons'

const consulterConge = () => {
  const [basicActive, setBasicActive] = useState('tab1')
  const [pAdmin, setPAdmin] = useState('')
  const [Bool, setBool] = useState(false)
  const [id, setId] = useState('')
  const [idDocuemnt, setidDocuemnt] = useState()
  const [logo, setlogo] = useState('')
  const [itemConge, setitemConge] = useState('')
  let conge = useLocation()
  let navigate = useNavigate()

  const [showPDF, setShowPDF] = useState(false)
  const handleShowPDF = () => setShowPDF(true)
  const handleCloseAjt = () => {
    setShowPDF(false)
  }
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return
    }

    setBasicActive(value)
  }
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
  function supprimerConge(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer ce congé?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteLeave(id)
          .then((response) => {
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})

        Swal.fire('cet congé a été supprimé avec succes!', '', 'success')
        navigate('/Gestion_conges/ListeCongess')
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  /*getCongesList */
  useEffect(() => {
    setitemConge(conge.state.state)
    console.log(conge.state.state)
    console.log('status', conge.state.state.status)
    if (conge.state.state.pieceJointe != null) {
      setidDocuemnt(conge.state.state.pieceJointe.id)
      getfile(idDocuemnt).then((response) => {
        setlogo(URL.createObjectURL(response.data))
      })
    }
  }, [Bool, idDocuemnt])

  return (
    <div className="SuivreReclamation">
      {itemConge.status != "PENDING" ? (
        <CCard className="the_card" style={{ marginTop: '50px' }}>
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                Référence: {itemConge.id}
              </h6>
            </div>
          </div>
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
                <div className="objet_recl">Type: {itemConge.type}</div>
                <div className="objet_recl">Description du congé :</div>
                <div className="contenu_recl">{itemConge.description}</div>
                <div style={{ marginBottom: 15 }}>
                    <span className="objet_recl">
                        Date de début :
                    </span>
                    <span className="contenu_recl">{itemConge.startDate}</span>
                    <span className="objet_recl">
                        Date de Fin :
                    </span>
                    <span className="contenu_recl">{itemConge.endDate}</span>
                </div>
              </div>
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
              
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab2'}>
              <div className="objet_recl">
                Réponse :<br></br>
              </div>
              <div className="contenu_recl" style={{ marginBottom: 15 }}>
                Ce congé a été :
                {itemConge.status === "APPROVED" && (
                    <>
                    <strong style={{ color: 'green' }}> Approuvé</strong> par {itemConge.approvedBy?.username}.
                    </>
                )}
                {itemConge.status === "REJECTED" && (
                    <>
                    <strong style={{ color: 'red' }}> Rejeté</strong> par {itemConge.approvedBy?.username}.
                    </>
                )}
                </div>
              <div>
                <hr noshade style={{ width: 755, height: 1, border: 1, marginLeft: 15 }}></hr>
                <div style={{ marginLeft: 15, fontSize: 15, marginTop: 20, marginBottom: 30 }}>
                  Ce congé a bien été traité !
                </div>
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </CCard>
      ) : (
        <CCard style={{ width: 800, marginTop: '50px' }} className="the_card">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                Référence de la reclamation: {itemConge.id}
                <span style={{ align: 'right', float: 'right' }}>
                  <img
                    src={iconePdf}
                    onClick={handleShowPDF}
                    alt="télécharger"
                    title="télécharger"
                    style={{
                      width: 110,
                      height: 70,
                      paddingBottom: 20,
                      paddingRight: 20,
                    }}
                  />
                </span>
              </h6>
            </div>
          </div>
          <Modal
            show={showPDF}
            onHide={handleCloseAjt}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}
            >
              <CIcon
                icon={cilPin}
                style={{
                  marginRight: 15,
                }}
              />
              Référence de la réclamation : {itemConge.id}{' '}
            </Modal.Header>
          </Modal>
          <div>
            <div className="objet_recl">Type: {itemConge.type}</div>
            <div className="objet_recl">
              Description :<br></br>
            </div>
            <div className="contenu_recl">{itemConge.description}</div>
            <span className="objet_recl">
              Date de début :
            </span>
            <span className="contenu_recl">{itemConge.startDate}</span>
            <span className="objet_recl">
              Date de Fin :
            </span>
            <span className="contenu_recl">{itemConge.endDate}</span>
          </div>
            {itemConge.pieceJointe != null ? (
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
          <div>
            <hr noshade style={{ width: 755, height: 1, border: 1, marginLeft: 15 }}></hr>
            <div style={{ marginTop: 20, marginBottom: 30 }}>
              <div style={{ marginLeft: 15, fontSize: 15 }}>
                Votre congé n{"'"}est pas encore traitée. Vouler vous la supprimer
              </div>
              <button
                className="btn-Aj-Recl"
                style={{
                  width: 150,
                  marginRight: 20,
                  marginBottom: 20,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
                onClick={(id) => {
                  supprimerConge(itemConge.id)
                }}
              >
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  style={{ marginRight: 10, fontSize: 18 }}
                ></i>
                Supprimer
              </button>
            </div>
          </div>
        </CCard>
      )}
    </div>
  )
}
export default consulterConge
