import React, { Suspense, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  ApolloError,
  split,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "apollo-utilities";
import { createClient } from "graphql-ws";
import PrivateRoute from "./navigation/PrivateRoute";
import PublicRoute from "./navigation/PublicRoute";
import { useAppSelector } from "./hooks/hooks";
import { getUserData } from "./utils/Utils";
import ErrorMiddleware from "./utils/ErrorMiddleware";
import Home from "./pages/Home";
import Application from "./pages/Application";
import "./App.scss";

const App: React.FC = () => {
  const userData = getUserData();

  const authLink = setContext((_, { headers }) => {
    const token = userData?.token;
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError }: ErrorResponse) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          if (message === "Context creation failed: jwt expired") {
            // console.error("JWT has expired. Please re-authenticate.");
          }
        });
      }
      if (networkError) {
        // console.error(`Network Error: ${networkError}`);
      }
    }
  );

  const httpLink = new HttpLink({
    uri: "https://zephyron.onrender.com/api",
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://zephyron.onrender.com/api",
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    link: splitLink,
    // link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache(),
  });

  const auth = useAppSelector((state: any) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/app");
    }
  }, [auth]);

  return (
    <ApolloProvider client={client}>
      <Suspense fallback={(<div>Loading...</div>) as React.ReactNode}>
        <Routes>
          <Route element={<PrivateRoute />}>
            {auth && <Route path="/" element={<Application />} />}
            <Route path="/app" element={<Application />} />
          </Route>
          <Route path="/" element={<PublicRoute component={Home} />} />
        </Routes>
      </Suspense>
    </ApolloProvider>
  );
};

export default App;
