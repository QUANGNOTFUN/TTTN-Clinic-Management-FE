"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/libs/apollo/client";
import React from "react";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}