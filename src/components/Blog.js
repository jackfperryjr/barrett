import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const useFetch = url => {
  const [blogs, setBlogs] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const blogs = await response.json()
    setBlogs(blogs)
  }

  useEffect(() => { fetchData() }, [url])
  return [blogs, fetchData]
}

function Blog(props) {
  const [blogs, fetchData] = useFetch('https://www.moogleapi.com/api/v1/blogs')

  async function handleReactionUpdate (e, reaction, id) {
    e.preventDefault()
    fetch('https://www.moogleapi.com/api/v1/blogs/' + reaction +'/' + id, {
    method: 'put'
    }).then(function(response) {
        if (response.status === 200) {
            fetchData('https://www.moogleapi.com/api/v1/blogs' )
        }
    })
  }

  if (blogs) {
    return ( 
      <>
      <Navbar />
      <div className='component'>
        <div className='top-margin'>
          {
            (blogs.message)
            ? 
              <span className='loader text-primary'>No blogs in the database.</span>
            :
            <>
            {blogs.map
              (x =>
                <div className='row row-blog' key={x.id}>
                  <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <Link to={'blog/post/' + x.id}>{x.title}</Link>
                    <p className='blog-timestamp text-muted'>{moment(x.created).local().format('MMMM D, YYYY [at] h:mm a')}</p>
                    <div className='row text-muted flex-none'>
                      <span className='pointer blog-reaction float-right' onClick={e => { handleReactionUpdate(e, "love", x.id) }}><i className="far fa-heart"></i><span className='small blogs-reaction-count'>{(x.love > 1000 ? '1000s' : x.love)}</span></span>
                      <span className='pointer blog-reaction float-right' onClick={e => { handleReactionUpdate(e, "dislike", x.id) }}><i className="far fa-thumbs-down"></i><span className='small blogs-reaction-count'>{x.dislike}</span></span>
                      <span className='pointer blog-reaction float-right' onClick={e => { handleReactionUpdate(e, "like", x.id) }}><i className="far fa-thumbs-up"></i><span className='small blogs-reaction-count'>{x.like}</span></span>
                      {(localStorage.getItem('accessToken'))
                      ? <Link to={'blog/post/edit/' + x.id} className='pointer blog-reaction' style={{marginLeft: '6px'}}><i className='fas fa-edit'></i></Link>
                      : <span></span>
                      }
                    </div>
                  </div>
                </div>
              )
            }
            </>
          }
            
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
        <span className='loader text-primary'>Watching a movie...</span>
      </div>
      <Footer />
      </>
    )
  }
}

export default Blog
