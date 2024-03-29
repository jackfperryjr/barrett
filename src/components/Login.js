import React, { useState } from 'react'
import { useHistory} from 'react-router-dom'
import { useAuth } from '../context/auth'
import Navbar from '../components/Navbar'

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [overlay, setOverlay] = useState(false)
  const { setAuthToken } = useAuth()
  let history = useHistory()

  function validateForm () {
    if (username.length > 0 && password.length > 0) {
      return true
    } else {
      document.getElementById('validation-error').style.display = 'block'
      return false
    }
  }

  function handleLogin (e) {
    e.preventDefault()
    document.getElementById('login-error').style.display = 'none'
    document.getElementById('validation-error').style.display = 'none'
    if (validateForm()) {
      setOverlay(true)
      const payload = {
        username: username,
        password: password,
        audience: 'moogleAPI'
      }
      fetch('https://chocobo.moogleapi.com/v1/account/login', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(function(response){
          if (response.accessToken) {
            setAuthToken(response.accessToken)
            setLoggedIn(true)
            localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken))
            localStorage.setItem('user', JSON.stringify(response.user))
          } else {
            console.log(response.message)
            document.getElementById('login-error').style.display = 'block'
            setOverlay(false)
          }
        })
      } else {
        console.log('validation failed')
      }
  }

  if (isLoggedIn) {
    history.push('/')
  }

  return (
    <>
    <Navbar />
    <div className='form-container login-screen'>
      <div className='overlay' style={{display: (overlay) ? 'block' : 'none'}}>
        <span className='loader text-primary'>Let me check Stack Overflow <i className="fab fa-stack-overflow"></i> ...</span>
      </div>
      <p className='text-center'>Enter credentials</p>
      <form style={{maxWidth: '300px'}}>
        <div className='form-group'>
          <input type='text' className='form-control login-username' placeholder='enter username' value={username} onChange={e => { setUsername(e.target.value) }} />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control' placeholder='enter password' value={password} onChange={e => { setPassword(e.target.value) }} />
        </div>
        <div id='login-error'>invalid credentials</div>
        <div id='validation-error'>enter your credentials</div>
        <p className='btn btn-primary pointer' onClick={(e) => handleLogin(e)}>Login</p>
      </form>
    </div>
    </>
    )
}

export default Login
