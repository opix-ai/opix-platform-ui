import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class WorkflowDatasetsService {
  api: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getDataset(id: string) {
    return this.http.get(this.api + `/workflow-datasets/${id}`);
  }
}
