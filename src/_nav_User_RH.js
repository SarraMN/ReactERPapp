import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilNotes,
  cilAccountLogout,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { getAllNotTraitedTimeSheets } from 'src/services/logsService'
import { useDispatch, useSelector } from 'react-redux'

function NbrNotTraitedTimeSheets() {
  const dispatch = useDispatch()
  const nbrNotTraitedTimeSheets = useSelector((state) => state.nbrNotTraitedTimeSheets)

  useEffect(() => {
    getAllNotTraitedTimeSheets()
      .then((response) => {
        dispatch({ type: 'set', nbrNotTraitedTimeSheets: response.data.length })
      })
      .catch((e) => {
        console.error('Error fetching time sheets:', e)
      })
  }, [dispatch])

  // Return the badge content or a placeholder
  return <span>{nbrNotTraitedTimeSheets !== undefined ? nbrNotTraitedTimeSheets : '...'}</span>
}

const _nav_User_RH = [
  {
    component: CNavItem,
    name: 'Mon Compte',
    to: '/GestionCompte/gestioncompte',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Journaux',
    to: '/Gestion_logs/ListAllLogs',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: <NbrNotTraitedTimeSheets />,
    },
  },
  {
    component: CNavItem,
    name: 'Congés',
    to: '/GestionCongesRH/CongesAttentes',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: <NbrReclamations />,
    },
  },
  {
    component: CNavItem,
    name: 'Deconnecter',
    to: '/',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav_User_RH
