import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
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
    component: CNavGroup,
    name: 'Gestion Utilisateurs',
    to: '/GestionUtilisateurs',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'les ressources humaines',
        to: '/GestionUtilisateurs/RH',
      },
      {
        component: CNavItem,
        name: 'les employés',
        to: '/GestionUtilisateurs/listeUtilisateurs',
      },
    ],
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
