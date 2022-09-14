import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Paging} from "../../catalogue-ui/domain/paging";

@Injectable()
export class ResourcePayloadService {
  base = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getItemsByResourceType(resourceType: string, datasetId?: string) {
    if (datasetId)
      return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}&datasets=${datasetId}`);

    return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}`);
  }

  getItem(resourceType: string, identifierValue: string) {
    return this.http.get(this.base + `/items/search?resourceType=${resourceType}&field=identifier&value=${identifierValue}`)
  }

}
