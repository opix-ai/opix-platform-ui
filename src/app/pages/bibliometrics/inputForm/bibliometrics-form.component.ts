import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Bibliometrics} from "../../../domain/patentAnalytics";
import {InputService} from "../../../services/input.service";
import {Job, JobArgument} from "../../../../dataSpaceUI/app/domain/job";

@Component({
  selector: 'app-bibliometric-input-form',
  templateUrl: 'bibliometrics-form.component.html'
})

export class BibliometricsFormComponent implements OnInit {

  bibliometricForm: FormGroup = Bibliometrics.toFormGroup(this.fb);
  bibliometric: object = null;
  countries: object = null;
  indicators: {label: string, id: string}[] = [];
  countriesFlat: object[] = [];
  domains: string[] = [];
  categories: string[] = [];
  topics: object[] = [];
  accessRights: string[] = [];
  additionalOptions: object[] = [];
  publicationTypes: object[] = [];
  yearRange: number[] = [];
  allTopics: boolean = false;
  job: Job = new Job();

  constructor(private fb: FormBuilder, private inputService: InputService) {
  }

  ngOnInit() {
    this.getTopics();
    this.getCountries();
    this.getIndicators();
    this.getAccessRights();

    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
  }

  submitJob() {
    if (this.bibliometricForm.invalid) {
      console.log('Invalid Form');
      // return;
    }
    for (let control in this.bibliometricForm.controls) {
      if (this.bibliometricForm.controls[control].value instanceof Array) {
        // console.log(this.paForm.controls[control].value);
        for (let element of this.bibliometricForm.controls[control].value) {
          let key = control;
          if (control==='countries' && element.length > 2) {
            key = 'continents'
          }
          let jobArgument: JobArgument = new JobArgument(key, element);
          this.job.jobArguments.push(jobArgument);
        }
      } else if (this.bibliometricForm.controls[control].value) {
        let jobArgument: JobArgument = new JobArgument(control, this.bibliometricForm.controls[control].value);
        this.job.jobArguments.push(jobArgument);
      }
    }
    let jobArguments: any[] = [];
    jobArguments.push({'jobType':'workflow'});
    jobArguments.push({'workflowType':'patentAnalytics'});
    jobArguments.push({'jobArguments': this.job.jobArguments});
    this.job.callerAttributes = JSON.stringify(jobArguments);
    console.log(this.job);

  }

  getTopics() {
    this.inputService.getTopics().subscribe(
      value=> {
        this.bibliometric = value;
        this.setDomain();
        this.bibliometricForm.controls['domain'].valueChanges.subscribe(
          next => {
            // console.log(next);
            this.bibliometricForm.controls['category'].enable();
            this.bibliometricForm.controls['topics'].disable();
            this.setCategory(next);
          }
        );
        this.bibliometricForm.controls['category'].valueChanges.subscribe(
          next => {
            // console.log(next);
            this.bibliometricForm.controls['topics'].enable();
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

  getAccessRights() {
    this.inputService.getAccessRights().subscribe(
      res=> {
        console.log(res)
        for (let key in res) {
          this.accessRights.push(res[key]);
        }
        // console.log(this.indicators);
        this.accessRights = [...this.accessRights];      }
    );
  }

  setDomain() {
    this.domains = [];
    for (let topicsKey in this.bibliometric) {
      this.domains.push(topicsKey);
    }
    this.domains = [...this.domains];
  }

  setCategory(domain: string) {
    // console.log('setting categories');
    this.categories = [];
    this.bibliometricForm.controls['category'].reset(null);
    if (domain === null) {
      this.bibliometricForm.controls['category'].disable();
      return;
    }
    for (let domainKey in this.bibliometric[domain]) {
      this.categories.push(domainKey);
    }
    this.categories = [...this.categories];
  }

  setTopics(category: string) {
    // console.log('setting topics');
    this.topics = [];
    this.bibliometricForm.controls['topics'].reset(null);
    this.allTopics = false;

    if (category === null || !this.bibliometricForm.controls['domain'].value) {
      this.bibliometricForm.controls['topics'].disable();
      return;
    }
    for (let topicKey in this.bibliometric[this.bibliometricForm.controls['domain'].value][category]) {
      this.bibliometric[this.bibliometricForm.controls['domain'].value][category][topicKey].label =  topicKey;
      this.topics.push(this.bibliometric[this.bibliometricForm.controls['domain'].value][category][topicKey]);
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
      this.bibliometricForm.get('topics').setValue([]);
      return;
    }
    if (event.target.checked) {
      this.allTopics = true;
      let tmpTopics: string[] = [];
      this.topics.forEach(topic =>{
        tmpTopics.push(topic['topic']);
      });
      this.bibliometricForm.get('topics').setValue(tmpTopics);
    }
  }

  selectAllCountries(event) {
    if (!event.target.checked) {
      this.bibliometricForm.get('countries').setValue([]);
      return;
    }
    if (event.target.checked) {
      let countryCodes: string[] = [];
      this.countriesFlat.forEach(country =>{
        countryCodes.push(country['country_code']);
      });
      this.bibliometricForm.get('countries').setValue(countryCodes);
    }
  }

  selectAllIndicators(event) {
    if (!event.target.checked) {
      this.bibliometricForm.get('indicators').setValue([]);
      return;
    }
    if (event.target.checked) {
      let tmpIndicators: string[] = [];
      this.indicators.forEach(indicator => {
        tmpIndicators.push(indicator.id);
      });
      this.bibliometricForm.get('indicators').setValue(tmpIndicators);
    }
  }

  selectAllData(event, name: string) {
    if (!event.target.checked) {
      this.bibliometricForm.get(name).setValue([]);
      return;
    }
    if (event.target.checked) {
      let tmpIndicators: string[] = [];
      this[name].forEach(indicator => {
        tmpIndicators.push(indicator.id);
      });
      this.bibliometricForm.get(name).setValue(tmpIndicators);
    }
  }

  removeCheck(controlName: string) {
    return this.bibliometricForm.controls[controlName].value.length === 0;
  }

}
