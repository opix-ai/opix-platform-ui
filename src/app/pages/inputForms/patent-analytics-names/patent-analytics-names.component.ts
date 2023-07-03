import {AfterContentChecked, Component, OnDestroy, OnInit} from "@angular/core";
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

export class PatentAnalyticsNamesComponent implements OnInit, OnDestroy {

  patentInputs: PatentNames = new PatentNames();
  formData: FormData = new FormData();
  job: Job = new Job();
  file: File = null;
  yearRange: number[] = [];
  indicators: {label: string, code: string}[] = [];
  metadata: {label: string, code: string, info: string}[] = [];
  submitSuccess: boolean = false;
  tabs

  headerHeight = 91;

  constructor(private router: Router, private inputService: InputService) {
  }

  ngOnInit() {
    this.getIndicators();
    this.getMetadata();
    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
    UIkit.modal('#modal-input').show().then(
      setTimeout( ()=> {
        this.tabs = UIkit.tab(document.getElementById('tabs'), {connect: '.switcher-container'})
        this.headerHeight = document.getElementById('modal-header').offsetHeight;
      }, 0)
    );
  }

  ngOnDestroy() {
    this.tabs?.$destroy(true);
  }

  submitJob() {
    this.job.jobArguments.push(new JobArgument('from', [this.patentInputs.from]));
    this.job.jobArguments.push(new JobArgument('to', [this.patentInputs.to]));
    this.job.jobArguments.push(new JobArgument('indicators', this.patentInputs.indicators));
    this.job.jobArguments.push(new JobArgument('metadata', this.patentInputs.metadata));
    let jobArguments: any[] = [];
    jobArguments.push({'jobType':'workflow'});
    jobArguments.push({'workflowType':'patentAnalyticsNames'});
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
          this.indicators.push({label: key, code: res[key]});
        }
        this.indicators = [...this.indicators];
        console.log(this.indicators);
      }
    );
  }

  getMetadata() {
    this.inputService.getMetadata('Patents').subscribe(
      res=> {
        for (let key in res) {
          this.metadata.push({label: key, code: res[key]['code'], info: res[key]['info']});
        }
        this.metadata = [...this.metadata];
        console.log(this.metadata);
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
      let tmpArray: string[] = [];
      this[name].forEach(element => {
        tmpArray.push(element.code);
      });
      this.patentInputs[name] = tmpArray;
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
    this.tabs.show(index);
  }

  protected readonly parent = parent;
}
