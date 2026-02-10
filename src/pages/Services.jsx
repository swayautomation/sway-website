import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Box } from 'lucide-react';
import { resolveImagePath } from '../utils/imagePath';

const Services = () => {
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('/data/services.json')
            .then(res => res.json())
            .then(data => {
                setServicesData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load services", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Loading services...</div>;

    // Extract unique categories
    const categories = ['All', ...new Set(servicesData.map(s => s.category))];

    // Filter services based on search and category
    const filteredServices = servicesData.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our comprehensive range of engineering and automation services tailored to your needs.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hover-scrollbar gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                </div>

                {/* Service Grid */}
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service) => (
                            <Link key={service.id} to={`/services/${service.id}`} className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100">
                                <div className="h-64 bg-gray-200 relative overflow-hidden">
                                    {/* Image Logic */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                                        {/* Dynamic Image Path Logic */}
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

                                        {/* Fallback Placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100" style={{ display: (service.thumbnail || (service.images && service.images[0])) ? 'none' : 'flex' }}>
                                            <Box size={64} className="text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{service.category}</span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{service.shortDescription}</p>
                                    <div className="mt-auto">
                                        <span className="text-primary font-medium text-sm flex items-center">
                                            View Details &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                        <Box size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No services found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search or category filter.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-4 text-primary font-medium hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
