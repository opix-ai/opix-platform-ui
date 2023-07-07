export class Dataset {
  file: string;
  name: string;
  description: string;
  usageList: string[];

  constructor() {
    this.file = null;
    this.name = null;
    this.description = null;
    this.usageList = [];
  }
}
