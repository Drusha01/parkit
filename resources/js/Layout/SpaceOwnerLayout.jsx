import React from 'react';
import { SpaceOwnerHeader } from '../Components/Header/SpaceOwnerHeader.jsx';
import { SpaceOwnerFooter } from '../Components/Footer/SpaceOwnerFooter.jsx';
import { SpaceOwnerNav } from '../Components/SideNavigation/SpaceOwnerNav.jsx';

export const SpaceOwnerLayout = ({ children }) => {
    return (
        <>
            <SpaceOwnerNav/>
            <SpaceOwnerHeader/>
            {children}
            <SpaceOwnerFooter/>
        </>
    )
};
