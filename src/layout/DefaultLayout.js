import React, { useEffect, useState } from 'react'
import { fetchUserData } from 'src/services/UserService'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  /*   let role = ''
  fetchUserData().then((response) => {
    console.log('nav bar', response.data.roles[0].authority)

    if (response.data.roles[0].authority === 'Admin') {
      role = 'Dashboard'
    }
    if (response.data.roles[0].authority === 'User_Candidat') {
      role = 'Accueil'
    }
    if (response.data.roles[0].authority === 'User_Professer') {
      role = 'Dashboard'
    }
  }) */
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
