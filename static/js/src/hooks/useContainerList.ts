import { useContext } from "react";
import { useQuery } from "react-query";
import { InstanceContext } from "../context";

const useContainerList = () => {
  const { containerList, setContainerList } = useContext(InstanceContext);

  const { isLoading, isSuccess, isError, error } = useQuery(
    "containerList",
    async () => {
      console.log("!!! fetch containerList");
      const response = await fetch("/api/containers/list");
      const responseData = await response.json();

      if (responseData.errors) {
        throw new Error(responseData.errors);
      }

      const containerList = responseData;
      console.log("!!! containerList: ", containerList);
      setContainerList(containerList);
    },
    { enabled: true }
  );

  return {
    containerList,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useContainerList;
