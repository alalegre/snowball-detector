import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Home } from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from "react-router"
import { NotFound } from './pages/NotFound.jsx'
import { TermPage } from './pages/TermPage.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Defines the overall structure of the web app */}
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home />} />
                <Route path='/:termID' element={<TermPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
