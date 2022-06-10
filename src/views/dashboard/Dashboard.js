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
          id: '05d5549c-4581-441f-a8d0-f627dfde20ac',
          embedUrl:
            'https://app.powerbi.com/reportEmbed?reportId=05d5549c-4581-441f-a8d0-f627dfde20ac&groupId=f7f3f532-be5c-4571-955d-9300715cdfc7',
          accessToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGJkNjY2NGQtNGViOS00NmViLTk5ZDgtNWM0M2JhMTUzYzYxLyIsImlhdCI6MTY1NDMzMjE3MSwibmJmIjoxNjU0MzMyMTcxLCJleHAiOjE2NTQzMzYzNzIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUEvZHcvaTBEVGY2ZFc2VVpybnRQeGhKTGVqUmRDbGpueVd5Z3Z1UzgwSFBVaHJuQjladEtKRk1HT3NuemlRWWtXIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImlwYWRkciI6IjEwMi4xNTkuNjkuMTA0IiwibmFtZSI6InNpcmluZWFtZG91bmkiLCJvaWQiOiJkYWIxOWZkZi00MDdiLTRmNDktYWZlZS1lNjBkODZmYzFmNjkiLCJwdWlkIjoiMTAwMzIwMDA2N0MzNzczMCIsInJoIjoiMC5BUjhBVFdiVzI3bE82MGFaMkZ4RHVoVThZUWtBQUFBQUFBQUF3QUFBQUFBQUFBQWZBSlUuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoidmlrQnN0a1dpNTkzM3ItcnhNTlBBQ0tMazZjMnhCNS0xVXpvclFqVzM3byIsInRpZCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsInVuaXF1ZV9uYW1lIjoic2lyaW5lYW1kb3VuaUBpc2cudS10dW5pcy50biIsInVwbiI6InNpcmluZWFtZG91bmlAaXNnLnUtdHVuaXMudG4iLCJ1dGkiOiJlN2kwb1VPUHpVV082SU5TM25BRUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.kKXAqGeBeGUD7sbuGTohdy62E6x61LbQCOPcepGCMiJ3xncqPlSWiPLoqpX8xYL7oEA3QQGYW4ZNYQQx65ch6e7eUocr5eNdGIKKJuAvwSyh6QHNd_2VJzyJoOThsrv_7a9SUG75Qax6szSYXqi-Ys0j40iGbxdaetZotxh6H9NprY1VjyiWrCnm2mq-PzHivg1ELDfsy_zIvr5e0354l9NSS223lmh8w8TwHTfV2GyPbGbhUBlsTsEQT7enI9regw5vHKA66MWiVooUK90B688qH4hto8INE9WpnsjHtoz-T292IySQaMKWI3uBQEp7Wsx0o-V5ragRQeAVhnKeGA',
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
