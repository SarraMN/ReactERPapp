import React, { useEffect } from 'react'
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
  cilNewspaper,
  cilWarning,
  cilAccountLogout,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { getdemandes_ins_formations } from './services/demandes_inscriptionService'
import { ReclamationsNonTraitees } from './services/ReclamationService'
import { useDispatch, useSelector } from 'react-redux'

function NbrDemandes() {
  const dispatch = useDispatch()
  const nbrDemandes = useSelector((state) => state.nbrDemandes)
  getdemandes_ins_formations()
    .then((response) => {
      dispatch({ type: 'set', nbrDemandes: response.data.length })
    })
    .catch((e) => {})
  return nbrDemandes
}
function NbrReclamations() {
  const dispatch = useDispatch()
  const nbrReclamations = useSelector((state) => state.nbrReclamations)
  ReclamationsNonTraitees()
    .then((response) => {
      dispatch({ type: 'set', nbrReclamations: response.data.length })
    })
    .catch((e) => {})
  return nbrReclamations
}
const _nav_admin = [
  {
    component: CNavItem,
    name: 'Les organisation',
    to: '/gestion_organismes_conventionnes/organismes_conventionnes',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
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
    component: CNavItem,
    name: 'Demandes',
    to: '/gestion_demandes/demandes_inscription_formation',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: <NbrDemandes />,
    },
  },
  {
    component: CNavItem,
    name: 'Actualités',
    to: '/Gestion_Actualite/Actualites',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reclamations',
    to: '/GestionReclamation/ReclamationAttentes',
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: <NbrReclamations />,
    },
  },
  {
    component: CNavItem,
    name: 'Deconnecter',
    to: '/',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav_admin
