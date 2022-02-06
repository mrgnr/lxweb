import React from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "@canonical/react-components";
import { QueryClient, QueryClientProvider } from "react-query";
import Instances from "./components/Instances";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 30 * 1000, // 30 seconds
      retryOnMount: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="p-strip--light">
        <Row>
          <Col size={12}>
            <h1>lxweb</h1>
          </Col>
        </Row>
      </section>
      <Instances />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("react-root"));
