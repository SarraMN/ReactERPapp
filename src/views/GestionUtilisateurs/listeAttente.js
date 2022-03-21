import {
  CAvatar,
  CCard,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import 'src/views/GestionUtilisateurs/liste_attente.css'

import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
  cilUserPlus,
  cilUserUnfollow,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const Listeattente = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(tableExample)
    }

    fetchPosts()
  }, [])

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage //3
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    if (pageNumber < posts.length / postsPerPage) setNextPage(pageNumber + 1)
    if (pageNumber > 1) setPreviewsPage(pageNumber - 1)
  }
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <>
      <div className="table-data__tool">
        <div className="table-data__tool-left">
          <div className="rs-select2--light rs-select2--md">
            <select
              className="js-select2"
              name="property"
              style={{
                height: 40,
                width: 150,
                'text-align': 'center',
                border: 'none',
                'font-size': '1.2em',
                color: '#888888',
              }}
            >
              <option
                selected="selected"
                style={{
                  height: 50,
                }}
              >
                Role
              </option>
              <option value="">Formateurs</option>
              <option value="">Candidats</option>
            </select>
          </div>
          <div className="rs-select2--light rs-select2--sm">
            <select
              className="js-select2"
              name="time"
              style={{
                height: 40,
                width: 110,
                'text-align': 'center',
                border: 'none',
                'font-size': '1.2em',
                color: '#888888',
              }}
            >
              <option selected="selected">Genre</option>
              <option value="">Homme</option>
              <option value="">Femme</option>
            </select>
          </div>

          <button
            className="au-btn-filter"
            style={{
              height: 40,
              width: 100,
              'text-align': 'center',
              border: 'none',
              'font-size': '1.2em',
              color: 'BLACK',
            }}
          >
            <i
              className="zmdi zmdi-filter-list"
              style={{ height: 40, width: 100, 'text-align': 'center' }}
            ></i>
            filters
          </button>
        </div>
      </div>
      <CCard>
        <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
          Liste d{"'"}attente
        </CCardHeader>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>Nom</CTableHeaderCell>
              <CTableHeaderCell>Prénom</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Role</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Genre</CTableHeaderCell>
              <CTableHeaderCell>E-mail</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Etat civil</CTableHeaderCell>
              <CTableHeaderCell>Date Inscription</CTableHeaderCell>
              <CTableHeaderCell>Approuver</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentPosts.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                {/* Avatar*/}
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                </CTableDataCell>
                {/* Nom*/}
                <CTableDataCell>
                  <div>{item.user.name}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                    {item.user.registered}
                  </div>
                </CTableDataCell>
                {/* Prénom*/}
                <CTableDataCell className="text-center">
                  <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                </CTableDataCell>
                {/* Role*/}
                <CTableDataCell className="text-center">
                  <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                </CTableDataCell>
                {/* CIN*/}
                <CTableDataCell>
                  <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                </CTableDataCell>
                {/* Email*/}
                <CTableDataCell className="text-center">
                  <CIcon size="xl" icon={item.payment.icon} />
                </CTableDataCell>
                {/* Date Inscription*/}
                <CTableDataCell>
                  <div className="small text-medium-emphasis">Last login</div>
                  <strong>{item.activity}</strong>
                </CTableDataCell>
                {/* Date Inscription*/}
                <CTableDataCell>
                  <div className="small text-medium-emphasis">Last login</div>
                  <strong>{item.activity}</strong>
                </CTableDataCell>
                {/* Approuver*/}
                <CTableDataCell>
                  <button
                    style={{
                      border: 0,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <CIcon
                      icon={cilUserPlus}
                      customClassName="nav-icon"
                      style={{
                        marginTop: 5,
                        width: 30,
                        height: 30,
                        color: 'green',
                        marginLeft: 7,
                        marginRight: 7,
                      }}
                    />
                  </button>
                  <button
                    style={{
                      border: 0,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <CIcon
                      icon={cilUserUnfollow}
                      customClassName="nav-icon"
                      style={{
                        marginTop: 5,
                        width: 30,
                        height: 30,
                        color: 'red',
                      }}
                    />
                  </button>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div style={{ 'text-align': ' center' }}>
          <br></br>
          <CPagination
            className="justify-content-end"
            aria-label="Page navigation example"
            style={{ marginRight: 20 }}
          >
            <a
              onClick={() => {
                if (PreviewsPage != 0) setCurrentPage(PreviewsPage)
              }}
            >
              <CPaginationItem
                aria-label="Previous"
                disabled
                style={{ marginleft: 300, backgroundcolor: 'red' }}
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
            </a>
            {pageNumbers.map((number) => (
              <a key={number} onClick={() => paginate(number)}>
                <CPaginationItem>{number}</CPaginationItem>
              </a>
            ))}
            <a
              onClick={() => {
                setCurrentPage(NextPage)
              }}
            >
              <CPaginationItem aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </a>
          </CPagination>
        </div>
      </CCard>
    </>
  )
}
export default Listeattente
