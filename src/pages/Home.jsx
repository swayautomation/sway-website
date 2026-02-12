import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Settings } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import img1 from './img1.avif';
import { resolveImagePath } from '../utils/imagePath';


const Home = () => {
    const { siteData } = useSiteData();
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/data/products.json').then(res => res.json()),
            fetch('/data/services.json').then(res => res.json()),
            fetch('/data/industries.json').then(res => res.json()),
            fetch('/data/projects.json').then(res => res.json())
        ]).then(([prodData, svcData, indData, projData]) => {
            setProducts(prodData);
            setServices(svcData);
            setIndustries(indData);
            setProjects(projData);
            setLoading(false);
        }).catch(err => {
            console.error("Error loading home data", err);
            setLoading(false);
        });
    }, []);

    if (loading || !siteData) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="bg-secondary text-white py-20 lg:py-32 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img1})` }}
                ></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {siteData.tagline}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        {siteData.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/products" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors inline-flex items-center justify-center">
                            Explore Products <ArrowRight className="ml-2" size={20} />
                        </Link>
                        <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors inline-flex items-center justify-center">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Brief */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                        Sway Automation & Technologies is a leader in industrial innovation. We specialize in bringing Industry 4.0 solutions to reality through advanced robotics, vision systems, and custom embedded engineering. Our mission is to enhance productivity and quality for manufacturing businesses globally.
                    </p>
                </div>
            </section>

            {/* Products Preview */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                            <div className="w-20 h-1 bg-primary mt-4"></div>
                        </div>
                        <Link to="/products" className="text-primary font-semibold hover:text-blue-700 hidden sm:flex items-center">
                            View All <ArrowRight className="ml-1" size={16} />
                        </Link>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.slice(0, 3).map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-64 bg-gray-200 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gray-100 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                                            {product.thumbnail ? (
                                                <img
                                                    src={resolveImagePath(product.thumbnail, 'products')}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}

                                            <div
                                                className="absolute inset-0 hidden items-center justify-center bg-gray-100"
                                                style={{ display: product.thumbnail ? 'none' : 'flex' }}
                                            >
                                                <Box size={64} className="text-gray-300" />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="p-6">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">{product.category}</span>
                                        <h3 className="mt-2 text-xl font-bold text-gray-900">{product.name}</h3>
                                        <p className="mt-2 text-gray-600 line-clamp-2">{product.shortDescription}</p>
                                        <Link to={`/products/${product.id}`} className="mt-4 inline-block text-primary font-medium hover:text-blue-700">
                                            Learn more &rarr;
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">No products added yet.</div>
                    )}

                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/products" className="text-primary font-semibold hover:text-blue-700">
                            View All Products &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Our Expertise</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Comprehensive solutions tailored to your technical needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.slice(0, 4).map((service) => (
                            <div key={service.id} className="flex flex-col sm:flex-row p-6 border border-gray-300 rounded-xl hover:bg-blue-50 transition-colors">
                                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                                    <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center">
                                        <Settings size={32} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                    <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                                    <Link to={`/services/${service.id}`} className="text-primary font-medium hover:text-blue-700">
                                        View Details &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries CTA */}
            <section className="py-20 bg-secondary text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl font-bold mb-6">Serving Diverse Industries</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        From Automotive to Pharmaceuticals, our solutions are adaptable and scalable across various sectors.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
                        {industries.slice(0, 4).map((ind, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                                <h4 className="font-semibold">{ind.name}</h4>
                            </div>
                        ))}
                    </div>
                    <Link to="/industries" className="bg-white text-secondary px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors">
                        See All Industries
                    </Link>
                </div>
            </section>

            {/* Projects/Portfolio Preview */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Recent Projects</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
                    </div>

                    {projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {projects.slice(0, 2).map((project) => (
                                <div key={project.id} className="group relative overflow-hidden rounded-xl shadow-lg h-64 md:h-80">
                                    <div className="absolute inset-0 bg-gray-200">
                                        {project.image ? (
                                            <img
                                                src={resolveImagePath(project.image, 'projects')}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}

                                        <div className="absolute inset-0 hidden items-center justify-center bg-gray-800">
                                            <span className="text-white opacity-20 text-4xl font-bold">PROJECT</span>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-8 translate-y-4">
                                        {/* <span className="text-primary font-bold text-sm mb-2">{project.type}</span> */}
                                        <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
                                        {/* <p className="text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {project.explanation}
                                        </p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">No projects added yet.</div>
                    )}

                    <div className="mt-10 text-center">
                        <Link to="/projects" className="inline-flex items-center text-primary font-bold hover:text-blue-700">
                            View Full Portfolio <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate Your Future?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Contact us today to discuss your requirements and get a customized solution proposal.
                    </p>
                    <Link to="/contact" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all">
                        Get in Touch
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
