import {
  Container,
  InstanceContext as InstanceContextType,
  LxdLifecycleEvent,
  VirtualMachine,
} from "./types";

export const handleLifecycleEvent = (
  event: LxdLifecycleEvent,
  instanceContext: InstanceContextType
) => {
  const instanceName = event.metadata.source.split("/").at(-1);

  if (instanceName && event.metadata.action === "instance-started") {
    updateInstance(instanceName, { status: "Running" }, instanceContext);
  } else if (
    instanceName &&
    (event.metadata.action === "instance-shutdown" ||
      event.metadata.action === "instance-stopped")
  ) {
    updateInstance(instanceName, { status: "Stopped" }, instanceContext);
  }
};

const updateInstance = (
  instanceName: string,
  attributes: Record<string, any>,
  {
    containerList,
    setContainerList,
    virtualMachineList,
    setVirtualMachineList,
  }: InstanceContextType
) => {
  const instanceList = containerList.concat(virtualMachineList);
  const instance = instanceList.find((instance: Container | VirtualMachine) => {
    return instance.name === instanceName;
  });

  if (instance && instance.type === "container") {
    setContainerList(
      containerList.map((container: Container) =>
        container.name === instanceName
          ? { ...container, ...attributes }
          : container
      )
    );
  } else if (instance && instance.type === "virtual-machine") {
    setVirtualMachineList(
      virtualMachineList.map((virtualMachine: VirtualMachine) =>
        virtualMachine.name === instanceName
          ? { ...virtualMachine, ...attributes }
          : virtualMachine
      )
    );
  }
};
