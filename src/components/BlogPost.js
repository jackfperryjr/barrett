import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const useFetch = url => {
  const [blogPost, setBlogPost] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const blogPost = await response.json()
    setBlogPost(blogPost)
  }

  useEffect(() => { fetchData() }, [url])
  return [blogPost, fetchData]
}

function BlogPost(props) {
  const { id } = useParams()
  const [blogPost, fetchData] = useFetch('https://www.moogleapi.com/api/v1/blogs/' + id)

  async function handleReactionUpdate (e, reaction, id) {
    e.preventDefault()
    fetch('https://www.moogleapi.com/api/v1/blogs/' + reaction + '/' + id, {
    method: 'put'
    }).then(function(response) {
        if (response.status === 200) {
            fetchData('https://www.moogleapi.com/api/v1/blogs' + reaction + '/' + id)
        }
    })
  }

if (blogPost) {
    return ( 
        <>
        <Navbar />
        <div className='component'>
        <div className='top-margin'>
            <div className='row row-blogpost'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <h3 className='text-center'>{blogPost[0].title}</h3>
                <p className='blog-timestamp text-muted text-center'>{moment(blogPost[0].created).local().format('MMMM D, YYYY [at] h:mm a')}</p>
                <br/>
                <pre>{blogPost[0].content}</pre>
                <div className='row text-muted flex-row-reverse'>
                    <span className='pointer blog-reaction' onClick={e => { handleReactionUpdate(e, "love", blogPost[0].id) }}><i className="far fa-heart"></i><span className='small blogs-reaction-count'>{blogPost[0].love}</span></span>
                    <span className='pointer blog-reaction' onClick={e => { handleReactionUpdate(e, "dislike", blogPost[0].id) }}><i className="far fa-thumbs-down"></i><span className='small blogs-reaction-count'>{blogPost[0].dislike}</span></span>
                    <span className='pointer blog-reaction' onClick={e => { handleReactionUpdate(e, "like", blogPost[0].id) }}><i className="far fa-thumbs-up"></i><span className='small blogs-reaction-count'>{blogPost[0].like}</span></span>
                </div>
                </div>
            </div>
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
                <span className='loader text-primary'>Getting lost down a rabbit hole on Wikipedia...</span>
            </div>
            <Footer />
            </>
        )
    }
}

export default BlogPost