import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilFeaturedPlaylist,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSchool,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav_formateur = [
  {
    component: CNavItem,
    name: 'Mon Compte',
    to: '/GestionCompte/gestioncompte',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Gestion formations',
    to: '/GestionFormation/listeFormation',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Gestion examens',
    to: '/gestion_examen/gestion_examen',
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Deconnecter',
    to: '/',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav_formateur
