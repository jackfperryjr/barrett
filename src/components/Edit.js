import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import { refresh } from '../utility'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const useFetch = url => {
  const [blog, setBlog] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const blog = await response.json()
    setBlog(blog[0])
  }

  useEffect(() => { fetchData() }, [url])
  return blog
}

function Edit(props) {
  const id = props.match.params.id
  const blog = useFetch('https://www.moogleapi.com/api/v1/blogs/' + id)
  const [overlay, setOverlay] = useState(false)
  const [noAccess, setShow] = useState(false)
  const handleClose = () => setShow(false)
  let history = useHistory()

  function handleBlogUpdate (e) {
    refresh(JSON.parse(localStorage.accessToken))
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      let payload = new FormData()
      payload.append('id', id)
      payload.append('title', document.querySelector('[name="title"]').value)
      payload.append('content', document.querySelector('[name="content"]').value)
      let accessToken = JSON.parse(localStorage.accessToken)
      fetch('https://www.moogleapi.com/api/v1/blogs/update/' + id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: payload
      }).then(function(response) {
        if (response.status === 200) {
          setOverlay(false)
          history.push('/post/edit/' + id)
        } else if (response.status === 401) {
          // setOverlay(false)
          // localStorage.clear()
          // props.history.push('/login')
          // return <Redirect to='/login' />
        } else if (response.status === 403) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot update blog')
        } else {
          console.log('update failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function handleBlogDelete (e) {
    refresh(JSON.parse(localStorage.accessToken))
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      let accessToken = JSON.parse(localStorage.accessToken)
      fetch('https://www.moogleapi.com/api/v1/blogs/delete/' + id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then(function(response) {
        if (response.status === 200) {
          history.push('/')
        } else if (response.status === 401) {
          // localStorage.clear()
          // props.history.push('/login')
          // return <Redirect to='/login' />
        } else if (response.status === 403) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot delete blog')
        } else {
          console.log('delete failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function validateForm () {
    // let error = 0

    //TODO:
    return true
  }

  if (blog) {
    return (
      <>
      <Navbar />
      <div className='component'>
        <div className='container top-margin'>
          <Modal show={noAccess} onHide={handleClose}
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
          <span className='loader text-primary'>Waiting for my coffee to cool down <i className="fas fa-mug-hot"></i> ...</span>
        </div>
        {/* <div id='validation-error'>form validation failed</div> */}
          <form name='blog-form' id='blog-form' encType='multipart/form-data' method='post'>
            <div className='row'>
              <div className='col-sm-12 col-md-12'>
                <div className='row'>
                  <div className='col-sm-12 col-md-12'>
                  <div className='input-group input-group-override floating-label'>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='title'
                        defaultValue={blog.title}
                        placeholder='Enter a blog title...' 
                      />
                      <label>blog title</label>
                    </div>
                      <textarea className='content-form-control floating-textarea' name='content'
                        defaultValue={blog.content}
                        placeholder='Start writing some content...'>
                      </textarea>
                      <label>blog content</label>
                    </div>
                    <div className='button-container'>
                      <p title='Submit Blog Edits' className='btn btn-primary pointer' onClick={e => { handleBlogUpdate(e) }}>Submit</p>
                      <p title='Delete Blog' className='btn btn-danger pointer' onClick={e => { handleBlogDelete(e) }}>Delete</p>
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
  } else {
    return (
      <>
      <Navbar />
      <div className='component'>
        <span className='loader text-primary'>Going for a run...</span>
      </div>
      <Footer />
      </>
    )
  }
}

export default Edit
