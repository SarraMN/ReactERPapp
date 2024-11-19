import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { fetchUserData } from 'src/services/UserService'

const AppContent = () => {
  let role = ''
  function test() {
    fetchUserData().then((response) => {
      console.log('nav bar', response.data.roles[0].authority)

      if (response.data.roles[0].authority === 'Admin') {
        role = 'Admin'
        return <Route path="/*" element={<Navigate to="Utilisateurs" replace />} />
      }
      if (response.data.roles[0].authority === 'User_RH') {
        role = 'User_Candidat'
        return <Route path="/accueil" element={<Navigate to="Accueil" replace />} />
      }
      if (response.data.roles[0].authority === 'User_Employee') {
        role = 'User_Professer'
        return <Route path="/*" element={<Navigate to="Utilisateurs" replace />} />
      }
    })
    console.log('al role', role)
  }

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/*" element={<Navigate to="Utilisateurs" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
