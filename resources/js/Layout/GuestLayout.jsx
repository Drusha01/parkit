import React from 'react';
import { Header } from '../Components/Header/GuestHeader.jsx';
import { Footer } from '../Components/Footer/GuestFooter.jsx';


export const GuestLayout = ({ children }) => {
    return (
        <>
            <Header/>
            <div className="padding mt-[80px]"></div>
            {children}
            <Footer/>
        </>
    )
};