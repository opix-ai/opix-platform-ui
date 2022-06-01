import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SurveyAnswer} from "../domain/survey";
import {BrowseJob, Job} from "../domain/job";

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

  getDatasetAnswer(id: string) {
    return this.http.get<SurveyAnswer>(this.base + `/datasets/${id}`);
  }

  getJobs() {
    return this.http.post<BrowseJob[]>(this.base + '/jobs', {})
  }

  addJob(job: Job) {
    return this.http.post(this.base + '/jobs/execute', job) ;
  }

  getInternalId(id: string) {
    return this.http.get(this.base + `/datasets/instances/${id}/internalid`, { responseType: 'text'});
  }

}
