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
  cilEnvelopeClosed,
  cilUser,
  cilBank,
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
  {
    component: CNavItem,
    name: 'Organismes conventionnés',
    to: '/gestion_organismes_conventionnes/organismes_conventionnes',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
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
        name: 'Les responsables',
        to: '/GestionUtilisateurs/responsables',
      },
      {
        component: CNavItem,
        name: 'liste Candidats',
        to: '/GestionUtilisateurs/listeUtilisateurs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Demandes',
    to: '/gestion_demandes',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inscription formations',
        to: '/gestion_demandes/demandes_inscription_formation',
      },
      {
        component: CNavItem,
        name: 'Inscription examens',
        to: '/gestion_demandes/demandes_inscriptions_examens',
      },
    ],
  },
]

export default _nav_admin
