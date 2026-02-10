import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import indiaMartLogo from '../assets/brands/ind.png';


const Footer = () => {
    const { siteData, loading } = useSiteData();

    if (loading || !siteData) return null;

    return (
        <footer className="bg-secondary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-bold mb-4 tracking-wider">SWAY Automation</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            {siteData.tagline}
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href={siteData.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>

                            <a
                                href={siteData.social.indiamart}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-70 hover:opacity-100 transition"
                            >
                                <img
                                    src={indiaMartLogo}
                                    alt="IndiaMART"
                                    className="h-5 w-auto object-contain"
                                />
                            </a>

                            <a
                                href={siteData.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Instagram size={20} />
                            </a>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="text-gray-400 hover:text-white text-sm transition-colors">Products</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Services</Link></li>
                            <li><Link to="/industries" className="text-gray-400 hover:text-white text-sm transition-colors">Industries</Link></li>
                            <li><Link to="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={18} className="text-primary mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{siteData.contact.address}</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="text-primary mr-2 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{siteData.contact.phone}</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="text-primary mr-2 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{siteData.contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
