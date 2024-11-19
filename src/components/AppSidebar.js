import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CCardImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import ReactImg from 'src/assets/images/logo3.png'

// sidebar nav config
import navigation from '../_nav'
import _nav_admin from '../_nav_admin'
import { cilSpeedometer, cilMenu } from '@coreui/icons'
import _nav_User_RH from 'src/_nav_User_RH'
import _nav from '../_nav'
import { fetchUserData } from 'src/services/UserService'

let app = navigation

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const app = useSelector((state) => state.app)
  let role
  useEffect(() => {
    fetchUserData().then((response) => {
      console.log('nav bar', response.data.roles[0].authority)

      if (response.data.roles[0].authority === 'Admin') {
        dispatch({ type: 'set', app: _nav_admin })
      }
      if (response.data.roles[0].authority === 'User_Employee') {
        dispatch({ type: 'set', app: _nav })
      }
      if (response.data.roles[0].authority === 'User_RH') {
        dispatch({ type: 'set', app: _nav_User_RH })
      }
    })
  }, [])
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      style={{ backgroundColor: '#213f77' }}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/*         <CCardImage src={ReactImg} alt="tac-tic" width="20" height="50"></CCardImage>
         */}{' '}
        <br></br>
        <h5 style={{ margintop: 50 }}> Menu</h5>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={app} />
        </SimpleBar>
      </CSidebarNav>{' '}
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      ></CSidebarToggler>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
