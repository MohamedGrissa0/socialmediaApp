import React, { createContext, useState, useContext } from 'react';

// Create the context
const VisibilityContext = createContext();

// Create the provider component
export function VisibilityProvider({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <VisibilityContext.Provider value={{ open, setOpen }}>
            {children}
        </VisibilityContext.Provider>
    );
}

// Custom hook for using the context
export const useVisibility = () => useContext(VisibilityContext);
