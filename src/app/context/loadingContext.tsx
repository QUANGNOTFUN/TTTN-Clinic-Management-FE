'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextProps {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if (context === undefined) {
        throw new Error("useLoading getting error")
    }

    return context;
}