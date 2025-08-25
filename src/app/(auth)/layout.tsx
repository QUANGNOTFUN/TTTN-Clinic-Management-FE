import '../globals.css';
import {LoadingProvider} from "@/app/context/loadingContext";
import Providers from "../../../providers";
import GlobalLoading from "@/components/loadings/globalLoading";
import React from "react";
import Header from "@/components/header/Header";
import PublicLayout from "@/app/(auth)/publicLayout";

export const metadata = {
    title: 'Medical Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <PublicLayout>
                <GlobalLoading />
                <Header />
                { children }
            </PublicLayout>
        </Providers>
    );
}
