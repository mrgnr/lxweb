import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "@canonical/react-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container, VirtualMachine } from "./types";
import { InstanceContext } from "./context";
import Instances from "./components/Instances";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1 * 1000, // 1 second
      retryOnMount: false,
    },
  },
});

const App = () => {
  const [containerList, setContainerList] = useState<Container[]>([]);
  const [virtualMachineList, setVirtualMachineList] = useState<
    VirtualMachine[]
  >([]);
  const instanceContext = {
    containerList,
    setContainerList,
    virtualMachineList,
    setVirtualMachineList,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <section className="p-strip--light">
        <Row>
          <Col size={12}>
            <h1>lxweb</h1>
          </Col>
        </Row>
      </section>
      <InstanceContext.Provider value={instanceContext}>
        <Instances />
      </InstanceContext.Provider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("react-root"));
