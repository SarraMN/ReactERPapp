import React, { useEffect, useState } from 'react'
import 'src/views/Consulter_formation/formation.css'
import photo1 from 'src/assets/images/Software-development.jpg'
import { CCard, CPagination, CPaginationItem } from '@coreui/react'
import { getFormations } from 'src/services/FormationService'
import { Link, useNavigate } from 'react-router-dom'
import { uploadfile, getfile } from 'src/services/fileService'
import ReactImg from 'src/images/work-1.jpg'
import ReactImg1 from 'src/images/mobile_dev.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/Graphic_designer.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
import Formationcategorie from './Formationcategorie'
const TousFormations = () => {
  const [posts, setPosts] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(3)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [selectValue, setselectValue] = useState('3')
  let navigate = useNavigate()
  let [images, setimages] = useState([])

  useEffect(() => {
    getFormations()
      .then((response) => {
        console.log(response)
        response.data.reverse().map((item, index) => {
          console.log('item', item)
          getfile(item.image.id)
            .then((response2) => {
              images.push(URL.createObjectURL(response2.data))
            })
            .catch((e) => {})
        })
        setPosts(response.data.reverse())
        console.log('data', response.data)
        console.log('LONGUER', posts.length)
      })
      .catch((e) => {})
  }, [])

  return (
    <div>
      <Formationcategorie categorie="Data Analyst"></Formationcategorie>

      <Formationcategorie categorie="Graphic Designer"></Formationcategorie>
      <Formationcategorie categorie="Marketing"></Formationcategorie>
      <Formationcategorie categorie="UX Designer"></Formationcategorie>
      <Formationcategorie categorie="development mobile"></Formationcategorie>
      <Formationcategorie categorie="IT And Software"></Formationcategorie>
    </div>
  )
}
export default TousFormations
