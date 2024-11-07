import React from 'react';
import { GuestHeader } from '../Components/Header/GuestHeader.jsx';
import { GuestFooter } from '../Components/Footer/GuestFooter.jsx';


export const GuestLayout = ({ children,props }) => {
    return (
        <>
            <GuestHeader props={props}/>
            <div className="mt-[80px]"></div>
            {children}
            <GuestFooter/>
        </>
    )
};