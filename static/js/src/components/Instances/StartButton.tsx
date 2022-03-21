import React from "react";
import { Button } from "@canonical/react-components";

type Props = {
  name: string;
};

const StartButton = ({ name }: Props) => {
  const startInstance = async () => {
    console.log(`!!! start container ${name}`);

    try {
      const response = await fetch(`/api/container/start/${name}`);
      const responseData = await response.json();

      if (responseData.errors) {
        throw new Error(responseData.errors);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onClick={startInstance}>Start</Button>;
};

export default StartButton;
