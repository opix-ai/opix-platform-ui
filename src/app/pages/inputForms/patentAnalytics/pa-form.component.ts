import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {InputService} from "../../../services/input.service";
import {PatentAnalytics} from "../../../domain/patentAnalytics";
import {Job, JobArgument} from "../../../../dataSpaceUI/app/domain/job";
import {SuccessPageComponent} from "../../successPage/successPage.component";
import {environment} from "../../../../environments/environment";

declare var UIkit: any;

@Component({
  selector: 'app-pa-input-form',
  templateUrl: 'pa-form.component.html'
})

export class PaFormComponent implements OnInit {

  @ViewChild(SuccessPageComponent) success:SuccessPageComponent;

  logoURL = environment.logoURL ? environment.logoURL : 'https://www.opix.ai/images/Logos/opix%20logo%202.svg';

  paForm: FormGroup = PatentAnalytics.toFormGroup(this.fb);
  patents: object = null;
  countries: object = null;
  indicators: {label: string, id: string}[] = [];
  countriesFlat: object[] = [];
  domains: string[] = [];
  categories: string[] = [];
  topics: object[] = [];
  yearRange: number[] = [];
  allTopics: boolean = false;
  job: Job = new Job();
  message: string = null;
  submitSuccess: boolean = false;

  headerHeight = 0;

  constructor(private fb: FormBuilder,private router: Router, private inputService: InputService) {
  }

  ngOnInit() {
    this.getTopics();
    this.getCountries();
    this.getIndicators();

    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
    UIkit.modal('#modal-input').show();

    this.headerHeight = document.getElementById('modal-header').offsetHeight;
  }

  submitJob() {
    if (this.paForm.invalid) {
      // console.log('Invalid Form');
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
    for (let element of this.job.jobArguments.find(el => el.name === 'topics').value) {
      element = this.paForm.get('domain').value + '.' + this.paForm.get('category').value + '.' + element;
    }
    let jobArguments: any[] = [];
    jobArguments.push({'jobType':'workflow'});
    jobArguments.push({'workflowType':'patentAnalytics'});
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
    this.inputService.getIndicators('Patents').subscribe(
      res=> {
        for (let key in res) {
          this.indicators.push({label: key, id: res[key]});
        }
        // console.log(this.indicators);
        this.indicators = [...this.indicators];
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
      this.patents[this.paForm.controls['domain'].value][category][topicKey].label =  topicKey;
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
    if (event.target.checked)
      this.paForm.controls['topics'].value.push(event.target.value);
    else {
      const index = this.paForm.controls['topics'].value.indexOf(event.target.value);
      if (index > -1) {
        this.paForm.controls['topics'].value.splice(index, 1);
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
    if (event.target.checked)
      this.paForm.controls['indicators'].value.push(event.target.value);
    else {
      const index = this.paForm.controls['indicators'].value.indexOf(event.target.value);
      if (index > -1) {
        this.paForm.controls['indicators'].value.splice(index, 1);
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
