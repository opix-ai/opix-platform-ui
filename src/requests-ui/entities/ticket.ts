export class Ticket {
  id: string;
  name: string;
  assigner: From;
  assignee: string;
  created: Date;
  updated: Date;
  description: string;
  status: string;
  priority: string;
  comments: TicketComment[];

  constructor() {
    this.id = null;
    this.name = null;
    this.assigner = null;
    this.assignee = null;
    this.created = null;
    this.updated = null;
    this.description = null;
    this.status = null;
    this.priority = null;
    this.comments = null;
    this.comments = [];
  };

  // constructor(id: string, name: string, assigner: string, assignee: string, created: Date, updated: Date, description: string, status: string, priority: string, comments: TicketComment[]) {
  //   this.id = id;
  //   this.name = name;
  //   this.assigner = assigner;
  //   this.assignee = assignee;
  //   this.created = created;
  //   this.updated = updated;
  //   this.description = description;
  //   this.status = status;
  //   this.priority = priority;
  //   this.comments = comments;
  // }
}

export class TicketComment {
  from: From;
  text: string;
  date: Date;

  constructor() {
    this.from = null;
    this.text = null;
    this.date = null;
  }
}

export class From {
  firstname: string;
  lastname: string;
  email: string;

  constructor() {
    this.firstname = null;
    this.lastname = null;
    this.email = null;
  }
}
