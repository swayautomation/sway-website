import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, Box } from 'lucide-react';
import { resolveImagePath } from '../utils/imagePath';

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/data/services.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(s => s.id === id);
                if (found) {
                    setService(found);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load service details", err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading details...</div>;
    if (error || !service) {
        return <Navigate to="/services" replace />;
    }

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/services" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center border border-gray-200 relative">
                            {/* Main Image */}
                            {(service.thumbnail || (service.images && service.images[0])) ? (
                                <img
                                    src={(service.thumbnail || service.images?.[0])?.startsWith('/')
                                        ? (service.thumbnail || service.images?.[0])
                                        : `/img/services/${service.thumbnail || service.images?.[0]}`}
                                    alt={service.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />

                            ) : null}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100" style={{ display: (service.thumbnail || (service.images && service.images[0])) ? 'none' : 'flex' }}>
                                <Box size={80} className="text-gray-300" />
                            </div>
                        </div>
                        {/* Thumbnails */}
                        {service.images && service.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {service.images.map((img, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-md aspect-square flex items-center justify-center border border-gray-200 cursor-pointer hover:border-primary transition-colors overflow-hidden relative">
                                        <img
                                            src={img?.startsWith('/')
                                                ? img
                                                : `/img/services/${img}`}
                                            alt={`${service.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50" style={{ display: 'none' }}>
                                            <Box size={24} className="text-gray-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div>
                        <span className="text-sm font-semibold text-primary uppercase tracking-wide">{service.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{service.name}</h1>

                        <div className="prose prose-blue max-w-none text-gray-600 mb-8">
                            <p className="text-lg leading-relaxed">{service.fullDescription}</p>
                        </div>

                        {/* Specifications / Features */}
                        {service.specs && service.specs.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    {service.specs.map((spec, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <Check size={18} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-center transition-colors">
                                Inquire Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;