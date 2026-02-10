import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

const Contact = () => {
    const { siteData, loading } = useSiteData();

    if (loading || !siteData) return <div className="p-10 text-center">Loading contact info...</div>;

    const whatsappUrl = `https://wa.me/${siteData.contact.whatsapp}`;

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Get in touch with us for your automation needs. We are here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
                    {/* Contact Details */}
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-gray-50 rounded-lg">
                            <div className="bg-blue-100 p-4 rounded-full text-primary mb-4 md:mb-0 md:mr-6">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Our Office</h3>
                                <p className="text-gray-600">{siteData.contact.address}</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-gray-50 rounded-lg">
                            <div className="bg-blue-100 p-4 rounded-full text-primary mb-4 md:mb-0 md:mr-6">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                                <p className="text-gray-600 font-mono text-lg">{siteData.contact.phone}</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-gray-50 rounded-lg">
                            <div className="bg-blue-100 p-4 rounded-full text-primary mb-4 md:mb-0 md:mr-6">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                                <p className="text-gray-600 font-mono text-lg">{siteData.contact.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Direct Action */}
                    <div className="flex flex-col justify-center items-center bg-secondary text-white rounded-2xl p-10 text-center">
                        <h2 className="text-2xl font-bold mb-6">Need Immediate Assistance?</h2>
                        <p className="text-gray-300 mb-8 max-w-sm">
                            Connect with our engineering team directly via WhatsApp for quick queries and support.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            <MessageCircle className="mr-3" size={24} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Map Placeholder */}
                {/* Google Maps */}
                {/* Google Maps */}
                <div className="mt-16 w-full h-80 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <iframe
                        title="Sway Automation & Technologies Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.583543237758!2d80.11541679999999!3d13.1827027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a527db7b955c399%3A0x16144c771d513c6d!2sSway%20Automation%20%26%20Technologies!5e1!3m2!1sen!2sin!4v1770294309627!5m2!1sen!2sin"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>


            </div>
        </div>
    );
};

export default Contact;
