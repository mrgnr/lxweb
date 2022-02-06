import { useState } from "react";
import { useQuery } from "react-query";

const useVirtualMachinesList = () => {
  const [virtualMachinesList, setVirtualMachinesList] = useState([]);

  const { isLoading, isSuccess, isError, error } = useQuery(
    "virtualMachinesList",
    async () => {
      console.log("!!! fetch virtualMachinesList");
      const response = await fetch("/api/virtual_machines/list");
      const responseData = await response.json();

      if (responseData.errors) {
        throw new Error(responseData.errors);
      }

      const virtualMachinesList = responseData;
      console.log("!!! virtualMachinesList: ", virtualMachinesList);
      setVirtualMachinesList(virtualMachinesList);
    },
    { enabled: true }
  );

  return {
    virtualMachinesList,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useVirtualMachinesList;
