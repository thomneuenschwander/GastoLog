import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import { useAuthContext } from '../../hooks/useAuthContext';

interface TemplateProps {
    children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {

    const auth = useAuthContext()

    let mainClass = "flex-grow overflow-auto";

    if (!auth?.isAuthenticate) {
        mainClass += " bg-gradient-to-br from-cyan-500 to-blue-700";
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className={mainClass}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Template;
