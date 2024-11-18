import React, { useEffect, useState } from 'react'
import 'src/views/Reclamation/Reclamation.css'
import 'src/views/Reclamation/ConsulterReclamation.css'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { DeleteReclamation, ReclamationByIdCandidat } from 'src/services/ReclamationService'
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit'
import { uploadfile, getfile } from 'src/services/fileService'
import { CCard } from '@coreui/react'
import iconePdf from 'src/images/pdf1.png'
import { useLocation, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPin } from '@coreui/icons'

const ConsulterReclamation = () => {
  const [basicActive, setBasicActive] = useState('tab1')
  const [pAdmin, setPAdmin] = useState('')
  const [Bool, setBool] = useState(false)
  const [id, setId] = useState('')
  const [idDocuemnt, setidDocuemnt] = useState()
  const [logo, setlogo] = useState('')
  const [itemReclamation, setItemReclamation] = useState('')
  const [piece, setPiece] = useState('')
  const ref = React.createRef()
  const [values, setValues] = useState({
    id: '',
    objet: '',
    contenu: '',
    reponse: '',
    traitee: '',
    candidat: { id: '', authority: {} },
  })
  let reclamation = useLocation()
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

  function supprimerReclamation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cette reclamation ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DeleteReclamation(id)
          .then((response) => {
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})

        Swal.fire('cette reclamation a été supprimé avec succes!', '', 'success')
        navigate('/Reclamations/SuiviReclamations')
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })
  }
  /*getReclamations */
  useEffect(() => {
    setItemReclamation(reclamation.state.state)
    console.log(reclamation.state.state)
    console.log('piece', reclamation.state.state.piececand)
    if (reclamation.state.state.piececand != null) {
      setidDocuemnt(reclamation.state.state.piececand.id)
      getfile(idDocuemnt).then((response) => {
        setlogo(URL.createObjectURL(response.data))
      })
    }
    if (reclamation.state.state.traitee == true && reclamation.state.state.pieceadmin != null) {
      getfile(reclamation.state.state.pieceadmin.id).then((response) => {
        setPAdmin(URL.createObjectURL(response.data))
      })
    }
  }, [Bool, idDocuemnt])

  return (
    <div className="SuivreReclamation">
      {itemReclamation.traitee === true ? (
        <CCard className="the_card" style={{ marginTop: '50px' }}>
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                Référence: {itemReclamation.id}
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
                <div className="objet_recl">Objet: {itemReclamation.objet}</div>
                <div className="objet_recl">
                  Contenu :<br></br>
                </div>
                <div className="contenu_recl">{itemReclamation.contenu}</div>
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
              ,
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
      ) : (
        <CCard style={{ width: 800, marginTop: '50px' }} className="the_card">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                Référence de la reclamation: {itemReclamation.id}
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
              Référence de la réclamation : {itemReclamation.id}{' '}
            </Modal.Header>
          </Modal>
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
          <div>
            <hr noshade style={{ width: 755, height: 1, border: 1, marginLeft: 15 }}></hr>
            <div style={{ marginTop: 20, marginBottom: 30 }}>
              <div style={{ marginLeft: 15, fontSize: 15 }}>
                Votre réclamation n{"'"}est pas encore traitée. Vouler vous la supprimer
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
                  supprimerReclamation(itemReclamation.id)
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
export default ConsulterReclamation
