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
        return <Route path="/*" element={<Navigate to="Dashboard" replace />} />
      }
      if (response.data.roles[0].authority === 'User_Candidat') {
        role = 'User_Candidat'
        return <Route path="/accueil" element={<Navigate to="Accueil" replace />} />
      }
      if (response.data.roles[0].authority === 'User_Professer') {
        role = 'User_Professer'
        return <Route path="/*" element={<Navigate to="Dashboard" replace />} />
      }
    })
    console.log('al role', role)
  }
  /*     console.log('ach ja', role)
    if (role.role === 'Admin')
      return <Route path="/dashboard" element={<Navigate to="Dashboard" replace />} />
    else if (role.role === 'User_Candidat')
      return <Route path="/accueil" element={<Navigate to="Accueil" replace />} />
    else return <Route path="/*" element={<Navigate to="Accueil" replace />} /> */
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
          {/*           {test()}
           */}{' '}
          {/*           <Route path="/*" element={<Navigate to="Dashboard" replace />} />{' '}
           */}{' '}
          <Route path="/*" element={<Navigate to="Dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
