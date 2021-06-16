import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Test} from './pages/test'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="container">
        <Test />
      </div>
    </Router>
  )
}

export default App