"use client";

import {SessionProvider} from "next-auth/react"
import React, {ReactNode} from "react"
import {SnackbarProvider} from "notistack";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";

type ProvidersProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

const RootProvider = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider  client={queryClient}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1000} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
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
          {children}
        </SnackbarProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default RootProvider;