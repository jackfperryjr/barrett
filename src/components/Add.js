import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { refresh } from '../utility'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Add(props) {
  const [overlay, setOverlay] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  let history = useHistory()

  function handleBlogPost (e) {
    refresh(JSON.parse(localStorage.accessToken))
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      let payload = new FormData()
      payload.append('title', document.querySelector('[name="title"]').value)
      payload.append('content', document.querySelector('[name="content"]').value)
      fetch('https://localhost:5001/api/v1/blogs/add', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.accessToken)
        },
        body: payload
      }).then(function(response) {
        if (response.status === 200) {
          return response.json().then((data) => {
            history.push('/')
          })
        } else if (response.status === 401) {
          // localStorage.clear()
          // props.history.push('/login')
          // return <Redirect to='/login' />
          console.log('Still got a 401, bro.')
        } else if (response.status === 403 || response.status === 405) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot add blogs')
        } else {
          console.log('add failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function validateForm () {
    // let error = 0

    // if (error === 1) {
    //   document.getElementById('validation-error').style.display = 'block'
    //   return false
    // } else {
    //   document.getElementById('validation-error').style.display = 'none'
    //   return true
    // }
    return true
  }

  return (
    <>
    <Navbar />
    <div className='component'>
        <div className='container top-margin'>
          <Modal show={show} onHide={handleClose}
              {...props}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered >
              <Modal.Header>
                  <Modal.Title>Test Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Your account doesn't have access to make changes.</p>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
              </Modal.Footer>
          </Modal>
        <div className='overlay' style={{display: (overlay) ? 'block' : 'none'}}>
          <span className='loader text-primary'>Brewing some coffee <i className="fas fa-coffee"></i> ...</span>
        </div>
          <form name='character-form' id='character-form' encType='multipart/form-data' method='put'>
            <div className='row'>
              <div className='col-sm-12 col-md-12'>
                <div className='row'>
                  <div className='col-sm-12 col-md-12'>
                    <div className='input-group input-group-override floating-label'>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='title'
                        placeholder='Enter a blog title...' 
                      />
                      <label>blog title</label>
                    </div>
                      <textarea className='content-form-control floating-textarea' name='content'
                        placeholder='Start writing some content...'>
                      </textarea>
                      <label>blog content</label>
                    </div>
                    <div className='button-container'>
                      <p title='Add Blog' className='btn btn-primary pointer' onClick={e => { handleBlogPost(e) }}>Submit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      </>
  )
}

export default Add
