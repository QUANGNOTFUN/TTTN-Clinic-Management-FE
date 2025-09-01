import '../globals.css';
import {LoadingProvider} from "@/app/context/loadingContext";
import Providers from "../../../providers";
import GlobalLoading from "@/components/loadings/globalLoading";
import React from "react";
import Header from "@/components/header/Header";
import PublicLayout from "@/app/(auth)/publicLayout";
import {ToastContainer} from "react-toastify";

export const metadata = {
    title: 'Medical Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <PublicLayout>
                <GlobalLoading />
                <Header />
                <ToastContainer
                  position={"top-right"}
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover={false}
                  theme={"light"}
                />
                { children }
            </PublicLayout>
        </Providers>
    );
}
