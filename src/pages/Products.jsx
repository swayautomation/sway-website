import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Box } from 'lucide-react';

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('/data/products.json')
            .then(res => res.json())
            .then(data => {
                setProductsData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load products", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Loading products...</div>;

    const categories = ['All', ...new Set(productsData.map(p => p.category))];

    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our range of cutting-edge solutions designed to enhance industrial efficiency and productivity.
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
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <Link key={product.id} to={`/products/${product.id}`} className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100">
                                <div className="h-64 bg-gray-200 relative overflow-hidden">
                                    {/* Placeholder Image Logic */}
                                    <div className="absolute inset-0 bg-gray-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        {(product.thumbnail || product.images?.[0]) ? (
                                            <img
                                                src={(product.thumbnail || product.images?.[0])?.startsWith('/')
                                                    ? (product.thumbnail || product.images?.[0])
                                                    : `/img/products/${product.thumbnail || product.images?.[0]}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}

                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-gray-100"
                                            style={{ display: (product.thumbnail || product.images?.[0]) ? 'none' : 'flex' }}
                                        >
                                            <Box size={64} className="text-gray-300" />
                                        </div>
                                    </div>

                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{product.category}</span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{product.shortDescription}</p>
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
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
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

export default Products;
