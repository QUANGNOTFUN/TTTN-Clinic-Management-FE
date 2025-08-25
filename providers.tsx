"use client";

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import {apolloClient} from "@/libs/apollo/client";

type ProvidersProps = {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1000} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
          {children}
        </SnackbarProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default Providers;