import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {InputService} from "../../../../../services/input.service";
import {Indicator, PatentClassifications} from "../../../../../domain/patentClassifications";
import {Job, JobArgument} from "../../../../../../dataSpaceUI/app/domain/job";
import {SuccessPageComponent} from "../../../../successPage/successPage.component";

declare var UIkit: any;

@Component({
  selector: 'patent-analytics-classifications-input',
  templateUrl: 'patent-analytics-classifications.component.html'
})

export class PatentAnalyticsClassificationsComponent implements OnInit, OnDestroy {

  @ViewChild(SuccessPageComponent) success:SuccessPageComponent;

  paForm: FormGroup = PatentClassifications.toFormGroup(this.fb);
  patents: object = null;
  countries: object = null;
  indicators: Indicator[] = [];
  countriesFlat: object[] = [];
  domains: string[] = [];
  categories: string[] = [];
  topics: object[] = [];
  yearRange: number[] = [];
  allTopics: boolean = false;
  job: Job = new Job();
  message: string = null;
  submitSuccess: boolean = false;
  modal
  tabs
  tabIndex: number = 0;

  headerHeight = 91;

  constructor(private fb: FormBuilder,private router: Router, private inputService: InputService) {
  }

  ngOnInit() {
    this.getTopics();
    this.getCountries();
    this.getIndicators();

    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
    this.modal = UIkit.modal(document.getElementById('modal-input'));
      this.modal.show().then(
      setTimeout( ()=> {
        this.tabs = UIkit.tab(document.getElementById('tabs'), {connect: '.switcher-container'});
        this.headerHeight = document.getElementById('modal-header').offsetHeight;
      }, 0)
    );
  }

  ngOnDestroy() {
    this.modal?.$destroy(true);
    this.tabs?.$destroy(true);
  }

  submitJob() {
    if (this.paForm.invalid) {
      // console.log('Invalid Form');
      for (let controlsKey in this.paForm.controls) {
        console.log(controlsKey);
        console.log(this.paForm.controls[controlsKey].valid);
      }
      this.message = 'Fields with * are mandatory.'
      window.scrollTo(0,0);
      return;
    }
    this.job.jobArguments = [];
    for (let control in this.paForm.controls) {
      if (this.paForm.controls[control].value instanceof Array && this.paForm.controls[control].value) {
        let jobArgument: JobArgument = new JobArgument(control, this.paForm.controls[control].value);
        this.job.jobArguments.push(jobArgument);
      } else if (this.paForm.controls[control].value) {
        let jobArgument: JobArgument = new JobArgument(control, [this.paForm.controls[control].value]);
        this.job.jobArguments.push(jobArgument);
      }
    }
    let jobArguments: any[] = [];
    jobArguments.push({'jobType':'workflow'});
    jobArguments.push({'workflowType':'patentAnalyticsClassification'});
    jobArguments.push({'jobArguments': this.job.jobArguments});
    this.job.callerAttributes = JSON.stringify(jobArguments);
    this.job.serviceArguments.processId = 'patent-workflow';
    // console.log(this.job);

    this.inputService.postJob(this.job).subscribe(
      res => {
        this.success.timer(1/12);
        this.submitSuccess = true;
      },error => {
        console.error(error);
        this.message = 'Sorry something went wrong. Please try again later.'
      }
    );

  }

  getTopics() {
    this.inputService.getTopics('Patents').subscribe(
      value=> {
        this.patents = value;
        this.setDomain();
        this.paForm.controls['domain'].valueChanges.subscribe(
          next => {
            // console.log(next);
            this.paForm.controls['category'].enable();
            this.paForm.controls['topics'].disable();
            this.setCategory(next);
          }
        );
        this.paForm.controls['category'].valueChanges.subscribe(
          next => {
            // console.log(next);
            this.paForm.controls['topics'].enable();
            this.setTopics(next);
          }
        );
      },
      error => {console.error(error)}
    );
  }

  getIndicators() {
    this.inputService.getIndicators('Patents-Topics').subscribe(
      res=> {
        // for (let key in res) {
        //   this.indicators.push({label: key, id: res[key]});
        // }
        // // console.log(this.indicators);
        this.indicators = [...res];
      }
    );
  }

  getCountries() {
    this.inputService.getCountries().subscribe(
      res => {
        this.countries = res;
        for (let continent in this.countries) {
          for (let country in this.countries[continent]) {
            this.countries[continent][country].continent = continent;
            this.countriesFlat.push(this.countries[continent][country]);
          }
        }
        this.countriesFlat = [...this.countriesFlat];
      },
      error => {
        console.error(error);
      }
    );
  }

  setDomain() {
    this.domains = [];
    for (let topicsKey in this.patents) {
      this.domains.push(topicsKey);
    }
    this.domains = [...this.domains];
  }

  setCategory(domain: string) {
    // console.log('setting categories');
    this.categories = [];
    this.paForm.controls['category'].reset(null);
    if (domain === null) {
      this.paForm.controls['category'].disable();
      return;
    }
    for (let domainKey in this.patents[domain]) {
      this.categories.push(domainKey);
    }
    this.categories = [...this.categories];
  }

  setTopics(category: string) {
    // console.log('setting topics');
    this.topics = [];
    this.paForm.controls['topics'].reset([]);
    this.allTopics = false;

    if (category === null || !this.paForm.controls['domain'].value) {
      this.paForm.controls['topics'].disable();
      return;
    }
    for (let topicKey in this.patents[this.paForm.controls['domain'].value][category]) {
      this.patents[this.paForm.controls['domain'].value][category][topicKey].label = topicKey;
      this.topics.push(this.patents[this.paForm.controls['domain'].value][category][topicKey]);
    }
    this.topics = [...this.topics];
  }

  compareAccounts = (item, selected) => {

    if (selected.length === 2) {
      if (item.country_code && selected) {
        return item.country_code === selected;
      }
    } else {
      if (selected && item.continent) {
        return item.continent === selected;
      }
    }
    return false;
  };

  showChecked(name: string, value: string) {
    return this.paForm.controls[name].value.includes(value);
  }

  topicSelect(event) {
    let tmpArr: string[] = [];
    if (event.target.checked) {
      tmpArr = this.paForm.controls['topics'].value;
      tmpArr.push(event.target.value);
      this.paForm.controls['topics'].setValue(tmpArr);
    }
    else {
      const index = this.paForm.controls['topics'].value.indexOf(event.target.value);
      if (index > -1) {
        tmpArr = this.paForm.controls['topics'].value;
        tmpArr.splice(index, 1);
        this.paForm.controls['topics'].setValue(tmpArr);
      }
    }
  }

  selectAllTopics(event) {
    if (!event.target.checked) {
      this.allTopics = false;
      this.paForm.get('topics').setValue([]);
      return;
    }
    if (event.target.checked) {
      this.allTopics = true;
      let tmpTopics: string[] = [];
      this.topics.forEach(topic =>{
        tmpTopics.push(topic['topic']);
      });
      this.paForm.get('topics').setValue(tmpTopics);
    }
  }

  selectAllCountries(event) {
    if (!event.target.checked) {
      this.paForm.get('countries').setValue([]);
      return;
    }
    if (event.target.checked) {
      let countryCodes: string[] = [];
      this.countriesFlat.forEach(country =>{
        countryCodes.push(country['country_code']);
      });
      this.paForm.get('countries').setValue(countryCodes);
    }
  }

  indicatorSelect(event) {
    let tmpArr: string[] = [];
    if (event.target.checked) {
      tmpArr = this.paForm.controls['indicators'].value;
      tmpArr.push(event.target.value);
      this.paForm.controls['indicators'].setValue(tmpArr);
    }
    else {
      const index = this.paForm.controls['indicators'].value.indexOf(event.target.value);
      if (index > -1) {
        tmpArr = this.paForm.controls['indicators'].value;
        tmpArr.splice(index, 1);
        this.paForm.controls['indicators'].setValue(tmpArr);
      }
    }
  }

  selectAllIndicators(event) {
    if (!event.target.checked) {
      this.paForm.get('indicators').setValue([]);
      return;
    }
    if (event.target.checked) {
      let tmpIndicators: string[] = [];
      this.indicators.forEach(indicator => {
        tmpIndicators.push(indicator.id);
      });
      this.paForm.get('indicators').setValue(tmpIndicators);
    }
  }

  removeCheck(controlName: string) {
    return this.paForm.controls[controlName].value.length === 0;
  }

  getCountryName(code: string) {
    // console.log(code);
    this.countriesFlat.forEach(country => {
      // console.log(country['country_code']);
      // console.log(country['name']);
      if (country['country_code'] == code)
        return country['name'];
    });
    return '';
  }

  showSwitcherTab(index: number) {
    this.tabs.show(index);
    this.tabIndex = index;
  }

  stepComplete(step: number) {
    if (step === 0) {
      if (this.paForm.controls['dataSource'].value)
        return true;
    }
    if (step === 1) {
      if (this.paForm.controls['domain'].valid && this.paForm.controls['category'].valid
          && this.paForm.controls['topics'].valid)
      return true
    }
    if (step === 2) {
      if (this.paForm.controls['from'].valid && this.paForm.controls['from'].valid && this.paForm.controls['countries'].valid)
        return true;
    }
    if (step === 3) {
      if (this.paForm.controls['indicators'].value.length > 0)
        return true;
    }

    return false;
  }

  clearMessage() {
    setTimeout(()=> {
      this.message = null;
    }, 300);
  }

  navigateBack() {
    if (sessionStorage.getItem('returnUrl')) {
      this.router.navigate([sessionStorage.getItem('returnUrl')]);
      return;
    }
    this.router.navigate(['/dashboard']);
  }

}
