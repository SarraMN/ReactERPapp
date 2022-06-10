import React, { useEffect, useState } from 'react'
import 'src/views/Consulter_formation/formation.css'
import photo1 from 'src/assets/images/Software-development.jpg'
import { CCard, CPagination, CPaginationItem } from '@coreui/react'
import { getFormations, getformationbycategorie } from 'src/services/FormationService'
import { Link, useNavigate } from 'react-router-dom'
import { uploadfile, getfile } from 'src/services/fileService'
import ReactImg from 'src/images/work-1.jpg'
import ReactImg1 from 'src/images/mobile_dev.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/Graphic_designer.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
import { EffectCoverflow, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { fetchUserData, GetformationsCandidat } from 'src/services/UserService'
import { useDispatch } from 'react-redux'
const Mes_formations = (props) => {
  const [categorie, setCategorie] = useState(props)
  const [id, setId] = useState()

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(3)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [selectValue, setselectValue] = useState('3')
  let navigate = useNavigate()
  let [images, setimages] = useState([])
  let [images2, setimages2] = useState([])
  let [bool, setbool] = useState(false)
  const dispatch = useDispatch()

  dispatch({ type: 'set', EtatExamen: 0 })

  useEffect(() => {
    test()
  }, [bool])

  function test() {
    fetchUserData()
      .then((response2) => {
        setId(response2.data.id)
        GetformationsCandidat(response2.data.id)
          .then((response) => {
            if (response.data.length !== 0) {
              response.data.reverse().map((item, index) => {
                getfile(item.image.id)
                  .then((response2) => {
                    setbool(true)
                    images[item.id] = URL.createObjectURL(response2.data)
                    images2.push(item.id)
                  })
                  .catch((e) => {})
              })
              setPosts(response.data)
            }
          })
          .catch((e) => {})
      })
      .catch((e) => {})
  }
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
      console.log(event.target.value)
      setselectValue(event.target.value)
      setpostsPerPage(selectValue)
    }

    return (
      <div>
        <CCard>
          <div className="container">
            <div className="row">
              <h3 style={{ marginTop: '15px', 'text-shadow': '2px 4px 3px rgba(0,0,0,0.3)' }}>
                {categorie.categorie}
              </h3>
              <h6 style={{ marginLeft: '15px', 'text-shadow': '2px 4px 3px rgba(0,0,0,0.3)' }}>
                {posts.length == 1 ? (
                  <span>une seule Formation Disponible</span>
                ) : (
                  <span>{posts.length} Formations Disponibles</span>
                )}
              </h6>
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper2"
              >
                {posts.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div>
                      <div className="course" style={{ margin: '10px' }}>
                        <div className="project-wrap">
                          <a
                            href="#"
                            className="img"
                            style={{
                              'background-image': `url(${images[item.id]})`,
                              'background-size': '300px 250px',
                            }}
                          >
                            <span className="price">{item.categorie}</span>
                          </a>
                        </div>
                        <div className="course_body">
                          <h3 className="course_title" style={{ marginBottom: 25 }}>
                            <strong>
                              <Link to="/Mes_formations/Mes_formations/FormationInfo" state={item}>
                                {item.titre}
                              </Link>
                            </strong>
                          </h3>
                          <div className="course_text">
                            <p>{item.description.substr(0, 35)}...</p>
                          </div>
                          <div className="course_Date">
                            <strong>Date de publication :</strong> {item.dateCreation}
                          </div>
                        </div>
                        <div className="course_footer">
                          <div className="course_footer_content d-flex flex-row align-items-center justify-content-start">
                            <div className="course_info">
                              <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                              <span>20 etudiants</span>
                            </div>
                            <div className="course_info">
                              <i className="fa fa-star" aria-hidden="true" />
                              <span>5 Ratings</span>
                            </div>
                            <div className="course_price ml-auto">{item.prix} DT</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <br></br>
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
                <span className="courses_total">{posts.length}</span> resultats
              </div>
            </div>
          </div>
        </CCard>
      </div>
    )
  } else if (posts == null)
    return (
      <CCard>
        <div></div>
      </CCard>
    )
}
export default Mes_formations
