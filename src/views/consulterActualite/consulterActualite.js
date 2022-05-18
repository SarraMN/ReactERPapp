import React, { useEffect, useState } from 'react'
import 'src/views/Consulter_formation/formation.css'
import images from 'src/assets/images/Software-development.jpg'
import { CCard, CPagination, CPaginationItem } from '@coreui/react'
import { getFormations } from 'src/services/FormationService'
import { Link, useNavigate } from 'react-router-dom'
import { uploadfile, getfile } from 'src/services/fileService'
import { getAllActualitesForCandidat } from 'src/services/actualiteService'

const ConsulterActualite = () => {
  let navigate = useNavigate()

  function ActualiteInfo2(a) {
    console.log('alooo', a)
    navigate('/consulterActualite/ConsulterActualite/actualiteInfo', {
      state: { actualite: a },
    })
  }
  const [posts, setPosts] = useState()
  const [bool, setbool] = useState(false)
  const [photo, setphoto] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(3)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [selectValue, setselectValue] = useState('3')
  /*   let [images, setimages] = useState([])
   */

  let [val, setval] = useState([])
  useEffect(() => {
    getAllActualitesForCandidat()
      .then((response) => {
        response.data.reverse().map((item, index) => {
          let values = {
            titre: '',
            dateExpiration: '',
            datecreation: '',
            description: '',
            archivee: '',
            image: '',
          }
          values.titre = item.titre
          values.description = item.description
          values.datecreation = item.datecreation
          values.dateExpiration = item.dateExpiration
          values.archivee = item.archivee
          getfile(item.image.id)
            .then((response2) => {
              setbool(true)
              values.image = URL.createObjectURL(response2.data)
              photo.push(URL.createObjectURL(response2.data))
            })
            .catch((e) => {})
          val.push(values)
        })
        setPosts(val)
        setval([])
      })
      .catch((e) => {})
  }, [bool])
  if (posts) {
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

    //selcetionner nombre de posts per page
    const handleChange = (event) => {
      setselectValue(event.target.value)
      setpostsPerPage(selectValue)
    }

    return (
      <div>
        <div>
          <section className="">
            {/*             <CCard>
             */}{' '}
            <div className="container">
              {/*               <CCard style={{ paddingTop: '20px', marginBottom: '20px' }}>
               */}{' '}
              <div style={{ marginBottom: '20px' }}>
                <div className="col-md-12 heading-section text-center ">
                  <span className="subheading">TAC-TIC</span>
                  <h2>Les actualités</h2>
                  <hr style={{ marginRight: '30%', marginLeft: '30%', height: '5px' }}></hr>
                </div>
              </div>
              {/*               </CCard>
               */}{' '}
              <div className="row d-flex">
                {currentPosts.map((item, index) => (
                  <div className="col-lg-4 " Key={index}>
                    <div className="blog-entry" onClick={(index) => ActualiteInfo2(item)}>
                      <a
                        className="block-20"
                        style={{
                          'background-image': `url(${photo[index]})`,
                        }}
                      ></a>
                      <div className="text d-block">
                        <div className="meta">
                          <p>
                            <a>
                              <span className="fa fa-calendar mr-2"></span>
                              {item.datecreation}
                            </a>
                            <a style={{ marginLeft: 10 }}>
                              <span className="fa fa-user mr-2"></span>Admin
                            </a>
                          </p>
                        </div>
                        <h3 className="heading">
                          <a>{item.titre}</a>
                        </h3>
                        <p style={{ 'word-wrap': 'break-word' }}>
                          {item.description.substr(0, 35)}...
                        </p>
                        <p>
                          <a className="btn btn-secondary py-2 px-3">Voir plus</a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/*             </CCard>
             */}{' '}
          </section>
        </div>
        <CPagination
          className="justify-content-center"
          aria-label="Page navigation example"
          style={{ marginRight: 20 }}
        >
          <a
            onClick={() => {
              if (PreviewsPage != 0) {
                setCurrentPage(PreviewsPage)
                paginate(PreviewsPage)
                setactiveNumber(PreviewsPage)
              }
            }}
          >
            <CPaginationItem aria-label="Previous" disabled>
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
          </a>
          <a>
            <CPaginationItem active>{activeNumber}</CPaginationItem>
          </a>
          <a
            onClick={() => {
              if (currentPage < posts.length / postsPerPage) {
                setCurrentPage(NextPage)
                paginate(NextPage)
                setactiveNumber(NextPage)
              }
            }}
          >
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </a>
        </CPagination>

        <div
          style={{ marginRight: 15, marginBottom: 15 }}
          className="d-flex flex-row align-items-center justify-content-start"
        >
          <div className="ml-auto clearfix">
            <div className="courses_show_text">
              <span className="courses_showing">1-{postsPerPage}</span> de{' '}
              <span className="courses_total">{posts.length}</span> resultats
            </div>
          </div>
        </div>
      </div>
    )
  } else if (posts == null)
    return (
      <CCard>
        <div></div>
      </CCard>
    )
}
export default ConsulterActualite
