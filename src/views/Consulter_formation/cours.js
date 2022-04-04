import { CCardImage } from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { getformateurs, getusers, deleteuser } from 'src/services/gestionutilisateurs'
import ReactImg from 'src/images/work-1.jpg'
import ReactImg1 from 'src/images/work-9.jpg'
import ReactImg2 from 'src/images/work-3.jpg'
import ReactImg3 from 'src/images/work-5.jpg'
import ReactImg4 from 'src/images/work-8.jpg'
import ReactImg5 from 'src/images/work-6.jpg'
import { uploadfile } from 'src/services/fileService'
import { cilDoubleQuoteSansLeft } from '@coreui/icons'
import axios from 'axios'

const Formations = () => {
  const [profileimg, setProfileimg] = useState(
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
  )

  function imageHandler(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    axios({
      method: 'post',
      url: 'http://localhost:8080/file/upload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(
      function (response) {
        //handle success
        console.log(response)
      },
      function (error) {
        // handle error
      },
    )
  }
  return (
    <div>
      <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
          <form encType="multipart/form-data" action="">
            <img className="rounded-circle mt-5" width="150px" src={profileimg} />

            <input
              className="align-items-center text-center p-3 py-5"
              type="file"
              id="avatar"
              name="file"
              accept="image/png, image/jpeg"
              onChange={(value) => imageHandler(value)}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
export default Formations
