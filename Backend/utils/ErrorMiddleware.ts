const ErrorMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      response.errors.forEach((error) => {
        if (error.message === "TokenExpiredError") {
          console.error("JWT has expired. Handle accordingly.");
        }
      });
    }
    return response;
  });
});

export default ErrorMiddleware;
