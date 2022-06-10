import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchUserData, GetformationsCandidat, getUserById } from 'src/services/UserService'
import { getfile } from 'src/services/fileService'
import certificat from './../../assets/images/certificat.jpg'

import { propTypes } from 'react-bootstrap/esm/Image'
import { getCoursById } from 'src/services/CoursService'
import Swal from 'sweetalert2'
import { Accordion, Modal, Button, Nav } from 'react-bootstrap'
import { cilDataTransferDown } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard } from '@coreui/react'

const Certificat = (props) => {
  const [formation, setformation] = useState(props.formation)
  const [candidat, setcandidat] = useState(props.candidat)
  useEffect(() => {
    fetchUserData().then((response) => {
      setcandidat(
        response.data.nom.charAt(0).toUpperCase() +
          response.data.nom.slice(1) +
          ' ' +
          response.data.prenom.toLowerCase(),
      )
    })
  }, [])

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const downloadBtn = document.getElementById('download-btn')

    const image = new Image()
    image.src = certificat
    image.onload = function () {
      drawImage()
    }
    function drawImage() {
      // ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      ctx.font = '40px monotype corsiva'
      ctx.fillStyle = '#29e'
      ctx.fillText(candidat, (897 - (candidat.length * 40) / 2) / 3.5, 350)
      ctx.fillText(formation, (897 - (formation.length * 40) / 2) / 3.5, 450)
    }

    downloadBtn.addEventListener('click', function () {
      downloadBtn.href = canvas.toDataURL('image/jpg')
      downloadBtn.download = 'Certificate - ' + formation
    })
  }, [candidat])

  return (
    <div className="container">
      <br></br>
      <br></br>
      <div style={{ 'text-align': 'center' }}>
        <canvas id="canvas" height="700" width="900"></canvas>

        <a id="download-btn">
          <button
            className="btn btn-outline-primary btn-sm mb-0"
            style={{
              'font-size': '18px',
              'border-color': '#213f77',
              marginRight: 10,
              marginTop: '5px',
            }}
          >
            <CIcon
              icon={cilDataTransferDown}
              customClassName="nav-icon"
              style={{
                width: 20,
                height: 20,
                'margin-right': 5,
              }}
            />
            Telecharger
          </button>
        </a>
      </div>
    </div>
  )
}
Certificat.propTypes = {
  formation: propTypes.string,
  candidat: propTypes.string,
}
export default Certificat
