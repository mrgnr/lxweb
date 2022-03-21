import React, { useContext, useEffect } from "react";
import { Card, Col, Row } from "@canonical/react-components";
import { LxdEvent, LxdLifecycleEvent } from "../../types";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import useContainerList from "../../hooks/useContainerList";
import useVirtualMachineList from "../../hooks/useVirtualMachineList";
import { handleLifecycleEvent } from "../../events";
import { InstanceContext } from "../../context";

const Instances = () => {
  const { containerList } = useContainerList();
  const { virtualMachineList } = useVirtualMachineList();
  const { setContainerList, setVirtualMachineList } =
    useContext(InstanceContext);

  useEffect(() => {
    const eventSource = new EventSource("/api/events");
    eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("event: ", data);
      if (data.type === "lifecycle") {
        handleLifecycleEvent(data as LxdLifecycleEvent, {
          containerList,
          setContainerList,
          virtualMachineList,
          setVirtualMachineList,
        });
      }
    };

    return () => {
      eventSource.close();
    };
  }, [
    containerList,
    setContainerList,
    virtualMachineList,
    setVirtualMachineList,
  ]);

  return (
    <>
      <section className="p-strip">
        <Row>
          <Col size={12}>
            <h2>Containers</h2>
          </Col>
          {containerList.map((container) => (
            <Col size={4} key={container.name}>
              <Card title={container.name}>
                <ul className="p-list">
                  <li className="p-list__item">
                    <strong>Status:</strong> {container.status}
                  </li>
                </ul>
                {container.status === "Running" ? (
                  <StopButton name={container.name} />
                ) : (
                  <StartButton name={container.name} />
                )}
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
          {virtualMachineList.map((virtualMachine) => (
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
