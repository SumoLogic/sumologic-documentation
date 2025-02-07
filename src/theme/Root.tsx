import React from 'react';
import Berry from '../components/Berry';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    return (
    <>
        {children}
        {location.pathname !== '/' && <Berry mode='popup' />}
    </>
    );
}
