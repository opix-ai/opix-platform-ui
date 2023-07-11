import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'my-datasets',
  templateUrl: 'my-datasets.component.html'
})

export class MyDatasetsComponent implements OnInit {

  dummy: any[] = [
    {
      id: "string",
      name: "string",
      description: "string",
      usages: [
        "string"
      ],
      owner: "string",
      creationDate: "2023-07-11T11:42:53.952Z",
      createdBy: "string",
      modificationDate: "2023-07-11T11:42:53.952Z",
      modifiedBy: "string"
    },
    {
      id: "string",
      name: "string",
      description: "string",
      usages: [
        "string"
      ],
      owner: "string",
      creationDate: "2023-07-11T11:42:53.952Z",
      createdBy: "string",
      modificationDate: "2023-07-11T11:42:53.952Z",
      modifiedBy: "string"
    }
  ]

  constructor() {}

  ngOnInit() {
  }
}
