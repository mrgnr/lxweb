import React from "react";
import { Button } from "@canonical/react-components";

type Props = {
  name: string;
};

const StopButton = ({ name }: Props) => {
  const stopInstance = async () => {
    console.log(`!!! stop container ${name}`);

    const response = await fetch(`/api/container/stop/${name}`);
    const responseData = await response.json();

    if (responseData.errors) {
      throw new Error(responseData.errors);
    }
  };

  return <Button onClick={stopInstance}>Stop</Button>;
};

export default StopButton;
