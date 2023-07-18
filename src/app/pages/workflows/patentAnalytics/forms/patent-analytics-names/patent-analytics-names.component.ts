import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {Indicator, PatentNames} from "../../../../../domain/patentClassifications";
import {InputService} from "../../../../../services/input.service";
import {Job, JobArgument} from "../../../../../../dataSpaceUI/app/domain/job";
import {SuccessPageComponent} from "../../../../successPage/successPage.component";

declare var UIkit: any;

@Component({
  selector: 'patent-analytics-names',
  templateUrl: 'patent-analytics-names.component.html'
})

export class PatentAnalyticsNamesComponent implements OnInit, OnDestroy {

  @ViewChild(SuccessPageComponent) success:SuccessPageComponent;

  patentInputs: PatentNames = new PatentNames();
  formData: FormData = new FormData();
  job: Job = new Job();
  file: File = null;
  yearRange: number[] = [];
  indicators: Indicator[] = [];
  metadata: {label: string, code: string, info: string}[] = [];
  message: string = null;
  submitSuccess: boolean = false;
  timeOutHandler;
  modal
  tabs
  tabIndex: number = 0;

  headerHeight = 91;

  indicatorsMap: Map<string, Indicator> = new Map();

  constructor(private router: Router, private inputService: InputService) {
  }

  ngOnInit() {
    this.getIndicators();
    this.getMetadata();
    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
    this.modal = UIkit.modal(document.getElementById('modal-input'));
    this.modal.show().then(
      setTimeout( ()=> {
        this.tabs = UIkit.tab(document.getElementById('tabs'), {connect: '.switcher-container'})
        this.headerHeight = document.getElementById('modal-header').offsetHeight;
        this.initUploadElements();
        UIkit.util.on('.js-upload', 'upload', (e, files) => {
          this.file = files[0];
        });
      }, 0)
    );
  }

  ngOnDestroy() {
    this.modal?.$destroy(true);
    this.tabs?.$destroy(true);
  }

  submitJob() {
    if (this.file?.name && this.patentInputs.indicators.length > 0 && this.patentInputs.metadata.length > 0) {
      this.job.jobArguments.push(new JobArgument('dataSource', [this.patentInputs.dataSource]));
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
      this.inputService.postJobCustom(this.formData).subscribe(
        res => {
          this.success.timer(1/12);
          this.submitSuccess = true;
        }, error => {
          console.log(error);
          this.message = 'Sorry something went wrong. Please try again later.'
        }
      );

    } else {
      this.message = 'File, Indicators and Metadata are mandatory'
    }
  }

  getIndicators() {
    this.inputService.getIndicators('Patents-Names').subscribe(
      res=> {
        // for (let key in res) {
        //   this.indicators.push({label: key, code: res[key]});
        // }
        this.indicators = [...res];

        for(let indicator of this.indicators) {
          this.indicatorsMap.set(indicator.id, indicator);
        }
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
      }
    );
  }

  /** on file drop handler **/
  onFileDropped(files: File[]) {
    if(files && files.length) {
      this.file = files[0];
    }
  }

  /** handle file from browsing*/
  fileBrowseHandler(event) {
    if(event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      // reader.readAsDataURL(this.file);
      // reader.onload = () => {
      //   this.patentInputs.file = (reader.result as string).split('base64,')[1];
      // };
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


  selectAllIndicators(event) {
    if (!event.target.checked) {
      this.patentInputs.indicators = [];
      return;
    }
    if (event.target.checked) {
      let tmpIndicators: string[] = [];
      this.indicators.forEach(indicator => {
        tmpIndicators.push(indicator.id);
      });
      this.patentInputs.indicators = tmpIndicators;
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
      if (this.file)
        return true;
    }
    if (step === 1) {
      if (this.patentInputs.dataSource)
        return true;
    }
    if (step === 2) {
      if (this.patentInputs.from && this.patentInputs.to)
        return true
    }
    if (step === 3) {
      if (this.patentInputs.indicators.length > 0)
        return true;
    }
    if (step === 4) {
      if (this.patentInputs.metadata.length > 0)
        return true;
    }
    return false;
  }

  showSwitcherTab(index: number) {
    this.tabs.show(index);
    this.tabIndex = index;
  }

  clearMessage() {
    setTimeout(()=>{
      this.message = null;
    }, 300);
  }

  dropHandler(ev) {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }

  dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  initUploadElements() {
    // let bar = document.getElementById('js-progressbar');

    UIkit.upload('.js-upload', {

      url: '',
      multiple: false,

      beforeSend: function () {
        console.log('beforeSend', arguments);
      },
      beforeAll: function () {
        console.log('beforeAll', arguments);
      },
      load: function () {
        console.log('load', arguments);
      },
      error: function () {
        console.log('error', arguments);
      },
      complete: function () {
        console.log('complete', arguments);
      },

      // loadStart: function (e) {
      //   console.log('loadStart', arguments);
      //
      //   bar.removeAttribute('hidden');
      //   bar['max'] = e.total;
      //   bar['value'] = e.loaded;
      // },
      //
      // progress: function (e) {
      //   console.log('progress', arguments);
      //
      //   bar['max'] = e.total;
      //   bar['value'] = e.loaded;
      // },
      //
      // loadEnd: function (e) {
      //   console.log('loadEnd', arguments);
      //
      //   bar['max'] = e.total;
      //   bar['value'] = e.loaded;
      // },

      completeAll: function () {
        console.log('completeAll', arguments);

        // setTimeout(function () {
        //   bar.setAttribute('hidden', 'hidden');
        // }, 1000);

        alert('Upload Completed');
      }

    });
  }

}
