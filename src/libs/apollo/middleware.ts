import { ApolloLink } from "@apollo/client";

// Ví dụ middleware tùy chỉnh (log request)
export const loggerLink = new ApolloLink((operation, forward) => {
	console.log(`[GraphQL Operation]: ${operation.operationName}`);
	return forward(operation).map((response) => {
		console.log(`[GraphQL Response]: ${operation.operationName}`);
		return response;
	});
});