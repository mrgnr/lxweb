import React, { useEffect } from "react";
import { Card, Col, Row } from "@canonical/react-components";
import useContainersList from "../../hooks/useContainersList";
import useVirtualMachinesList from "../../hooks/useVirtualMachinesList";

const Instances = () => {
  const { containersList, isLoading, isError } = useContainersList();
  const { virtualMachinesList } = useVirtualMachinesList();

  useEffect(() => {
    const eventSource = new EventSource("/api/events");
    eventSource.onmessage = (event) => {
      console.log("message: ", event.data);
    };
  }, []);

  return (
    <>
      <section className="p-strip">
        <Row>
          <Col size={12}>
            <h2>Containers</h2>
          </Col>
          {containersList.map((container) => (
            <Col size={4} key={container.name}>
              <Card title={container.name}>
                <ul className="p-list">
                  <li className="p-list__item">
                    <strong>Status:</strong> {container.status}
                  </li>
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="p-strip">
        <Row>
          <Col size={12}>
            <h2>Virtual Machines</h2>
          </Col>
          {virtualMachinesList.map((virtualMachine) => (
            <Col size={4} key={virtualMachine.name}>
              <Card title={virtualMachine.name}>
                <ul className="p-list">
                  <li className="p-list__item">
                    <strong>Status:</strong> {virtualMachine.status}
                  </li>
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default Instances;
