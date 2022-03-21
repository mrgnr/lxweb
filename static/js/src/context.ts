import { createContext } from "react";
import { InstanceContext as InstanceContextType } from "./types";

export const InstanceContext = createContext<InstanceContextType>({
  instanceList: [],
  setInstanceList: () => {},
});
