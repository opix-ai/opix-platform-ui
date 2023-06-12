import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PatentAnalytics} from "../../../domain/patentAnalytics";
import {InputService} from "../../../services/input.service";

@Component({
  selector: 'app-pa-input-form',
  templateUrl: 'pa-form.component.html'
})

export class PaFormComponent implements OnInit {

  paForm: FormGroup = PatentAnalytics.toFormGroup(this.fb);
  patents: object = null;
  countries: object = null;
  countriesFlat: object[] = [];
  domains: string[] = [];
  categories: string[] = [];
  topics: string[] = [];

  constructor(private fb: FormBuilder, private inputService: InputService) {
  }

  ngOnInit() {
    this.inputService.getTopics().subscribe(
      value=> {
        this.patents = value;
        this.setDomain();
        this.paForm.controls['domain'].valueChanges.subscribe(
          next => {
            console.log(next);
            this.setCategory(next);
            this.paForm.controls['category'].enable();
            this.paForm.controls['topics'].disable();
          }
        );
        this.paForm.controls['category'].valueChanges.subscribe(
          next => {
            console.log(next);
            this.setTopics(next);
            this.paForm.controls['topics'].enable();
          }
        );
      },
      error => {console.error(error)}
    );

    this.inputService.getCountries().subscribe(
      res => {
        this.countries = res;
        // console.log(this.countries);
        for (let continent in this.countries) {
          // console.log(this.countries[continent])
          for (let country in this.countries[continent]) {
            // console.log(this.countries[continent][country]);
            this.countries[continent][country].continent = continent;
            this.countriesFlat.push(this.countries[continent][country]);
          }
        }
        console.log(this.countriesFlat);
        this.countriesFlat = [...this.countriesFlat]
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
    this.categories = [];
    this.paForm.controls['category'].reset(null);
    for (let domainKey in this.patents[domain]) {
      this.categories.push(domainKey);
    }
    this.categories = [...this.categories];
  }

  setTopics(category: string) {
    this.topics = [];
    this.paForm.controls['topics'].reset(null);
    for (let topicKey in this.patents[this.paForm.controls['domain'].value][category]) {
      this.patents[this.paForm.controls['domain'].value][category][topicKey].label =  topicKey;
      this.topics.push(this.patents[this.paForm.controls['domain'].value][category][topicKey]);
    }
    this.topics = [...this.topics];
    console.log(this.topics);
  }

}
