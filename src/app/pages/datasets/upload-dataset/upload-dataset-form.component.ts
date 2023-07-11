import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkflowDatasetsService} from "../../../services/workflow-datasets.service";

@Component({
  selector: 'upload-dataset',
  templateUrl: 'upload-dataset-form.component.html',
  providers: [WorkflowDatasetsService]
})

export class UploadDatasetFormComponent implements OnInit {

  file: File = null;
  formData: FormData = null;
  datasetForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    usageList: new FormArray([new FormControl(null)])
  });
  dataset: any;
  id: string = null;
  edit: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private datasetService: WorkflowDatasetsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.id = params['id'];
          this.datasetService.getDataset(this.id).subscribe(
            res => {
              this.dataset = res
              this.datasetForm.patchValue(res);
            },
            error => {console.error(error)}
          );
        }
      }
    );
  }

  submitData() {
    if (this.datasetForm.valid && this.file) {
      this.formData.append('file', this.file);
      this.formData.append('form', this.datasetForm.value);
    } else {
      console.log('Incomplete form or file missing');
    }
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

  /** on file drop handler **/
  onFileDropped(files: File[]) {
    // this.prepareFilesList($event);
    console.log(files)
    if(files && files.length) {
      this.file = files[0];
      console.log(this.file.name);
    }
  }

  /** handle file from browsing **/
  fileBrowseHandler(event) {
    // this.prepareFilesList(files);

    if(event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      console.log(this.file.name);
    }
  }
}
