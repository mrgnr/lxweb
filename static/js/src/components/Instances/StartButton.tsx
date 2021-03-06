import React from "react";
import { Button } from "@canonical/react-components";

type Props = {
  name: string;
};

const StartButton = ({ name }: Props) => {
  const startInstance = async () => {
    console.log(`!!! start instance ${name}`);

    try {
      const response = await fetch(`/api/instance/start/${name}`);
      const responseData = await response.json();

      if (responseData.errors) {
        throw new Error(responseData.errors);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={startInstance}>
      <i className="p-icon--power-off"></i>
    </Button>
  );
};

export default StartButton;
