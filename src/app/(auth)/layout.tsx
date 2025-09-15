import '../globals.css';
import RootProvider from "../../components/wrapper/RootProvider";
import React from "react";
import Header from "@/components/header/Header";
import {ToastContainer} from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <RootProvider>
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
        </RootProvider>
    );
}
