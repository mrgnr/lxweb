import React from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "@canonical/react-components";

const App = () => {
  return (
    <section className="p-strip--light">
      <Row>
        <Col size={12}>
          <h1>lxman</h1>
        </Col>
      </Row>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("react-root"));
