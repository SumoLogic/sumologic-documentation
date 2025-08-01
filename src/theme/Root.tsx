import React from 'react';
import Berry from '../components/Berry';
import { useLocation } from '@docusaurus/router';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';

export default function Root({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const homePageRoute = useHomePageRoute();
    const isHomePage = homePageRoute?.path === location.pathname;

    return (
    <>
        {children}
        {!isHomePage && <Berry mode='popup' />}
    </>
    );
}
