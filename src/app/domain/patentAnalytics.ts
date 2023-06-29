import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export class PatentAnalytics {
  dataSource: string = null;
  domain: string = null;
  category: string = null;
  from: string = null;
  to: string = null;
  topics: string[] = [];
  countries: string[] = [];
  indicators: string = null;

  public static toFormGroup(fb: FormBuilder) {
    const formPrepare: FormGroup = fb.group(new PatentAnalytics());
    formPrepare.setControl('dataSource', fb.control('EPO', Validators.required));
    // formPrepare.controls['dataSource'].disable();
    formPrepare.setControl('domain', fb.control(null, Validators.required));
    formPrepare.setControl('category', fb.control(null, Validators.required));
    formPrepare.controls['category'].disable();
    formPrepare.setControl('topics', fb.control([], Validators.required));
    formPrepare.controls['topics'].disable();
    formPrepare.setControl('countries', fb.control([]));
    formPrepare.controls['countries'].setValue(["AD", "AL", "AM", "AT", "AZ", "BA", "BE", "BG", "BY", "CH", "CY",
      "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GE", "GG", "GI", "GL", "GR", "HR", "HU", "IE", "IM", "IS",
      "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI",
      "SK", "SM", "UA", "VA"]);
    formPrepare.setControl('indicators', fb.control([], Validators.required));
    formPrepare.controls['to'].setValue('2022');

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
  publicationType: string = null;
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
    // formPrepare.controls['countries'].setValue(['Europe']);
    formPrepare.setControl('indicators', fb.control([], Validators.required));
    formPrepare.controls['to'].setValue('2022');

    return formPrepare;
  }

}

export class Patent {
  file: string;
  from: string;
  to: string;
  indicators: string[];
  metadata: string[];

  constructor() {
    this.file = null;
    this.from = null;
    this.to = null;
    this.indicators = [];
    this.metadata = [];
  }
}
