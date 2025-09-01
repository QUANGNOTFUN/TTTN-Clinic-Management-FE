import '../globals.css';
import Providers from "../../../providers";
import React from "react";
import Header from "@/components/header/Header";
import {ToastContainer} from "react-toastify";

export const metadata = {
    title: 'Medical Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
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
        </Providers>
    );
}
