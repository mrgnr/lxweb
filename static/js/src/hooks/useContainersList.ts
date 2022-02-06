import { useState } from "react";
import { useQuery } from "react-query";

const useContainersList = () => {
  const [containersList, setContainersList] = useState([]);

  const { isLoading, isSuccess, isError, error } = useQuery(
    "containersList",
    async () => {
      console.log("!!! fetch containersList");
      const response = await fetch("/api/containers/list");
      const responseData = await response.json();

      if (responseData.errors) {
        throw new Error(responseData.errors);
      }

      const containersList = responseData;
      console.log("!!! containersList: ", containersList);
      setContainersList(containersList);
    },
    { enabled: true }
  );

  return {
    containersList,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useContainersList;
