import {Component, OnInit} from "@angular/core";
import {Dataset} from "../../../domain/dataset";

@Component({
  selector: 'upload-dataset',
  templateUrl: 'upload-dataset-form.component.html'
})

export class UploadDatasetFormComponent implements OnInit {

  model = new Dataset();

  ngOnInit() {
  }

}
