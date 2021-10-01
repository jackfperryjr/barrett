import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { AuthContext } from './context/auth'
import PrivateRoute from './PrivateRoute'
import login from './components/Login'
import blog from './components/Blog'
import blogPost from './components/BlogPost'
import edit from './components/Edit'
import add from './components/Add'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js'
import './App.css'

function App(props) {
  const existingToken = JSON.parse(localStorage.getItem('accessToken'))
  const [authToken, setAuthToken] = useState(existingToken)
  
  const setToken = (data) => {
    localStorage.setItem('accessToken', JSON.stringify(data))
    setAuthToken(data);
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route exact path='/' component={blog} />
        <Route exact path='/login/' component={login} />
        <Route exact path='/post/:id' component={blogPost} />
        <PrivateRoute exact path='/add/' component={add} />
        <PrivateRoute exact path='/post/edit/:id/' component={edit} />
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App
