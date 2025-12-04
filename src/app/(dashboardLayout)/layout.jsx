import { AuthProvider } from '@/providers/AuthProvider';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div>
            <AuthProvider>
                 {children}
            </AuthProvider>
        </div>
    );
};

export default DashBoardLayout;