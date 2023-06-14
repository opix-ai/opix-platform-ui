export class Job {
  callerAttributes: string;
  jobArguments: JobArgument[];
  serviceArguments: ServiceArgument;


  constructor() {
    this.callerAttributes = ''
    this.jobArguments = [];
    this.serviceArguments = new ServiceArgument();
  }
}

export class JobArgument {
  name: string;
  value: string;


  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export class ServiceArgument {
  infraId: string;
  processId: string;
  user: string;

  constructor() {
    this.infraId = null;
    this.processId = null;
    this.user = null;
  }
}

export class BrowseJob {
  id: string;
  name: string;
  label: string;
  createdAt: string;
  launchedAt: string;
  finishedAt: string;
  user: string;
  infraId: string;
  callerAttributes: string;
  callerAttributesObj: object;
  mergedStatus: string;
  status: Status[];
}

export class Status {
  id: string;
  timestamp: string;
  status: string;
  source: string;
  payload: string;
}
