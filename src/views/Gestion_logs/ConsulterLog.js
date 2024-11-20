import React, { useEffect, useState } from 'react'
import 'src/views/Reclamation/Reclamation.css'
import 'src/views/Reclamation/ConsulterReclamation.css'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { getAllNotTraitedTimeSheets, filterLogsByCriteria, approveTimeSheet, rejectTimeSheet } from 'src/services/logsService';

import { fetchUserData } from 'src/services/UserService'

import { CCard } from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import 'src/views/Gestion_logs/log.css'

const ConsulterLog = () => {
  const [Bool, setBool] = useState(false)
  const [itemLog, setitemLog] = useState('')

  let log = useLocation()
 

  function accepterLog(id) {
    Swal.fire({
      title: 'Souhaitez-vous accepter ce journal ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Accepter',
      denyButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        // Fetch user data to get approver's ID
        fetchUserData()
          .then((response2) => {
            const approverId = response2.data.id;
  
            // Call the approve API
            approveTimeSheet(id, approverId)
              .then((response) => {
                Swal.fire('Le log a été accepté avec succès!', '', 'success');
                
                setBool(true)
                setBool(false)
              })
              .catch((error) => {
                console.error('Error during approval or list refresh:', error);
                Swal.fire('Une erreur est survenue.', '', 'error');
              });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            Swal.fire('Impossible de récupérer les informations de l\'utilisateur.', '', 'error');
          });
      } else if (result.isDenied) {
        Swal.fire('Aucune modification effectuée.', '', 'info');
      }
    });
  }
  
  

  function refuserLog(id) {
    Swal.fire({
      title: 'Souhaitez-vous Refuser ce journal ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'refuser',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetchUserData()
    .then((response2) => {
        rejectTimeSheet(id,response2.data.id)
          .then((response) => {
            console.log('data', response.data)
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})})
          .catch((e) => {})

        Swal.fire('cette actualité a été supprimé avec succes!', '', 'success')
        getAllNotTraitedTimeSheets()
        .then((response) => {
          console.log(response.data)
          setPosts(response.data)
        })
        .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Aucune modification ', '', 'info')
      }
    })
  }

  useEffect(() => {
    setitemLog(log.state.state)
  }, [Bool])

  return (
    <div className="SuivreReclamation">
     
        <CCard style={{ width: 800, marginTop: '50px' }} className="the_card">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6
                className="text-white ps-3"
                style={{ 'font-weight': 'bold', 'font-size': '22px' }}
              >
                Référence de  journal: {itemLog.id}
                <span style={{ align: 'right', float: 'right' }}>
                
                </span>
              </h6>
            </div>
          </div>
          <div>
            <div className="objet_recl">Titre : {itemLog.taskTitle}</div>
            <div className="objet_recl">
              Description :<br></br>
            </div>
            <div className="contenu_recl">{itemLog.description}</div>
            <span className="objet_recl">
              Date :
            </span>
            <span className="contenu_recl">{itemLog.date}</span>
            <span className="objet_recl">
            Heures travaillées :
            </span>
            <span className="contenu_recl">{itemLog.hoursWorked}</span>
           
            
          </div>
          <div>
            <hr noshade style={{ width: 755, height: 1, border: 1, marginLeft: 15 }}></hr>
            <div style={{ marginTop: 20, marginBottom: 30 }}>

              {itemLog.state == "PENDING" ? (
                            <>              <span style={{ marginLeft: 15,marginRight: 15, fontSize: 15 }}>
                            Ce journal n{"'"}est pas encore traitée. Vouler vous le accepter ou refuser
                          </span>
                                <button
                                className="Button_Accepter"
                                onClick={() => accepterLog(itemLog.id)}
                                >
                                Accepter
                                </button>
                                <button
                                className="Button_Refuser"
                                onClick={() => refuserLog(itemLog.id)}
                                >
                                Refuser
                                </button>
                            </>
                            ) : (
                            
                            <span>
                            {itemLog.state == "APPROVED" ? (
                            <>
                               <span className="state_Accepter"> {itemLog.state}</span>
                            </>
                            ) : (
                            <span className="state_Refuser">{itemLog.state}
                            
                            
                            
                            </span>
                            )}
                            </span>
                            
                            )}
            </div>
          </div>
        </CCard>
    </div>
  )
}
export default ConsulterLog
