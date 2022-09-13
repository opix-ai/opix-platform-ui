import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SurveyAnswer} from "../domain/survey";
import {BrowseJob, Job} from "../domain/job";
import {Paging} from "../../catalogue-ui/domain/paging";

@Injectable()
export class CatalogueService {

  private options = {withCredentials: true};
  base = environment.API_ENDPOINT;

  constructor(public http: HttpClient) {
  }

  getResourceTypeById(id: string, resourceType: string) {
    // console.log('knocking on:', this.base + `/items/${id}?resourceType=${resourceType}`);
    return this.http.get(this.base + `/items/${id}?resourceType=${resourceType}`);
  }

  searchDatasetInstance(resourceType: string, datasetName: string, version?: string) {
    let params = new HttpParams();
    params = params.append('resourceType', resourceType);
    params = params.append('type', datasetName);
    if (version) {
      params = params.append('version', version);
    }

    return this.http.get<Paging<any>>(this.base + '/items', {params});
  }

  getDatasetAnswer(id: string) {
    return this.http.get<SurveyAnswer>(this.base + `/datasets/${id}`);
  }

  getJobs() {
    return this.http.post<BrowseJob[]>(this.base + '/jobs', {})
  }

  addJob(job: Job) {
    return this.http.post(this.base + '/jobs/execute', job) ;
  }

  getInternalId(type: string, version: string) {
    return this.http.get(this.base + `/datasets/instances/${type}/${version}/internalid`, { responseType: 'text'});
  }

}
