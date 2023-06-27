import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Patent} from "../../../domain/patentAnalytics";
import {InputService} from "../../../services/input.service";

declare var UIkit: any;

@Component({
  selector: 'patent-with-file-upload',
  templateUrl: 'patent-form.component.html'
})

export class PatentFormComponent implements OnInit {

  patentInputs: Patent = new Patent();
  file: File = null;
  yearRange: number[] = [];
  analysis: any[] = [];
  submitSuccess: boolean = false;

  constructor(private router: Router, private inputService: InputService) {
  }

  ngOnInit() {
    this.getIndicators();
    for (let i = 2000; i < new Date().getFullYear(); i++) {
      this.yearRange.push(i);
    }
    UIkit.modal('#modal-input').show();
  }

  getIndicators() {
    this.inputService.getIndicators('Patents').subscribe(
      res=> {
        for (let key in res) {
          this.analysis.push({label: key, id: res[key]});
        }
        // console.log(this.indicators);
        this.analysis = [...this.analysis];
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

  selectAllAnalysis(event) {
    if (!event.target.checked) {
      this.patentInputs.analysis = [];
      return;
    }
    if (event.target.checked) {
      let tmpIndicators: string[] = [];
      this.analysis.forEach(indicator => {
        tmpIndicators.push(indicator.id);
      });
      this.patentInputs.analysis = tmpIndicators;
    }
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

  protected readonly parent = parent;
}
