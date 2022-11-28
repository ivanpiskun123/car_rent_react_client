import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/v2/graphql/',
    cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <VisionUIControllerProvider>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </VisionUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
