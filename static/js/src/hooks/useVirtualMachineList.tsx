import { useContext } from "react";
import { useQuery } from "react-query";
import { InstanceContext } from "../context";

const useVirtualMachineList = () => {
  const { virtualMachineList, setVirtualMachineList } =
    useContext(InstanceContext);

  const { isLoading, isSuccess, isError, error } = useQuery(
    "virtualMachineList",
    async () => {
      console.log("!!! fetch virtualMachineList");
      const response = await fetch("/api/virtual_machines/list");
      const responseData = await response.json();

      if (responseData.errors) {
        throw new Error(responseData.errors);
      }

      const virtualMachineList = responseData;
      console.log("!!! virtualMachineList: ", virtualMachineList);
      setVirtualMachineList(virtualMachineList);
    },
    { enabled: true }
  );

  return {
    virtualMachineList,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useVirtualMachineList;
