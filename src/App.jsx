import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import FourOFour from './pages/FourOFour.jsx'
import Index from './pages/Index.jsx'
import Show from './pages/Show.jsx'
import Edit from './pages/Edit.jsx'
import New from './pages/New.jsx'
import Maintenance from './pages/Maintenance.jsx'

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
            <Route path='/cars/new' element={<New />}/>
            <Route path='/cars/:id/edit' element={<Edit />}/>
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path='*' element={<FourOFour />}/>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
