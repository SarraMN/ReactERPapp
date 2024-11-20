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
  cilNewspaper,
  cilWarning,
  cilAccountLogout,
  cilEnvelopeopen,
  cilClone,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, GetformationsCandidat } from './services/UserService'

function NbrFormationCandidat() {
  const dispatch = useDispatch()
  const nbrFormations = useSelector((state) => state.nbrFormations)

  fetchUserData()
    .then((response2) => {
      GetformationsCandidat(response2.data.id)
        .then((response) => {
          console.log('ya halla', response.data)
          dispatch({ type: 'set', nbrFormations: response.data.length })
        })
        .catch((e) => {})
    })
    .catch((e) => {})
  return nbrFormations
}
const _nav = [
  {
    component: CNavItem,
    name: 'Accueil',
    to: '/accueil',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Mon Compte',
    to: '/GestionCompte/gestioncompte',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mes congés',
    to: '/Gestion_conges/ListeConges',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mes congés',
    to: '/Gestion_logs/ListMesLogs',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les actualités',
    to: '/consulterActualite/consulterActualite',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reclamation',
    to: '/Reclamations/SuiviReclamations',
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Suivre demandes',
    to: '/suivreDemande/suivreDemandes',
    icon: <CIcon icon={cilClone} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Deconnecter',
    to: '/',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav
