import React from 'react';
import { RenterHeader } from '../Components/Header/RenterHeader.jsx';
import { RenterFooter } from '../Components/Footer/RenterFooter.jsx';
import { RenterNav } from '../Components/SideNavigation/RenterNav.jsx';

export const RenterLayout = ({ children }) => {
    return (
        <>
            <RenterHeader/>
                <div className="content mt-[80px]">
                    <div className="flex justify-center">
                        <div className="w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ">
                            <div className="flex justify-center mt-5">
                                <RenterNav/>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            <RenterFooter/>
        </>
    )
};
