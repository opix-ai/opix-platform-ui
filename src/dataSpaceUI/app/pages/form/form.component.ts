import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CatalogueService} from "../../services/catalogue.service";
import {Subscriber, zip} from "rxjs";
import {SurveyAnswer} from "../../domain/survey";
import {FormControlService} from "../../../catalogue-ui/services/form-control.service";
import {Model} from "../../../catalogue-ui/domain/dynamic-form-model";
import {FormGroup} from "@angular/forms";
import {SurveyComponent} from "../../../catalogue-ui/pages/dynamic-form/survey.component";


@Component({
  selector: 'pages-form',
  templateUrl: 'form.component.html',
  providers: [FormControlService]
})

export class FormComponent implements OnInit, OnDestroy {

  @ViewChild(SurveyComponent) child: SurveyComponent;

  subscriptions = [];
  tabsHeader: string = null;
  mandatoryFieldsText: string = 'Fields with (*) are mandatory.';
  // mandatoryFieldsText: string = 'Fields with (*) are mandatory and must be completed in order for the survey to be validated.';
  surveyAnswers: SurveyAnswer = null
  vocabulariesMap: Map<string, object[]> = null
  resourceType: string;
  model: Model = null;
  downloadPDF: boolean = false;
  ready = false;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogueService: CatalogueService,
              private formService: FormControlService) {
  }

  ngOnInit() {
    this.ready = false;
    // this.resourceType = this.activatedRoute.snapshot.params['resourceTypeModel'];
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(
        params => {
          this.resourceType = params['resourceTypeModel'];
          this.subscriptions.push(
            zip(
              this.formService.getFormModelByType(this.resourceType),
              this.formService.getUiVocabularies()).subscribe(
              res => {
                this.model = res[0].results[0];
                this.vocabulariesMap = res[1]
              },
              error => {console.log(error)},
              () => {this.ready = true}
            )
          );
        }
      )
    );
  }

  submitForm(form: FormGroup) {
    this.child.onSubmit();
    if (form.valid) {
    } else {
      form.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

}
