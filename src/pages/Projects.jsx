import React, { useState, useEffect } from 'react';

const Projects = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(() => {
        fetch('/data/projects.json')
            .then(res => res.json())
            .then(data => {
                setProjectsData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load projects", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Loading projects...</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Gallery</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A showcase of our recent work and the value delivered to clients.
                    </p>
                </div>

                {projectsData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData.map((project, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col"
                            >
                                {/* Image Section (same as Industries) */}
                                <div
                                    className="h-48 bg-gray-200 relative overflow-hidden cursor-pointer"
                                    onClick={() => {
                                        setActiveIndex(idx);
                                        setIsOpen(true);
                                    }}
                                >

                                    {project.image ? (
                                        <img
                                            src={project.image?.startsWith('/')
                                                ? project.image
                                                : `/img/projects/${project.image}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}

                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-400 font-semibold"
                                        style={{ display: project.image ? 'none' : 'flex' }}
                                    >
                                        {project.title}
                                    </div>

                                    {/* Gradient overlay – ONLY title now */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <h3 className="text-white text-lg font-bold">
                                            {project.title}
                                        </h3>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        No featured projects yet.
                    </div>
                )}
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
                    <div className="relative w-full max-w-3xl">

                        {/* Close */}
                        <button
                            className="absolute -top-10 right-0 text-white text-2xl"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>

                        {/* Image */}
                        <img
                            src={
                                projectsData[activeIndex].image?.startsWith('/')
                                    ? projectsData[activeIndex].image
                                    : `/img/projects/${projectsData[activeIndex].image}`
                            }
                            alt={projectsData[activeIndex].title}
                            className="w-full max-h-[70vh] object-contain mx-auto rounded-lg bg-white"
                        />

                        {/* Title */}
                        <div className="mt-2 text-center text-sm text-gray-200">
                            {projectsData[activeIndex].title}
                        </div>

                        {/* Navigation */}
                        <button
                            className="absolute left-3 top-1/2 -translate-y-1/2 
             bg-black/60 hover:bg-black/80
             text-white text-3xl
             w-12 h-12 rounded-full
             flex items-center justify-center
             shadow-lg transition"
                            onClick={() =>
                                setActiveIndex(
                                    activeIndex === 0 ? projectsData.length - 1 : activeIndex - 1
                                )
                            }
                            aria-label="Previous image"
                        >
                            ‹
                        </button>


                        <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 
             bg-black/60 hover:bg-black/80
             text-white text-3xl
             w-12 h-12 rounded-full
             flex items-center justify-center
             shadow-lg transition"
                            onClick={() =>
                                setActiveIndex(
                                    activeIndex === projectsData.length - 1 ? 0 : activeIndex + 1
                                )
                            }
                            aria-label="Next image"
                        >
                            ›
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Projects;
