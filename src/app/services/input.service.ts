import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BrowseJob} from "../../dataSpaceUI/app/domain/job";

@Injectable()
export class InputService {
  base: string = environment.INPUT_ENDPOINT;
  api: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getTopics() {
    return this.http.get(this.base + '/topics?service=Patents');
  }

  getIndicators() {
    return this.http.get(this.base + '/indicators?service=Patents');
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

  getPublicationType() {
    return this.http.get(this.base + '/publication_type?service=Bibliometrics');
  }

  getJobs() {
    return this.http.post<BrowseJob[]>(this.api + '/jobs', {})
  }
}
