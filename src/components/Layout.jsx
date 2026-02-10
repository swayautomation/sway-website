import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSiteData } from '../context/SiteContext';
import { MessageCircle } from 'lucide-react';

const Layout = ({ children }) => {
    const { siteData, loading } = useSiteData();

    if (loading || !siteData) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    const whatsappUrl = `https://wa.me/${siteData.contact.whatsapp}`;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                {children}
            </main>
            <Footer />

            {/* Floating WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center"
                title="Chat with us"
            >
                <MessageCircle size={28} />
            </a>
        </div>
    );
};

export default Layout;
