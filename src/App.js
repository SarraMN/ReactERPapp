import { Switch } from '@material-ui/core'
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import PropTypes from 'prop-types'
import Login from 'src/views/pages/login/Login'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
//lazy==>improve the performance
//const Login = React.lazy(() => import('./views/pages/login/Login'))
const ForgetPassword = React.lazy(() => import('./views/pages/forgetpassword/ForgetPassword'))
const Reinitialiser_mdp = React.lazy(() =>
  import('./views/pages/Reinitialiser_mdp/Reinitialiser_mdp'),
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route exact path="/ForgetPassword" name="Page 500" element={<ForgetPassword />} />
            <Route
              exact
              path="/Reinitialiser_mdp"
              name="Page 500"
              element={<Reinitialiser_mdp />}
            />
            <Route path="*" name="rtr" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
