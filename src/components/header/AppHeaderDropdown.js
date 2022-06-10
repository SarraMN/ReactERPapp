import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilSpeedometer,
  cilFolderOpen,
  cilSchool,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import { uploadfile, getfile } from 'src/services/fileService'
import { userLogin, fetchUserData } from 'src/services/UserService'

import avatar8 from './../../assets/images/profile_homme.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const AppHeaderDropdown = () => {
  const [profileimg, setProfileimg] = useState(avatar8)
  const [role, setRole] = useState()
  let navigate = useNavigate()

  function FDeconnecter() {
    navigate('/')
  }
  function GestionDemandes() {
    navigate('./views/gestion_demandes/demandes_inscription_formation')
  }
  const dispatch = useDispatch()
  let image = useSelector((state) => state.image)
  useEffect(() => {
    fetchUserData().then((response) => {
      setRole(response.data.roles[0].authority)
      if (response.data.idimage !== 0) {
        getfile(response.data.idimage)
          .then((response) => {
            setProfileimg(URL.createObjectURL(response.data))
            dispatch({ type: 'set', image: URL.createObjectURL(response.data) })
          })
          .catch((e) => {})
      } else {
        dispatch({ type: 'set', image: avatar8 })
      }
    })
  }, [])
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={image} size="md" />
      </CDropdownToggle>
      {role === 'Admin' ? (
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Mon compte</CDropdownHeader>
          <CDropdownItem onClick={() => FDeconnecter()}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Deconnecter
          </CDropdownItem>
        </CDropdownMenu>
      ) : (
        <div>
          {role === 'User_Candidat' ? (
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownHeader className="bg-light fw-semibold py-2">Mon compte</CDropdownHeader>

              <CDropdownDivider />
              <CDropdownItem onClick={() => FDeconnecter()}>
                <CIcon icon={cilLockLocked} className="me-2" />
                Deconnecter
              </CDropdownItem>
            </CDropdownMenu>
          ) : (
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownHeader className="bg-light fw-semibold py-2">Mon compte</CDropdownHeader>

              <CDropdownItem onClick={() => FDeconnecter()}>
                <CIcon icon={cilLockLocked} className="me-2" />
                Deconnecter
              </CDropdownItem>
            </CDropdownMenu>
          )}
        </div>
      )}
    </CDropdown>
  )
}

export default AppHeaderDropdown
