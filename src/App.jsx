import { useEffect, useState } from 'react'
import './App.css'

import { Home } from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from "react-router"
import { NotFound } from './pages/NotFound.jsx'
import { TermPage } from './pages/TermPage.jsx'
import { Login } from './pages/Login.jsx'
import { CreateAccount } from './pages/CreateAccount.jsx'
import { CreateTerm } from './pages/CreateTerm.jsx'

function App() {
    return (
        <div className="App">
            {/* Defines the overall structure of the web app */}
            < BrowserRouter >
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path='/' element={<Home />} />
                    <Route path='createterm' element={<CreateTerm />} />
                    <Route path='/:termID' element={<TermPage />} />
                </Routes>
            </BrowserRouter >
        </div>
    )
}

export default App
