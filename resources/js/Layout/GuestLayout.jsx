import React from 'react';
import { GuestHeader } from '../Components/Header/GuestHeader.jsx';
import { GuestFooter } from '../Components/Footer/GuestFooter.jsx';


export const GuestLayout = ({ children }) => {
    return (
        <>
            <GuestHeader/>
            <div className="padding mt-[80px]"></div>
            {children}
            <GuestFooter/>
        </>
    )
};