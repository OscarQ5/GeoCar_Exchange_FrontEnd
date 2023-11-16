import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import FourOFour from './pages/FourOFour.jsx'
import Index from './pages/Index.jsx'
import Show from './pages/Show.jsx'

function App() {

  return (
    <div>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/cars' element={<Index />}/>
            <Route path='/cars/:id' element={<Show />}/>
            <Route path='*' element={<FourOFour />}/>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
