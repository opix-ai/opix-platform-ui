import {AfterContentChecked, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Patent} from "../../../domain/patentAnalytics";
import {InputService} from "../../../services/input.service";
import {environment} from "../../../../environments/environment";

declare var UIkit: any;

@Component({
  selector: 'patent-with-file-upload',
  templateUrl: 'patent-form.component.html'
})

export class PatentFormComponent implements OnInit, AfterContentChecked {

  logoURL = environment.logoURL ? environment.logoURL : 'https://www.opix.ai/images/Logos/opix%20logo%202.svg';

  patentInputs: Patent = new Patent();
  file: File = null;
  yearRange: number[] = [];
  indicators: any[] = [];
  submitSuccess: boolean = false;

  headerHeight = 0;

  constructor(private router: Router, private inputService: InputService) {
  }

  ngOnInit() {
    this.getIndicators();
    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
    UIkit.modal('#modal-input').show();
  }

  ngAfterContentChecked() {
    this.headerHeight = document.getElementById('modal-header').offsetHeight;
  }

  submitJob() {
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
    // if (event.target.checked)
    //   this.paForm.controls['indicators'].value.push(event.target.value);
    // else {
    //   const index = this.paForm.controls['indicators'].value.indexOf(event.target.value);
    //   if (index > -1) {
    //     this.paForm.controls['indicators'].value.splice(index, 1);
    //   }
    // }
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

  showChecked(name: string, value: string) {
    // return this.paForm.controls[name].value.includes(value);
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
    // if (step === 0) {
    //   if (this.paForm.controls['dataSource'].value)
    //     return true;
    // }
    // if (step === 1) {
    //   if (this.paForm.controls['domain'].valid && this.paForm.controls['category'].valid
    //     && this.paForm.controls['topics'].value.length > 0)
    //     return true
    // }
    // if (step === 2) {
    //   if (this.paForm.controls['from'].value)
    //     return true;
    // }
    // if (step === 3) {
    //   if (this.paForm.controls['indicators'].value.length > 0)
    //     return true;
    // }
    //
    return false;
  }

  continue(index: number) {
    UIkit.switcher('#tabs').show(index);
  }

  protected readonly parent = parent;
}
