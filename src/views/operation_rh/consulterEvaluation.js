import React, { useEffect, useState } from 'react'
import 'src/views/Reclamation/Reclamation.css'
import 'src/views/Reclamation/ConsulterReclamation.css'
import { Modal } from 'react-bootstrap'

import { CCard } from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import 'src/views/Gestion_logs/log.css'

const consulterEvaluation = () => {
  const [Bool, setBool] = useState(false)
  const [evaluation, setevaluation] = useState('')

  let evalu = useLocation()
 

  useEffect(() => {
    setevaluation(evalu.state.state)
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
                Référence de  Evaluation: {evaluation.id}
                <span style={{ align: 'right', float: 'right' }}>
                
                </span>
              </h6>
            </div>
          </div>
          <div>
            <div className="objet_recl">
              Employee : <span className="contenu_recl"  style={{
                            color: '#213f77',
                          }}>{evaluation.employee}</span>
            </div>
            
            <span className="objet_recl">
              Date :
            </span>
            <span className="contenu_recl">{evaluation.date}</span>
            <span className="objet_recl">
            Score :
            </span>
            <span className="contenu_recl">{evaluation.score}</span>
           
            <div className="objet_recl">
            feedback :<br></br>
            </div>
            <div className="contenu_recl">{evaluation.feedback}</div>
          </div>
          <div>
            <hr noshade style={{ width: 755, height: 1, border: 1, marginLeft: 15 }}></hr>
            <div style={{ marginLeft :20,marginTop: 20, marginBottom: 30 }}>

            <div className="objet_recl"  style={{
                            fontSize: 25,
                            color: '#213f77',
                          }}>Evaluator : {evaluation.evaluator}</div>

            </div>
          </div>
        </CCard>
    </div>
  )
}
export default consulterEvaluation
