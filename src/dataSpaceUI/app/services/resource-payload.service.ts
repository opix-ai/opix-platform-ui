import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Paging} from "../../catalogue-ui/domain/paging";
import {Params} from "@angular/router";

@Injectable()
export class ResourcePayloadService {
  base = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getItemsByResourceType(resourceType: string, datasetId?: string) {
    if (datasetId)
      return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}&datasets=${datasetId}`);

    return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}`);
  }

  getItemsWithQueryParams(resourceType: string, queryParameters?: Params) {
    let params = new HttpParams();
    if (!queryParameters)
      return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}`);

    for (const [key, value] of Object.entries(queryParameters)) {
      params = params.append(key, value);
    }
    return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}`, {params: params});
  }

  getItem(resourceType: string, identifierValue: string) {
    return this.http.get(this.base + `/items/search?resourceType=${resourceType}&field=identifier&value=${identifierValue}`);
  }

  getItemById(resourceType: string, id: string) {
    return this.http.get(this.base + `/items/${id}?resourceType=${resourceType}`);
  }

  deleteItem(id: string, resourceType: string) {
    return this.http.delete(this.base + `/items/${id}?resourceType=${resourceType}`);
  }

}
