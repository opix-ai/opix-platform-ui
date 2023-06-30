import {AfterContentChecked, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PatentNames} from "../../../domain/patentClassifications";
import {InputService} from "../../../services/input.service";
import {environment} from "../../../../environments/environment";
import {Job, JobArgument} from "../../../../dataSpaceUI/app/domain/job";

declare var UIkit: any;

@Component({
  selector: 'patent-analytics-names',
  templateUrl: 'patent-analytics-names.component.html'
})

export class PatentAnalyticsNamesComponent implements OnInit, AfterContentChecked {

  patentInputs: PatentNames = new PatentNames();
  formData: FormData = new FormData();
  job: Job = new Job();
  file: File = null;
  yearRange: number[] = [];
  indicators: {label: string, id: string}[] = [];
  metadata: {label: string, id: string}[] = [];
  submitSuccess: boolean = false;

  headerHeight = 0;

  constructor(private router: Router, private inputService: InputService) {
  }

  ngOnInit() {
    this.getIndicators();
    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
    UIkit.modal('#modal-input').show();
  }

  ngAfterContentChecked() {
    this.headerHeight = document.getElementById('modal-header').offsetHeight;
  }

  submitJob() {
    this.job.jobArguments.push(new JobArgument('from', [this.patentInputs.from]));
    this.job.jobArguments.push(new JobArgument('to', [this.patentInputs.to]));
    this.job.jobArguments.push(new JobArgument('indicators', this.patentInputs.indicators));
    this.job.jobArguments.push(new JobArgument('metadata', this.patentInputs.metadata));
    let jobArguments: any[] = [];
    jobArguments.push({'jobType':'workflow'});
    jobArguments.push({'workflowType':'patentAnalytics'});
    jobArguments.push({'jobArguments': this.job.jobArguments});
    this.job.callerAttributes = JSON.stringify(jobArguments);
    this.job.serviceArguments.processId = 'patent-names-workflow';
    this.formData.append('file', this.file);
    this.formData.append('job', JSON.stringify(this.job));
    console.log(this.formData);
    this.inputService.postJobCustom(this.formData).subscribe(
      res => {
        console.log(res);
      }, error => {console.log(error);}
    );
  }

  getIndicators() {
    this.inputService.getIndicators('Patents').subscribe(
      res=> {
        for (let key in res) {
          this.indicators.push({label: key, id: res[key]});
        }
        // console.log(this.indicators);
        this.indicators = [...this.indicators];
        this.metadata = [...this.indicators];
      }
    );
  }

  onFileSelect(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        // this.imageSrc = reader.result as string;
        this.patentInputs.file = (reader.result as string).split('base64,')[1];
      };
    }
  }

  indicatorSelect(event) {
    if (event.target.checked)
      this.patentInputs.indicators.push(event.target.value);
    else {
      const index = this.patentInputs.indicators.indexOf(event.target.value);
      if (index > -1) {
        this.patentInputs.indicators.splice(index, 1);
      }
    }
  }

  selectAll(event, name: string) {
    if (!event.target.checked) {
      this.patentInputs[name] = [];
      return;
    }
    if (event.target.checked) {
      let tmpIndicators: string[] = [];
      this.indicators.forEach(indicator => {
        tmpIndicators.push(indicator.id);
      });
      this.patentInputs[name] = tmpIndicators;
    }
  }

  metadataSelect(event) {
    if (event.target.checked)
      this.patentInputs.metadata.push(event.target.value);
    else {
      const index = this.patentInputs.metadata.indexOf(event.target.value);
      if (index > -1) {
        this.patentInputs.metadata.splice(index, 1);
      }
    }
  }

  showChecked(name: string, value: string) {
    return this.patentInputs[name].includes(value);
  }

  removeCheck(controlName: string) {
    return this.patentInputs[controlName].length === 0;
  }

  navigateBack() {
    if (sessionStorage.getItem('returnUrl')) {
      this.router.navigate([sessionStorage.getItem('returnUrl')]);
      return;
    }
    this.router.navigate(['/dashboard']);
  }

  stepComplete(step: number) {
    if (step === 0) {
      if (this.patentInputs.file)
        return true;
    }
    if (step === 1) {
      if (this.patentInputs.from && this.patentInputs.to)
        return true
    }
    if (step === 2) {
      if (this.patentInputs.indicators.length > 0 && this.patentInputs.metadata.length > 0)
        return true;
    }
    return false;
  }

  continue(index: number) {
    UIkit.switcher('#tabs').show(index);
  }

  protected readonly parent = parent;
}
