import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function Navbar(props) {
  let history = useHistory()
  let user = null
  if (localStorage.user && localStorage.accessToken) {
    user = JSON.parse(localStorage.user)
  }

  function handleLogout () {
    localStorage.clear()
    history.push('/blog')
  }

  return (
    <nav className='navbar navbar-expand navbar-light'>
    { 
        (user) 
          ? 
              <span>
                <Link to='/blog' className='font-lobster'>blog</Link>
                <Link to='/blog/add'><div className='pen-blog'><i className="fas fa-pen-alt"></i></div></Link>
                <img onClick={handleLogout} className='img-navbar pointer' src='https://rikku.blob.core.windows.net/portrait/4c8f9ed7-6187-48b0-a580-7ca770beb0f3.png' alt='Jack'/>
              </span>

          : 
              <span>
                <Link to='/blog' className='font-lobster'>blog</Link>
                <Link to='/login'><img className='img-navbar' src='https://rikku.blob.core.windows.net/portrait/4c8f9ed7-6187-48b0-a580-7ca770beb0f3.png' alt='Jack'/></Link>
              </span>
        } 
    </nav>
    )
}

export default Navbar
