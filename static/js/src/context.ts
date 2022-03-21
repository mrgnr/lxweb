import { createContext } from "react";
import { InstanceContext as InstanceContextType } from "./types";

export const InstanceContext = createContext<InstanceContextType>({
  containerList: [],
  setContainerList: () => {},
  virtualMachineList: [],
  setVirtualMachineList: () => {},
});
