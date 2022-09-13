import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CatalogueService} from "../../services/catalogue.service";
import {Survey, SurveyAnswer} from "../../domain/survey";
import {Subscriber} from "rxjs";
import {FormControlService} from "../../../catalogue-ui/services/form-control.service";
import {Model} from "../../../catalogue-ui/domain/dynamic-form-model";


@Component({
  selector: 'pages-form',
  templateUrl: 'form.component.html',
  providers: [FormControlService]
})

export class FormComponent implements OnInit, OnDestroy {

  subscriptions = [];
  tabsHeader: string = null;
  survey: Model = null;
  surveyAnswers: SurveyAnswer = null
  datasetType: string;
  model: Model = null;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogueService: CatalogueService,
              private formService: FormControlService) {
  }

  ngOnInit() {
    // this.datasetType = this.activatedRoute.snapshot.params['resourceTypeModel'];
    // this.subscriptions.push(
    //   this.formService.getFormModelByType(this.datasetType).subscribe(
    //     res => {
    //       this.model = res.results[0];
    //     },
    //     error => {console.log(error)}
    //   )
    // );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

}
