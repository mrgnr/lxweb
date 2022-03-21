import {
  Instance,
  InstanceContext as InstanceContextType,
  LxdLifecycleEvent,
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
  { instanceList, setInstanceList }: InstanceContextType
) => {
  const instance = instanceList.find((instance: Instance) => {
    return instance.name === instanceName;
  });

  setInstanceList(
    instanceList.map((instance: Instance) =>
      instance.name === instanceName ? { ...instance, ...attributes } : instance
    )
  );
};
