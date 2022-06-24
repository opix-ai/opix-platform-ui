import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {NavigationService} from "../../services/navigation.service";
import {CatalogueService} from "../../services/catalogue.service";
import {Job, JobArguments} from "../../domain/job";
import {Router} from "@angular/router";
import {Subscriber} from "rxjs";

declare var UIkit: any;

@Component({
  selector: 'pages-request-data',
  templateUrl: 'request-data.component.html'
})

export class RequestDataComponent implements OnInit, OnDestroy {

  formPrepare = {
    entity: 'publication',
    dateFrom: '',
    dateTo: '',
    funder: this.fb.array([this.fb.control('')]),
    journal: this.fb.array([this.fb.control('')]),
    projects: this.fb.array([
      this.fb.group({
      name: [''],
      acronym: ['']
      })
    ])
  };

  dataForm: FormGroup;

  instance: Object = null;
  dataset: Object = null;

  internalId: string;

  job: Job = new Job();
  jobArguments = [];
  subscriptions = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private navigationService: NavigationService,
    private catalogueService: CatalogueService,
  ) {}

  ngOnInit() {
    this.dataForm = this.fb.group(this.formPrepare);

    this.subscriptions.push(
      this.navigationService.dataRequestIds.subscribe(
        dataRequestIds => {
          if (dataRequestIds) {
            this.subscriptions.push(
              this.catalogueService.getResourceTypeById(dataRequestIds.datasetId, 'dataset_type').subscribe(
                res => {
                  this.dataset = res;
                  this.subscriptions.push(
                    this.catalogueService.searchDatasetInstance('dataset_instance', this.dataset['name'], dataRequestIds.instanceVersion,).subscribe(
                      res => {
                        this.instance = res.results[0];
                        this.subscriptions.push(
                          this.catalogueService.getInternalId(this.dataset['name'], dataRequestIds.instanceVersion).subscribe(
                            res => {
                              this.internalId = res.toString();
                            },
                            error => {console.log(error);}
                          )
                        );
                      }
                    )
                  );
                }
              )
            );
          } else {
            console.log('there is no dataRequestIds');
          }
        },
        error => {
          console.log('error');
        },
        () => {
        }
      )
    );

  }

  ngOnDestroy(): void {
    this.navigationService.setDataRequestIds(null, null);
    this.instance = null;
    this.dataset = null;
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

  submit() {
    // this.job.jobArguments.push(new JobArguments('datasetId', this.instance['id']));
    this.job.jobArguments.push(new JobArguments('datasetId', this.internalId));


    for (const [key, value] of Object.entries(this.dataForm.getRawValue())) {

      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        for (const [subKey, subValue] of Object.entries(this.dataForm.get(key).value)) {
          // console.log(`${subKey}: ${subValue}`);
        }
      } else if (typeof value === 'object' && Array.isArray(value) && value !== null) {
        let tmpArr = this.dataForm.get(key) as FormArray;
        for (let i = 0; i < value.length; i++) {
          if (typeof value[i] === 'object' && !Array.isArray(value[i])) {
            for (let j = 0; j < tmpArr.length; j++) {
              // console.log(tmpArr[j]);
            }
            // for (const [subKey, subValue] of Object.entries(this.dataForm.get(key)[i].value)) {
            //   console.log(`${subKey}: ${subValue}`);
              // console.log(this.dataForm.get(key).get(subKey).value);
            // }
          } else if (value[i] !== '') {
            // console.log(`${key}: ${value[i]}`);
            this.job.jobArguments.push(new JobArguments(key, value[i].toString()));
          }
        }

      } else if (value !== '' && key !== 'entity') {
        // console.log(`${key}: ${value}`);
        this.job.jobArguments.push(new JobArguments(key, value.toString()));
      }
    }

    this.jobArguments.push({'jobArguments': this.job.jobArguments})
    this.jobArguments.push({'version': this.instance['metadata']['version']});
    this.jobArguments.push({'name': this.dataset['name']});
    this.jobArguments.push({'entity': this.dataForm.get('entity').value});
    this.job.callerAttributes = JSON.stringify(this.jobArguments);
    if ( this.instance['type'] === 'OpenAIRE Graph') {
      this.job.serviceArguments.processId = 'openaire-graph-kubernetes';
    } else {
      this.job.serviceArguments.processId = 'clinical-trials-kubernetes';
    }

    this.subscriptions.push(
      this.catalogueService.addJob(this.job).subscribe(
        res => {
          this.router.navigate([`/browseJobs`]);
        },
        error => {
          this.job = new Job();
          console.log(error)
        }
      )
    );
  }

  /** manage form arrays--> **/
  getFieldAsFormArray(field: string) {
    return this.dataForm.get(field) as FormArray;
  }

  push(field: string) {
    this.getFieldAsFormArray(field).push(this.fb.control(''));
  }

  remove(field: string, i: number) {
    this.getFieldAsFormArray(field).removeAt(i);
  }

  /** projects **/
  newProject(): FormGroup {
    return this.fb.group({
      name: [''],
      acronym: ['']
    });
  }

  get projectArray() {
    return this.dataForm.get('projects') as FormArray;
  }

  pushProject() {
    this.projectArray.push(this.newProject());
  }

  removeProject(index: number) {
    this.projectArray.removeAt(index);
  }

  /** <--manage form arrays **/

  printMyData(){
    console.log(this.dataForm.value);
  }

  sampleModal() {
    UIkit.modal('#sampleModal').show();
  }

  formatXml(xml, tab) { // tab = optional indent value, default is tab (\t)
    var formatted = '', indent= '';
    tab = tab || '\t';
    xml.split(/>\s*</).forEach(function(node) {
      if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
      formatted += indent + '<' + node + '>\r\n';
      if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
  }

}

