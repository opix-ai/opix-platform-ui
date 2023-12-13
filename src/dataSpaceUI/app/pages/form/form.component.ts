import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../../services/catalogue.service";
import {Subscriber, zip} from "rxjs";
import {FormControlService} from "../../../catalogue-ui/services/form-control.service";
import {Model} from "../../../catalogue-ui/domain/dynamic-form-model";
import {SurveyComponent} from "../../../catalogue-ui/pages/dynamic-form/survey.component";
import {ResourcePayloadService} from "../../services/resource-payload.service";


@Component({
  selector: 'pages-form',
  templateUrl: 'form.component.html',
  providers: [FormControlService, ResourcePayloadService]
})

export class FormComponent implements OnInit, OnDestroy {

  @ViewChild(SurveyComponent) child: SurveyComponent;

  subscriptions = [];
  tabsHeader: string = null;
  mandatoryFieldsText: string = 'Fields with (*) are mandatory.';
  payload: {answer: object} = null
  vocabulariesMap: Map<string, object[]> = null
  resourceType: string;
  resourceId: string;
  model: Model = null;
  subType: string = null;
  downloadPDF: boolean = false;
  ready = false;
  successMessage = null;
  errorMessage = null;

  constructor(private activatedRoute: ActivatedRoute, private catalogueService: CatalogueService,
              private formService: FormControlService, private payloadService: ResourcePayloadService,
              private router: Router) {
  }

  ngOnInit() {
    this.ready = false;
    // this.resourceType = this.activatedRoute.snapshot.params['resourceTypeModel'];
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(
        params => {
          this.resourceType = params['resourceTypeModel'];
          if (params['id']) {
            this.resourceId = params['id'];
            this.getResourceForEdit();
          } else {
            this.subscriptions.push(
              zip(
                this.formService.getFormModelByResourceType(this.resourceType),
                this.catalogueService.getUiVocabularies()).subscribe(
                res => {
                  this.model = res[0].results[0];
                  this.vocabulariesMap = res[1]
                },
                error => {console.log(error)},
                () => {this.ready = true}
              )
            );
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

  submitForm(value) {
    // this.child.onSubmit();
    // console.log(value);
    if (value[0].invalid) {
      value[0].markAllAsTouched();
    }
    if (value[1]) {
      this.formService.putGenericItem(this.resourceId, this.resourceType, value[0].value).subscribe(
        res => {
          this.successMessage = 'Updated successfully!';
          this.payload.answer['Intelcomp tool'] = res;
        },
        error => {
          this.errorMessage = 'Something went bad, server responded: ' + JSON.stringify(error?.error?.message);
        },
        () => {
          this.child.closeSuccessAlert();
          // this.showLoader = false;
        }
      );
    } else {
      this.formService.postGenericItem(value[2], value[0].value).subscribe(
        res => {
          this.successMessage = 'Created successfully!';
          this.payload = {answer: {'Intelcomp tool' : null}};
          this.payload.answer['Intelcomp tool'] = res;
        },
        error => {
          this.errorMessage = 'Something went bad, server responded: ' + JSON.stringify(error?.error?.message);
        },
        () => {
          this.router.navigate([`/form/${this.resourceType}/${this.payload.answer['Intelcomp tool'].id}`]);
          this.child.closeSuccessAlert();
          // this.showLoader = false;
        }
      );
    }

  }

  getResourceForEdit() {
    this.subscriptions.push(
      zip(
        this.formService.getFormModelByResourceType(this.resourceType),
        this.catalogueService.getUiVocabularies(),
        this.payloadService.getItemById(this.resourceType, this.resourceId)).subscribe(
        res => {
          this.model = res[0].results[0];
          this.vocabulariesMap = res[1];
          // let name = this.model.name
          this.payload = {answer: {}};
          this.payload.answer[this.model.name] = res[2];
        },
        error => {console.log(error)},
        () => {this.ready = true}
      )
    );
  }

}
