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
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav_formateur = [
  {
    component: CNavItem,
    name: 'Accueil',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavItem,
    name: 'Mon Compte',
    to: '/GestionCompte/gestioncompte',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Gestion Formation',
    to: '/GestionFormation',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'liste formations',
        to: '/GestionFormation/listeFormation',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestion examens',
    to: '/gestion_examen',
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'gestion_examen',
        to: '/gestion_examen/gestion_examen',
      },
    ],
  },
]

export default _nav_formateur
