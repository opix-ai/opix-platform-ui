import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class InputService {
  base: string = environment.INPUT_ENDPOINT;

  constructor(private http: HttpClient) {}

  getTopics() {
    return this.http.get(this.base + '/topics?service=Patents');
  }

  getCountries() {
    return this.http.get(this.base + '/countries');
  }
}
