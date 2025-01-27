import React from 'react';
import { RenterHeader } from '../Components/Header/RenterHeader.jsx';
import { RenterFooter } from '../Components/Footer/RenterFooter.jsx';
import { RenterNav } from '../Components/SideNavigation/RenterNav.jsx';

export const RenterLayout = ({ children }) => {
    return (
        <>
            <RenterHeader />
                <div className="mt-[80px] bg-gray-200">
                    <div className="flex justify-center">
                        <div className="w-full md:w-3/4 lg:w-3/4 xl:w-3/4 md:my-5 lg:my-10 xl:my-10 xxl:my-10">
                            <div className="flex justify-center">
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
