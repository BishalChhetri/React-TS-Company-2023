import { ApolloLink } from "@apollo/client";

const ErrorMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      response.errors.forEach((error) => {
        // Check for specific properties or types indicating token expiration
        if (
          error.extensions &&
          error.extensions.code === "UNAUTHENTICATED" &&
          error.message.includes("expired")
        ) {
          console.error("JWT has expired. Handle accordingly.");
          // Perform token refresh or logout action here
        }
      });
    }
    return response;
  });
});

export default ErrorMiddleware;
