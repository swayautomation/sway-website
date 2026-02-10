import React, { createContext, useState, useEffect, useContext } from 'react';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
    const [siteData, setSiteData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('./data/site.json')
            .then(res => res.json())
            .then(data => {
                setSiteData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load site data", err);
                setLoading(false);
            });
    }, []);

    return (
        <SiteContext.Provider value={{ siteData, loading }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteData = () => useContext(SiteContext);
