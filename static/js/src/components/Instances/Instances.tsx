import React, { useContext, useEffect } from "react";
import { Card, Col, Row } from "@canonical/react-components";
import { LxdLifecycleEvent } from "../../types";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import useInstanceList from "../../hooks/useInstanceList";
import { handleLifecycleEvent } from "../../events";
import { InstanceContext } from "../../context";

const Instances = () => {
  const { instanceList } = useInstanceList();
  const { setInstanceList } = useContext(InstanceContext);

  useEffect(() => {
    const eventSource = new EventSource("/api/events");
    eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("event: ", data);
      if (data.type === "lifecycle") {
        handleLifecycleEvent(data as LxdLifecycleEvent, {
          instanceList,
          setInstanceList,
        });
      }
    };

    return () => {
      eventSource.close();
    };
  }, [instanceList, setInstanceList]);

  return (
    <>
      <section className="p-strip">
        <Row>
          <Col size={12}>
            <h2>Instances</h2>
          </Col>
          {instanceList.map((instance) => (
            <Col size={4} key={instance.name}>
              <Card title={instance.name}>
                <ul className="p-list">
                  <li className="p-list__item">
                    <strong>Status:</strong> {instance.status}
                  </li>
                </ul>
                {instance.status === "Running" ? (
                  <StopButton name={instance.name} />
                ) : (
                  <StartButton name={instance.name} />
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default Instances;
