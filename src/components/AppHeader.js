import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CCardImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import ReactImg from 'src/assets/images/logo3.png'
import { fetchUserData } from 'src/services/UserService'

const AppHeader = () => {
  const dispatch = useDispatch()
  const [nom, setnom] = useState()
  const [prenom, setprenom] = useState()

  const sidebarShow = useSelector((state) => state.sidebarShow)
  useEffect(() => {
    fetchUserData().then((response) => {
      setnom(response.data.nom)
      setprenom(response.data.prenom)
    })
  }, [])
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CCardImage src={ReactImg} alt="tac-tic" width="20" height="50"></CCardImage>
        </CHeaderNav>
        <p style={{ 'font-family': 'cursive', marginTop: '20px' }}>
          Bienvenue {nom} {prenom}
        </p>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
