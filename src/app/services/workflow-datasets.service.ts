import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Paging} from "../../dataSpaceUI/catalogue-ui/domain/paging";
import {Dataset} from "../domain/dataset";

@Injectable()
export class WorkflowDatasetsService {
  api: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getDataset(id: string) {
    return this.http.get(this.api + `/workflow-datasets/${id}`);
  }

  getDatasets() {
    return this.http.get<Paging<Dataset>>(this.api + `/workflow-datasets/`);
  }

  uploadDataset(formData: FormData) {
    return this.http.post(this.api + `/workflow-datasets`, formData);
  }

}
