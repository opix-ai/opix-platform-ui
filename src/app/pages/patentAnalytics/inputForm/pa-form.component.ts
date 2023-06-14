import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PatentAnalytics} from "../../../domain/patentAnalytics";
import {InputService} from "../../../services/input.service";
import {Job, JobArgument} from "../../../../dataSpaceUI/app/domain/job";

@Component({
  selector: 'app-pa-input-form',
  templateUrl: 'pa-form.component.html'
})

export class PaFormComponent implements OnInit {

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

  constructor(private fb: FormBuilder, private inputService: InputService) {
  }

  ngOnInit() {
    this.getTopics();
    this.getCountries();
    this.getIndicators();

    for (let i = 2010; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
  }

  submitJob() {
    if (this.paForm.invalid) {
      console.log('Invalid Form');
      // return;
    }
    for (let control in this.paForm.controls) {
      if (this.paForm.controls[control].value instanceof Array) {
        // console.log(this.paForm.controls[control].value);
      } else {
        let jobArgument: JobArgument = new JobArgument(control, this.paForm.controls[control].value);
        this.job.jobArguments.push(jobArgument);
      }
    }
    console.log(this.job);

  }

  getTopics() {
    this.inputService.getTopics().subscribe(
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
    this.inputService.getIndicators().subscribe(
      res=> {
        for (let key in res) {
          this.indicators.push({label: key, id: res[key]});
        }
        // console.log(this.indicators);
        this.indicators = [...this.indicators];      }
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
        this.countriesFlat = [...this.countriesFlat]
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
    this.paForm.controls['topics'].reset(null);
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

}