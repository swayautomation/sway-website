import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';

const Industries = () => {
    const [industriesData, setIndustriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/industries.json')
            .then(res => res.json())
            .then(data => {
                setIndustriesData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load industries", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Loading industries...</div>;
    const brands = [
        "panasonic.png",
        "siemens.png",
        "omron.png",
        "delta.png",
        "schneider.png",
        "mitsubishi.png",
        "invt.png",
        "autonics.png",
        "contact.png",
        "sch.png",
        "allen.png",
        "pep.png"
    ];


    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Tailored automation solutions for specific sector challenges.
                    </p>
                </div>

                {industriesData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industriesData.map((ind, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                                <div className="h-48 bg-gray-600 relative">
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                                        {ind.image ? (
                                            <img
                                                src={ind.image?.startsWith('/')
                                                    ? ind.image
                                                    : `/img/industries/${ind.image}`}
                                                alt={ind.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}

                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-secondary text-white/30 text-4xl font-bold"
                                            style={{ display: ind.image ? 'none' : 'flex' }}
                                        >
                                            {ind.name[0]}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <h3 className="text-white text-xl font-bold flex items-center">
                                            <Briefcase size={18} className="mr-2 text-blue-500" /> {ind.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow">
                                    {/* Removed 'Problem' section as requested */}
                                    <div>
                                        <h4 className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1">Solution</h4>
                                        <p className="text-gray-600 text-sm">{ind.solutions}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">No industries active.</div>
                )}
                {/* Brands We Use */}
                <div className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Brands We Use
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We work with globally trusted automation and industrial technology brands.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
                        {brands.map((brand, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-100 rounded-lg p-4 flex items-center justify-center hover:shadow-md transition"
                            >
                                <img
                                    src={`/img/brands/${brand}`}
                                    alt={brand.replace('.png', '')}
                                    className="max-h-12 w-auto object-contain transition"

                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Industries;
