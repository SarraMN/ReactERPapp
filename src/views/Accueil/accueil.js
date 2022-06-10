import React, { useEffect, useState } from 'react'
import 'src/views/Consulter_formation/formation.css'
import photo1 from 'src/assets/images/Software-development.jpg'
import { CAvatar, CCard, CCol, CPagination, CPaginationItem } from '@coreui/react'
import { getFormations, getformationbycategorie } from 'src/services/FormationService'
import { Link, useNavigate } from 'react-router-dom'
import { uploadfile, getfile } from 'src/services/fileService'
import ReactImg from 'src/images/work-1.jpg'
import ReactImg1 from 'src/images/bg_4.jpg'
import ReactImg10 from 'src/assets/images/milestones_background.jpg'
import ReactImg2 from 'src/images/image_4.jpg'
import ReactImg4 from 'src/images/Graphic_designer.jpg'
import ReactImg5 from 'src/assets/images/banner-feature.png'
import backImg from 'src/assets/images/slider_background.jpg'
import backEarth from 'src/assets/images/earth-globe.svg'
import backbooks from 'src/assets/images/books.svg'
import backProfessor from 'src/assets/images/professor.svg'
import { fetchUserData, getUserById } from 'src/services/UserService'
import ReactImg3 from 'src/images/work-5.jpg'
import im1 from 'src/images/1.png'
import im2 from 'src/images/2.png'
import im3 from 'src/images/3.png'
import im4 from 'src/images/4.png'
import 'src/views/Accueil/accueil.css'

import t11 from 'src/images/work-1.jpg'
import t22 from 'src/images/mobile_dev.jpg'
import t33 from 'src/images/work-3.jpg'
import t44 from 'src/images/work-5.jpg'
import t55 from 'src/images/Graphic_designer.jpg'
import t66 from 'src/images/work-6.jpg'
import Tem1 from 'src/images/ooredoo.png'
import Tem2 from 'src/images/inrap.png'
import Tem3 from 'src/images/advice.png'
import Tem4 from 'src/images/mission.png'

import Tem11 from 'src/images/milestone_1.svg'
import Tem22 from 'src/images/milestone_2.svg'
import Tem33 from 'src/images/milestone_3.svg'
import Tem44 from 'src/images/milestone_4.svg'
import imgChiffres from 'src/images/counter_background.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper'

const Accueil = () => {
  let navigate = useNavigate()

  function voirtous() {
    navigate('/Consulter_formation/formations/tousFormations')
  }
  const voirBycategorie = (C) => {
    console.log('haya c', C)
    navigate('/Consulter_formation/formations/formationsByCategorie', {
      state: { categorie: C },
    })
  }
  return (
    <div className="Accueil">
      <CCard>
        <div
          className=""
          style={{
            'background-image': `url(${backImg})`,
          }}
        >
          <div className=" home">
            <div>
              <div>
                <div>
                  <div className="accueil hero_slide_background"></div>
                  <div className="accueil hero_slide_container d-flex flex-column align-items-center justify-content-center">
                    <div className="hero_slide_content text-center">
                      <h1
                        data-animation-in="fadeInUp"
                        data-animation-out="animate-out fadeOut"
                        style={{ marginTop: '50px' }}
                      >
                        Obtenez Votre <span>Éducation </span> Aujourd{"'"}hui !
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div
                className=""
                style={{
                  marginTop: '100px',
                  marginBottom: '60px',
                  marginRight: '20px',
                  marginLeft: '20px',
                }}
              >
                <div className="">
                  <div className="row conteneur">
                    <div className="col-lg-4 hero_box_col">
                      <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                        <img src={backEarth} className="svg" alt="" />
                        <div className="hero_box_content">
                          <h2 className="hero_box_title">Cours en ligne</h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 hero_box_col">
                      <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                        <img src={backbooks} className="svg" alt="" />
                        <div className="hero_box_content">
                          <h2 className="hero_box_title">Nos sources</h2>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 hero_box_col">
                      <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                        <img src={backProfessor} className="svg" alt="" />
                        <div className="hero_box_content">
                          <h2 className="hero_box_title">Notre equipes</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <section className="ftco-section ftco-about img">
            <div className="container">
              <div className="row d-flex">
                <div className="col-md-12 about-intro">
                  <div className="row">
                    <div className="col-md-6 d-flex">
                      <div className="d-flex about-wrap">
                        <div
                          className="img d-flex align-items-center justify-content-center"
                          style={{
                            'background-image': `url(${ReactImg2})`,
                          }}
                        ></div>
                        <div
                          className="img-2 d-flex align-items-center justify-content-center"
                          style={{
                            'background-image': `url(${ReactImg1})`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-md-6 pl-md-5 py-5">
                      <div className="row justify-content-start pb-3">
                        <div className="col-md-12 heading-section  ">
                          <span className="subheading">TAC-TIC</span>
                          <h2 className="mb-4">Qui sommes-nous?</h2>
                          <p>
                            L’institut de formation professionnelle en Tunisie a été créé en 2005.
                            Suite à l{"'"}obtention de l{"'"}homologation auprès du Ministère de la
                            Formation professionnelle et de l’Emploi, l{"'"}institut a annoncé sa
                            fondation dans le but d{"'"}offrir une solution de formation pratique
                            pour les étudiants qui désirent faire carrière dans la comptabilité, l
                            {"'"}
                            informatique de gestion ou le commerce International. En adoptant une
                            approche unique de l{"'"}enseignement, avec un accent sur l{"'"}
                            apprenant adulte, l{"'"}école a rapidement élargi ses programmes pour
                            répondre au mieux aux besoins des étudiants en Tunisie.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            className="milestones"
            style={{
              'background-image': `url(${imgChiffres})`,
              height: '300px',
            }}
          >
            <div className="accueil container">
              <div className="row">
                <div className="col"></div>
              </div>
            </div>

            <div className="milestones_container">
              <div className="milestones_background"></div>
            </div>
            <div className="container" style={{ paddingTop: '50px' }}>
              <div className="row">
                <div className="col-lg-3 milestone_col">
                  <div className="accueil milestone text-center">
                    <div className="milestone_icon">
                      <img src={Tem11} style={{ width: '70px', height: '70px' }} />
                    </div>
                    <div className="milestone_counter" data-end-value="750">
                      25
                    </div>
                    <div className="milestone_text">Candidats</div>
                  </div>
                </div>

                <div className="col-lg-3 milestone_col">
                  <div className="accueil milestone text-center">
                    <div className="milestone_icon">
                      <img src={Tem22} style={{ width: '70px', height: '70px' }} />
                    </div>
                    <div className="milestone_counter" data-end-value="120">
                      6
                    </div>
                    <div className="milestone_text">Responsables</div>
                  </div>
                </div>

                <div className="col-lg-3 milestone_col">
                  <div className="accueil milestone text-center">
                    <div className="milestone_icon">
                      <img src={Tem33} style={{ width: '70px', height: '70px' }} />
                    </div>
                    <div className="milestone_counter" data-end-value="39">
                      17
                    </div>
                    <div className="milestone_text">Formations</div>
                  </div>
                </div>

                <div className="col-lg-3 milestone_col">
                  <div className="accueil milestone text-center">
                    <div className="milestone_icon">
                      <img src={Tem44} style={{ width: '70px', height: '70px' }} />
                    </div>
                    <div className="milestone_counter" data-end-value="3500" data-sign-before="+">
                      105
                    </div>
                    <div className="milestone_text">Certificats</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="bg-gray" style={{ marginRight: '25px', marginBottom: '80px' }}>
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div className="col-xl-4 col-lg-5 align-self-end">
                  <img className="img-fluid w-100" src={ReactImg5} alt="banner-feature" />
                </div>
                <div className="col-xl-8 col-lg-7" style={{ marginTop: '50px' }}>
                  <div className="row feature-blocks bg-gray justify-content-between">
                    <div className="col-sm-6 col-xl-5 mb-xl-5 mb-lg-3 mb-4 text-center text-sm-left">
                      <i className="ti-book mb-xl-4 mb-lg-3 mb-4 feature-icon"></i>
                      <CAvatar src={im1} size="lg" />
                      <h3 className="mb-xl-4 mb-lg-3 mb-4">Accès et motivation :</h3>
                      <p>
                        Accueil individuel et informations, Soutien technique, s{"'"}assurer que l
                        {"'"}
                        ensemble des apprenants peut se connecter.
                      </p>
                    </div>
                    <div className="col-sm-6 col-xl-5 mb-xl-5 mb-lg-3 mb-4 text-center text-sm-left">
                      <i className="ti-blackboard mb-xl-4 mb-lg-3 mb-4 feature-icon"></i>
                      <CAvatar src={im2} size="lg" />
                      <h3 className="mb-xl-4 mb-lg-3 mb-4">Socialisation en ligne</h3>
                      <p>
                        Familiarisation avec les outils de communication : activité de présentation
                        des apprenants dans le forum.
                      </p>
                    </div>
                    <div className="col-sm-6 col-xl-5 mb-xl-5 mb-lg-3 mb-4 text-center text-sm-left">
                      <i className="ti-agenda mb-xl-4 mb-lg-3 mb-4 feature-icon"></i>
                      <CAvatar src={im3} size="lg" />
                      <h3 className="mb-xl-4 mb-lg-3 mb-4">Échange d{"'"}information</h3>
                      <p>
                        L{"'"}echange des informations est trés important. Apprenants et tuteurs
                        échangent leurs informations/opinions/arguments
                      </p>
                    </div>
                    <div className="col-sm-6 col-xl-5 mb-xl-5 mb-lg-3 mb-4 text-center text-sm-left">
                      <i className="ti-write mb-xl-4 mb-lg-3 mb-4 feature-icon"></i>
                      <CAvatar src={im4} size="lg" />
                      <h3 className="mb-xl-4 mb-lg-3 mb-4">Construction des connaissances</h3>
                      <p>
                        Encourager les apprenants à participer et à contribuer aux rencontres
                        synchrones. Les apprenants mettent en perspective leurs différents points de
                        vue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-sm">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center section-title justify-content-between">
                    <h2 className="mb-0 text-nowrap mr-3">Nos formations</h2>
                    <div className="border-top w-100 border-primary d-none d-sm-block"></div>
                    <div>
                      <a
                        style={{
                          width: '210px',
                          borderColor: 'black',
                          'background-color': '#213f77',
                          color: 'white',
                        }}
                        onClick={voirtous}
                        className="btn btn-sm btn-primary-outline ml-sm-3 d-none d-sm-block"
                      >
                        Voir tous les formations
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginRight: '10px', marginLeft: '5px' }}>
              <section className="ftco-section">
                <div className="container">
                  <div className="row justify-content-center pb-4">
                    <div className="col-md-12 heading-section text-center ">
                      <span className="subheading">Une large sélection de formations</span>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-3 col-lg-2">
                      <div>
                        <a
                          className="course-category img d-flex align-items-center justify-content-center"
                          style={{ backgroundImage: `url(${t11})` }}
                        >
                          {' '}
                          <Link
                            to="/Consulter_formation/formations/formationsByCategorie"
                            state="IT And Software"
                          >
                            <div className="text w-100 text-center">
                              <h3>IT &amp; Software</h3>
                            </div>
                          </Link>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-2">
                      <a
                        className="course-category img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: `url(${t22})` }}
                      >
                        <Link
                          to="/Consulter_formation/formations/formationsByCategorie"
                          state="development mobile"
                        >
                          <div className="text w-100 text-center">
                            <h3>development mobile</h3>
                          </div>
                        </Link>
                      </a>
                    </div>
                    <div className="col-md-3 col-lg-2">
                      <a
                        className="course-category img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: `url(${t33})` }}
                      >
                        <Link
                          to="/Consulter_formation/formations/formationsByCategorie"
                          state="UX Designer"
                        >
                          <div className="text w-100 text-center">
                            <h3>UX Designer</h3>
                          </div>
                        </Link>
                      </a>
                    </div>
                    <div className="col-md-3 col-lg-2">
                      <a
                        className="course-category img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: `url(${t44})` }}
                      >
                        {' '}
                        <Link
                          to="/Consulter_formation/formations/formationsByCategorie"
                          state="Marketing"
                        >
                          <div className="text w-100 text-center">
                            <h3>Marketing</h3>
                          </div>
                        </Link>
                      </a>
                    </div>
                    <div className="col-md-3 col-lg-2">
                      <a
                        className="course-category img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: `url(${t55})` }}
                      >
                        <Link
                          to="/Consulter_formation/formations/formationsByCategorie"
                          state="Graphic Designer"
                        >
                          <div className="text w-100 text-center">
                            <h3>Graphic Designer</h3>
                          </div>
                        </Link>
                      </a>
                    </div>
                    <div className="col-md-3 col-lg-2">
                      <a
                        className="course-category img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: `url(${t66})` }}
                      >
                        <Link
                          to="/Consulter_formation/formations/formationsByCategorie"
                          state="Data Analyst"
                        >
                          <div className="text w-100 text-center">
                            <h3>Data Analyst</h3>
                          </div>
                        </Link>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
        <div
          className=""
          style={{
            paddingTop: '100px',
            marginTop: '100px',
            'background-image': `url(${ReactImg10})`,
          }}
        >
          <div className="accueil container" style={{}}>
            <div className="row">
              <div className="col">
                <div className="text-center" style={{ paddingTop: '50px' }}>
                  <h1 style={{ color: 'white' }}>Témoignages</h1>
                </div>
              </div>
            </div>
          </div>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            <SwiperSlide>
              <div className="accueil container">
                <div className="">
                  <div className="">
                    <div className="">
                      <div className="owl-item">
                        <div className="testimonials_item text-center">
                          <div className="quote">“</div>
                          <p className="testimonials_text">
                            Nous exprimons notre entière satisfaction quant à la qualité des
                            services rendus ainsi qu’aux respects des spécifications convenues et
                            des délais de réalisation et de livraison arrêtés dans notre accord
                            mutuel. Notre coopération avec TAC-TIC continuera pour collaborer sur
                            des projets de digitalisation futurs.
                          </p>
                          <div className="testimonial_user">
                            <div className="testimonial_image mx-auto">
                              <img src={Tem1} alt="" />
                            </div>
                            <div className="testimonial_name">OOREDOO TUNISIE</div>
                            <div className="testimonial_title">Mr Hedi DELLAGI</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="accueil container">
                <div className="">
                  <div className="">
                    <div className="">
                      <div className="owl-item">
                        <div className="testimonials_item text-center">
                          <div className="quote">“</div>
                          <p className="testimonials_text">
                            TAC-TIC est une entreprise pleine de ressources humaine et d{"'"}
                            expertise. Cette équipe facilitera l{"'"}étude de faisabilité et la
                            réalisation de n{"'"}importe qu’elle projet à termes, avec la même
                            cadence, au niveau professionnalisme, engagement, respect les échéances,
                            efficacité.. L{"'"}INRAP ne change jamais une équipe qui gagne, d{"'"}
                            ailleurs, TAC-TIC est considérée comme un conseiller, toujours à l{"'"}
                            écoute.
                          </p>
                          <div className="testimonial_user">
                            <div className="testimonial_image mx-auto">
                              <img src={Tem2} alt="" />
                            </div>
                            <div className="testimonial_name">INRAP</div>
                            <div className="testimonial_title">Dr Mohamed HAMMAMI</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>{' '}
            <SwiperSlide>
              <div className="accueil container">
                <div className="">
                  <div className="">
                    <div className="">
                      <div className="owl-item">
                        <div className="testimonials_item text-center">
                          <div className="quote">“</div>
                          <p className="testimonials_text">
                            Durant notre collaboration avec TAC-TIC, j’ai à tout moment pu
                            bénéficier d’un service rapide et de qualité qui m’a permis de conduire
                            mes activités en toute tranquillité. TAC-TIC est une société connue par
                            son sérieux et sa réactivité.
                          </p>
                          <div className="testimonial_user">
                            <div className="testimonial_image mx-auto">
                              <img src={Tem3} alt="" />
                            </div>
                            <div className="testimonial_name">ADVICE ENGINEERING</div>
                            <div className="testimonial_title">Mr Mezen KANDIL</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>{' '}
            <SwiperSlide>
              <div className="accueil container">
                <div className="">
                  <div className="">
                    <div className="">
                      <div className="owl-item">
                        <div className="testimonials_item text-center">
                          <div className="quote">“</div>
                          <p className="testimonials_text">
                            La société TAC TIC nous a donné pleine satisfaction dans l’exécution des
                            tâches qui lui ont été confiées. L’équipe projet de TAC TIC s’est
                            distinguée par un travail d’équipe remarquable en terme de qualité et
                            des délais.
                          </p>
                          <div className="testimonial_user">
                            <div className="testimonial_image mx-auto">
                              <img src={Tem4} alt="" />
                            </div>
                            <div className="testimonial_name">Mission Excellence</div>
                            <div className="testimonial_title">Mr Mohamed SBOUI</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <footer className="footer" style={{ marginTop: '20px' }}>
          <div className="footer_background"></div>
          <div className="container">
            <div className="row footer_row">
              <div className="col">
                <div className="footer_content">
                  <div className="row">
                    <div className="col-lg-5 footer_col" style={{ marginRight: '20px' }}>
                      <div className="footer_section footer_about">
                        <div className="footer_logo_container">
                          <a href="#">
                            <div className="footer_logo_text">
                              Tac<span>-Tic</span>
                            </div>
                          </a>
                        </div>
                        <div className="footer_about_text">
                          <p>
                            Un groupe de sociétés, spécialisé dans le domaine de l’ingénierie
                            logicielle, réseaux informatique et télécommunication. TAC-TIC est
                            devenue aujourd’hui une filiale du Groupe New Ways, un groupe de
                            sociétés, chacune est spécialisée dans un domaine spécifique.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5 footer_col">
                      <div className="footer_section footer_contact">
                        <div className="footer_title">Contacter nous</div>
                        <div className="footer_contact_info">
                          <ul>
                            <li>Email: contact@tac-tic.net</li>
                            <li>Phone: +216 36 365 558 | Fax : +216 70 201 269</li>
                            <li>
                              BP 129, Technoparc El ghazela Bâtiment I3 1ère étage 2088 Ariana
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="footer_social" style={{ 'text-align': 'center' }}>
                      <ul>
                        <li>
                          <a href="https://www.facebook.com/TacTicNet">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/company/tac-tic?originalSubdomain=fr">
                            <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/tac_tic_tunisie/?igshid=1n1atkj3fe118">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/tacticnet">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row copyright_row">
              <div className="col">
                <div className="copyright d-flex flex-lg-row flex-column align-items-center justify-content-start">
                  <div className="cr_text">
                    <script>document.write(new Date().getFullYear());</script>
                    All rights reserved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </CCard>
    </div>
  )
}
export default Accueil
