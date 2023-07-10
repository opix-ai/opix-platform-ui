import {Component, OnInit} from "@angular/core";
import {Dataset} from "../../../domain/dataset";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'upload-dataset',
  templateUrl: 'upload-dataset-form.component.html'
})

export class UploadDatasetFormComponent implements OnInit {

  model = new Dataset();
  datasetForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    usageList: new FormArray([new FormControl(null)])
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  get usageList() {
    return this.datasetForm.controls['usageList'] as FormArray;
  }

  addUsage() {
    this.usageList.push(new FormControl(null));
  }

  removeUsage(index: number) {
    this.usageList.removeAt(index);
  }
}
