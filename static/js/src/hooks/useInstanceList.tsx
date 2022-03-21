import { useContext } from "react";
import { useQuery } from "react-query";
import { InstanceContext } from "../context";

const useInstanceList = () => {
  const { instanceList, setInstanceList } = useContext(InstanceContext);

  const { isLoading, isSuccess, isError, error } = useQuery(
    "instanceList",
    async () => {
      console.log("!!! fetch instanceList");
      const response = await fetch("/api/instances/list");
      const responseData = await response.json();

      if (responseData.errors) {
        throw new Error(responseData.errors);
      }

      const instanceList = responseData;
      console.log("!!! instanceList: ", instanceList);
      setInstanceList(instanceList);
    },
    { enabled: true }
  );

  return {
    instanceList,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useInstanceList;
