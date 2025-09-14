"use client";

import {SessionProvider} from "next-auth/react"
import {ReactNode} from "react"
import {SnackbarProvider} from "notistack";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

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
          {children}
        </SnackbarProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default RootProvider;