import { cilDataTransferDown, cilExternalLink, cilList } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { useLocation } from 'react-router-dom'
import 'src/App.css'
import { getfile } from 'src/services/fileService'

function App() {
  let pdf = useLocation()
  const [idpdf, setidpdf] = useState(pdf.state.pdf)
  const [logo, setlogo] = useState('')
  console.log('iddd', idpdf)
  useEffect(() => {
    getfile(idpdf)
      .then((response) => {
        console.log('taswira111', response)
        setlogo(URL.createObjectURL(response.data))
      })
      .catch((e) => {})
  }, [])

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet)
  }

  function changePageBack() {
    changePage(-1)
  }

  function changePageNext() {
    changePage(+1)
  }
  const downloadContract = () => {
    let httpClient = new XMLHttpRequest()
    httpClient.open('get', logo, true)
    httpClient.responseType = 'blob'
    httpClient.onload = function () {
      const file = new Blob([httpClient.response], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = fileURL
      link.download = 'cours.pdf'
      link.click()
      // document.body.removeChild(link);
      URL.revokeObjectURL(fileURL)
    }
    httpClient.send()
  }

  const downloadContract2 = () => {
    var oReq = new XMLHttpRequest()

    oReq.open('GET', logo, true)

    oReq.responseType = 'blob'

    oReq.onload = function () {
      const file = new Blob([oReq.response], { type: 'application/pdf' })

      const fileURL = URL.createObjectURL(file)

      window.open(fileURL, '_blank')
    }

    oReq.send()
  }
  return (
    <div>
      <div className="col-12 text-end" style={{ height: '15px', marginBottom: '39px' }}>
        <button
          onClick={() => downloadContract()}
          className="btn btn-outline-primary btn-sm mb-0"
          style={{ 'font-size': '18px', 'border-color': '#213f77', marginRight: 10 }}
        >
          <CIcon
            icon={cilDataTransferDown}
            customClassName="nav-icon"
            style={{
              width: 20,
              height: 20,
              'margin-right': 5,
            }}
          />
          Telecharger
        </button>
        <button
          onClick={() => downloadContract2()}
          className="btn btn-outline-primary btn-sm mb-0"
          style={{ 'font-size': '18px', 'border-color': '#213f77', marginLeft: '10' }}
        >
          <CIcon
            icon={cilExternalLink}
            customClassName="nav-icon"
            style={{
              width: 20,
              height: 20,
              'margin-right': 5,
            }}
          />
          ouvrir dans une nouvelle page
        </button>
      </div>
      <div>
        <header className="App-header">
          <Document file={logo} onLoadSuccess={onDocumentLoadSuccess}>
            <Page height="500" width="1000" pageNumber={pageNumber} />
          </Document>
          <p>
            {' '}
            Page {pageNumber} of {numPages}
          </p>
          {pageNumber > 1 && pageNumber == numPages && (
            <button
              className="fa fa-hand-o-left"
              onClick={changePageBack}
              style={{
                'border-color': '#0a0a23',
                color: '#0a0a23',
                'border-radius': '10px',
                'min-height': '30px',
                width: '210px',
              }}
            >
              <span style={{ marginLeft: 5 }}>Previous Page</span>
            </button>
          )}
          {pageNumber < numPages && pageNumber == 1 && (
            <button
              className="fa fa-hand-o-right"
              onClick={changePageNext}
              style={{
                'border-color': '#0a0a23',
                color: '#0a0a23',
                'border-radius': '10px',
                'min-height': '30px',
                width: '200px',
              }}
            >
              <span style={{ marginLeft: 5 }}>Next Page</span>
            </button>
          )}
          {pageNumber > 1 && pageNumber < numPages && (
            <div>
              <button
                className="fa fa-hand-o-left"
                onClick={changePageBack}
                style={{
                  'border-color': '#0a0a23',
                  color: '#0a0a23',
                  'border-radius': '10px',
                  'min-height': '30px',
                  width: '200px',
                  marginRight: '5px',
                }}
              >
                <span style={{ marginLeft: 5 }}>Previous Page</span>
              </button>
              <button
                className="fa fa-hand-o-right"
                onClick={changePageNext}
                style={{
                  'border-color': '#0a0a23',
                  color: '#0a0a23',
                  'border-radius': '10px',
                  'min-height': '30px',
                  width: '200px',
                }}
              >
                <span style={{ marginLeft: 5 }}>Next Page</span>
              </button>
            </div>
          )}
        </header>
      </div>
    </div>
  )
}

export default App
