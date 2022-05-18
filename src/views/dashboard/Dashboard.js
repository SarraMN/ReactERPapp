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
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGJkNjY2NGQtNGViOS00NmViLTk5ZDgtNWM0M2JhMTUzYzYxLyIsImlhdCI6MTY1Mjc2OTgxMywibmJmIjoxNjUyNzY5ODEzLCJleHAiOjE2NTI3NzUwODcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUF4eUZQN24yUCtqc05QV0FhbDZuVG1aZXBJNHcvbEZoYmhKbHE0YUlLRWxmOUhnVG9RYXNpOVp2VDY4enUwSE1RIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImlwYWRkciI6IjE5Ny4yLjMyLjk0IiwibmFtZSI6InNpcmluZWFtZG91bmkiLCJvaWQiOiJkYWIxOWZkZi00MDdiLTRmNDktYWZlZS1lNjBkODZmYzFmNjkiLCJwdWlkIjoiMTAwMzIwMDA2N0MzNzczMCIsInJoIjoiMC5BUjhBVFdiVzI3bE82MGFaMkZ4RHVoVThZUWtBQUFBQUFBQUF3QUFBQUFBQUFBQWZBSlUuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoidmlrQnN0a1dpNTkzM3ItcnhNTlBBQ0tMazZjMnhCNS0xVXpvclFqVzM3byIsInRpZCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsInVuaXF1ZV9uYW1lIjoic2lyaW5lYW1kb3VuaUBpc2cudS10dW5pcy50biIsInVwbiI6InNpcmluZWFtZG91bmlAaXNnLnUtdHVuaXMudG4iLCJ1dGkiOiJzQktrdmpoS2VVR0tVZGt1OURrTEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.D5hTfXRJzuKlbivb3ixE9e6SkJhnd2JWP_-pldvB_HYZRGUbV09wCwW8vMBtbpaf6q3pWajrPL07AWiuXe1gXBXlbKyacy1cmv_lWcwRN4tWlifVz81EyiR04WY-5pndkw9xuzjVzD4km9Ue7QZp5aeK6MWuJx9JdnB-qQQMq-uVD1_yVq8Zf27kNpDpBRXwKPr6NW2yEgqDxfSGm1T0IpaA8VqIPB3rEpoiicJvSgLseNkvd4v1bRQE9WIKmbMUqv16Tmvc1qbw14yfm5uU_fBjdozYpSLnzHm141GdbgZmj5f6y9Sa7k8ADBERwA18cWzMCccS8kk1LHqw6Vf8mA',
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
