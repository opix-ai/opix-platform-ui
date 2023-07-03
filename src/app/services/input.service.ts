import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BrowseJob, Job} from "../../dataSpaceUI/app/domain/job";

@Injectable()
export class InputService {
  base: string = environment.INPUT_ENDPOINT;
  api: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getTopics(service: string) {
    return this.http.get(this.base + `/topics?service=${service}`);
  }

  getIndicators(service: string) {
    return this.http.get(this.base + `/indicators?service=${service}`);
  }

  getMetadata(service: string) {
    return this.http.get(this.base + `/metadata?service=${service}`);
  }

  getCountries() {
    return this.http.get(this.base + '/countries');
  }

  getAccessRights() {
    return this.http.get(this.base + '/access_rights?service=Bibliometrics');
  }

  getAdditionalOptions() {
    return this.http.get(this.base + '/additional_options?service=Bibliometrics');
  }

  getPublicationTypes() {
    return this.http.get(this.base + '/publication_type?service=Bibliometrics');
  }

  getJobs() {
    return this.http.post<BrowseJob[]>(this.api + '/jobs', {})
  }
  getJobById(id: string[]) {
    return this.http.post<BrowseJob[]>(this.api + '/jobs', {ids: id})
  }

  postJob(job: Job) {
    return this.http.post(this.api + '/jobs/execute', job);
  }

  postJobCustom(formData: FormData) {
    // let params = new HttpParams();
    // params.append('job', job);
    // console.log(params);
    return this.http.post(this.api + '/jobs/execute/custom', formData);
  }
}
