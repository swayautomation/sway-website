import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, Box } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch('/data/products.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.id === id);
                if (found) {
                    setProduct(found);
                    setSelectedImage(found.thumbnail || found.images?.[0] || null);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load product details", err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading details...</div>;
    if (error || !product) {
        return <Navigate to="/products" replace />;
    }

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center border border-gray-200 relative">
                            {selectedImage ? (
                                <img
                                    src={selectedImage.startsWith('/')
                                        ? selectedImage
                                        : `/img/products/${selectedImage}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                    <Box size={80} className="text-gray-300" />
                                </div>
                            )}

                        </div>

                        {/* Thumbnails (Static placeholders based on images array length if exists) */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`bg-gray-50 rounded-md aspect-square flex items-center justify-center border cursor-pointer transition-colors
      ${selectedImage === img ? 'border-primary' : 'border-gray-200 hover:border-primary'}
    `}
                                    >
                                        <img
                                            src={img.startsWith('/') ? img : `/img/products/${img}`}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div>
                        <span className="text-sm font-semibold text-primary uppercase tracking-wide">{product.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>

                        <div className="prose prose-blue max-w-none text-gray-600 mb-8">
                            <p className="text-lg leading-relaxed">{product.fullDescription}</p>
                        </div>

                        {/* Specifications */}
                        {product.specs && product.specs.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
                                <ul className="space-y-3">
                                    {product.specs.map((spec, idx) => (
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
                                Request Quote
                            </Link>
                            <Link to="/contact" className="bg-white border text-gray-700 border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-md font-semibold text-center transition-colors">
                                Ask a Question
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
