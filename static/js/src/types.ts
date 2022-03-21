export type Instance = {
  name: string;
  description: string;
  type: string;
  created_at: string;
  last_used_at: string;
  status: string;
  dirty: boolean;
  stateful: boolean;
  ephemeral: boolean;
  config: string;
};

export type InstanceContext = {
  instanceList: Instance[];
  setInstanceList: Function;
};

export type LxdEvent = {
  location: string;
  metadata: Record<string, any>;
  timestamp: string;
  type: string;
};

export type LxdLifecycleEvent = {
  location: string;
  metadata: {
    action: string;
    requestor: Record<string, any>;
    source: string;
  };
  timestamp: string;
  type: "lifecycle";
};
