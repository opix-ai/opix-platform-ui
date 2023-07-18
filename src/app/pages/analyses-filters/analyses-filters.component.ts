import {Component, Input, OnInit} from "@angular/core";
import {Indicator} from "../../domain/patentClassifications";
import {InputService} from "../../services/input.service";

@Component({
  selector: 'app-analyses-filters',
  templateUrl: './analyses-filters.component.html'
})

export class AnalysesFiltersComponent implements OnInit {

  @Input('filters') filters;
  @Input('workflowType') workflowType;

  patentNamesIndicatorsMap: Map<string, Indicator> = new Map();
  patentClassificationIndicatorsMap: Map<string, Indicator> = new Map();
  bibliometricsIndicatorsMap: Map<string, Indicator> = new Map();

  constructor(private inputService: InputService) {
  }

  ngOnInit(): void {
    this.getPatentNamesIndicators();
    this.getPatentClassificationIndicators();
    this.getBibliometricsIndicators();
  }

  getPatentNamesIndicators() {
    this.inputService.getIndicators('Patents-Names').subscribe(
      res=> {
        let indicators = [...res];

        for(let indicator of indicators) {
          this.patentNamesIndicatorsMap.set(indicator.id, indicator);
        }
      }
    );
  }

  getPatentClassificationIndicators() {
    this.inputService.getIndicators('Patents-Topics').subscribe(
      res=> {
        let indicators = [...res];

        for(let indicator of indicators) {
          this.patentClassificationIndicatorsMap.set(indicator.id, indicator);
        }
      }
    );
  }

  getBibliometricsIndicators() {
    this.inputService.getIndicators('Bibliometrics').subscribe(
      res=> {
        let indicators = [...res];

        for(let indicator of indicators) {
          this.bibliometricsIndicatorsMap.set(indicator.id, indicator);
        }
      }
    );
  }
}
