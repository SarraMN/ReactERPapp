import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { PowerBIEmbed } from 'powerbi-client-react'
import { models } from 'powerbi-client'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import 'src/App.css'

const Dashboard = () => {
  return (
    <div>
      <PowerBIEmbed
        embedConfig={{
          type: 'report', // Supported types: report, dashboard, tile, visual and qna
          id: 'a936cd5b-2f3a-433a-821e-412dcff6ad2b',
          embedUrl:
            'https://app.powerbi.com/reportEmbed?reportId=a936cd5b-2f3a-433a-821e-412dcff6ad2b&groupId=f7f3f532-be5c-4571-955d-9300715cdfc7',
          accessToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGJkNjY2NGQtNGViOS00NmViLTk5ZDgtNWM0M2JhMTUzYzYxLyIsImlhdCI6MTY1MjkwODEyNSwibmJmIjoxNjUyOTA4MTI1LCJleHAiOjE2NTI5MTM0NjgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFXbUwrOXNjTVRRZDh0TVNQKythc3orQy8vc0hGdXE0dTJRSXpPV3AwL0RpTHVXVThGU0lmMlVJeG5LNUpkUjFjIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImlwYWRkciI6IjE5Ny4yMzguODEuMTYyIiwibmFtZSI6InNpcmluZWFtZG91bmkiLCJvaWQiOiJkYWIxOWZkZi00MDdiLTRmNDktYWZlZS1lNjBkODZmYzFmNjkiLCJwdWlkIjoiMTAwMzIwMDA2N0MzNzczMCIsInJoIjoiMC5BUjhBVFdiVzI3bE82MGFaMkZ4RHVoVThZUWtBQUFBQUFBQUF3QUFBQUFBQUFBQWZBSlUuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoidmlrQnN0a1dpNTkzM3ItcnhNTlBBQ0tMazZjMnhCNS0xVXpvclFqVzM3byIsInRpZCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsInVuaXF1ZV9uYW1lIjoic2lyaW5lYW1kb3VuaUBpc2cudS10dW5pcy50biIsInVwbiI6InNpcmluZWFtZG91bmlAaXNnLnUtdHVuaXMudG4iLCJ1dGkiOiJzSU9tTzdXbWFVU2dPbnZyNERBRUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.O8aNtDiCQX04RUjKWUdQJO1jHhP2Pyant5ppMCkMh-4x4RZpu1p6FOKweB1ko-Kq0ZSaNMmIqTn2MUDuQ9NOz40GdBdT7TfpjzJl_AU4CiJLO0ZOJ0xuvz2N1M_sUglQ7qc5px7XTHO3ok19b9YkEe9Su5SDeruPXmRWDDG5gtr50KjUxFWCCBjb41hwQ06v8BKzrHaB_gQRI4rPzo8-EvVcizMM13969pjm4zdGxOtiA8MAZ1_7GR72ZlosO3bkzhAI4e0UjPjufuQIoshIR3jej-zeNOrq-zmCwh1ZZAtGwmgu35KKpIdPG30BY2cQAeGmfP7Y9KVH-pi47EPMQA',
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                visible: false,
              },
              pageNavigation: {
                visible: false,
              },
            },
          },
        }}
        eventHandlers={
          new Map([
            [
              'loaded',
              function () {
                console.log('Report loaded')
              },
            ],
            [
              'rendered',
              function () {
                console.log('Report rendered')
              },
            ],
            [
              'error',
              function (event) {
                console.log(event.detail)
              },
            ],
          ])
        }
        cssClassName={'Embed-container'}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport
        }}
      />
    </div>
  )
}

export default Dashboard
