import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/WebPages/Home';
import Browse from './Pages/WebPages/Browse';
import HowItWorks from './Pages/WebPages/HowItWorks';
import Signup from './Pages/Authentication/Signup';
import Login from './Pages/Authentication/Login';


const App = () => {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/howitworks" element={<HowItWorks />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
