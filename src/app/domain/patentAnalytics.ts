import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BibliometricsFormComponent} from "../pages/bibliometrics/inputForm/bibliometrics-form.component";

export class PatentAnalytics {
  dataSource: string = null;
  domain: string = null;
  category: string = null;
  from: number = null;
  to: number = null;
  topics: string[] = [];
  continent: string[] = [];
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
    formPrepare.setControl('continent', fb.control([]));
    formPrepare.setControl('countries', fb.control([]));
    formPrepare.controls['countries'].setValue(['Europe']);
    formPrepare.setControl('indicators', fb.control([], Validators.required));
    formPrepare.controls['to'].setValue(2022);

    return formPrepare;
  }
}

export class Bibliometrics {
  domain: string = null;
  category: string = null;
  from: number = null;
  to: number = null;
  topics: string[] = [];
  continent: string[] = [];
  countries: string[] = [];
  accessRights: string[] = [];
  publicationType: string = null;
  additionalOptions: string[] = [];
  indicators: string = null;

  public static toFormGroup(fb: FormBuilder) {
    const formPrepare: FormGroup = fb.group(new Bibliometrics());

    return formPrepare;
  }

}
