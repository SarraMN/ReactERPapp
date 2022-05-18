import React, { useEffect, useState } from 'react'
import 'src/views/Consulter_formation/formation.css'
import photo1 from 'src/assets/images/Software-development.jpg'
import { CCard, CPagination, CPaginationItem } from '@coreui/react'
import { getFormations } from 'src/services/FormationService'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { uploadfile, getfile } from 'src/services/fileService'
import ReactImg from 'src/images/work-1.jpg'
import ReactImg1 from 'src/images/mobile_dev.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/Graphic_designer.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
import Formationcategorie from './Formationcategorie'
const FormationsByCategorie = () => {
  let formation = useLocation()

  return (
    <div>
      <Formationcategorie categorie={formation.state}></Formationcategorie>
    </div>
  )
}
export default FormationsByCategorie
