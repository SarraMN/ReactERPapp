import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav_admin = [
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
  /*   {
    component: CNavTitle,
    name: 'Formation',
  }, */
  {
    component: CNavGroup,
    name: 'Gestion Utilisateurs',
    to: '/GestionUtilisateurs',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'liste Attente',
        to: '/GestionUtilisateurs/listeAttente',
      },
      {
        component: CNavItem,
        name: 'liste utilisateurs',
        to: '/GestionUtilisateurs/listeUtilisateurs',
      },
    ],
  },
]

export default _nav_admin
