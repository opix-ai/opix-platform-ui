import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export class PatentClassifications {
  dataSource: string = null;
  domain: string = null;
  category: string = null;
  from: string = null;
  to: string = null;
  topics: string[] = [];
  countries: string[] = [];
  indicators: string = null;

  public static toFormGroup(fb: FormBuilder) {
    const formPrepare: FormGroup = fb.group(new PatentClassifications());
    formPrepare.setControl('dataSource', fb.control('EPO', Validators.required));
    // formPrepare.controls['dataSource'].disable();
    formPrepare.setControl('domain', fb.control(null, Validators.required));
    formPrepare.setControl('category', fb.control(null, Validators.required));
    formPrepare.controls['category'].disable();
    formPrepare.setControl('topics', fb.control([], Validators.required));
    formPrepare.controls['topics'].disable();
    formPrepare.setControl('countries', fb.control([]));
    formPrepare.controls['countries'].setValue(["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GR",
      "DE", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SI", "SK", "ES", "SE"]);
    formPrepare.setControl('indicators', fb.control([], Validators.required));
    formPrepare.controls['to'].setValue('2022');
    formPrepare.controls['from'].setValue('2021');

    return formPrepare;
  }
}

export class Bibliometrics {
  dataSource: string = null;
  domain: string = null;
  category: string = null;
  from: string = null;
  to: string = null;
  topics: string[] = [];
  countries: string[] = [];
  accessRights: string[] = [];
  publicationTypes: string[] = [];
  additionalOptions: string[] = [];
  indicators: string = null;

  public static toFormGroup(fb: FormBuilder) {
    const formPrepare: FormGroup = fb.group(new Bibliometrics());
    formPrepare.setControl('dataSource', fb.control('OpenAIRE Graph', Validators.required));
    formPrepare.setControl('domain', fb.control(null, Validators.required));
    formPrepare.setControl('category', fb.control(null, Validators.required));
    formPrepare.controls['category'].disable();
    formPrepare.setControl('topics', fb.control([], Validators.required));
    formPrepare.controls['topics'].disable();
    formPrepare.setControl('countries', fb.control([]));
    formPrepare.controls['countries'].setValue(["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GR",
      "DE", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SI", "SK", "ES", "SE"]);
    formPrepare.setControl('indicators', fb.control([], Validators.required));
    formPrepare.controls['to'].setValue('2022');
    formPrepare.controls['from'].setValue('2021');

    return formPrepare;
  }

}

export class PatentNames {
  dataSource: string = null;
  file: string;
  from: string;
  to: string;
  indicators: string[];
  metadata: string[];

  constructor() {
    this.dataSource = 'EPO';
    this.file = null;
    this.from = '2021';
    this.to = '2022';
    this.indicators = [];
    this.metadata = [];
  }

}

export class Indicator {
  id: string;
  ui_label: string;
  graph_description: string;
  graph_subtitle: string;
  graph_title: string;
}
