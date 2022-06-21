import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket, TicketComment} from "../entities/ticket";
import {getCookie} from "../../dataSpaceUI/catalogue-ui/shared/reusable-components/cookie-management";

@Injectable()
export class RequestsService {
  base = environment.REQUESTS_ENDPOINT;
  auth_token = getCookie('AccessToken');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  });
  requestOptions = { headers: this.headers };

  constructor(public http: HttpClient) {}

  getAllRequests() {
    return this.http.get<Ticket[]>(this.base + '/tickets');
  }

  getRequestById(requestId: string) {
    return this.http.get<Ticket>(this.base + `/tickets/${requestId}`);
  }

  createRequest(ticket: Ticket) {
    return this.http.post<Ticket>(this.base + '/tickets', ticket, this.requestOptions);
  }

  editRequest(requestId: string, ticket: Ticket) {
    return this.http.put<Ticket>(this.base + `/tickets/${requestId}`, ticket);
  }

  postComment(ticketId: string, comment: TicketComment) {
    return this.http.post<Ticket>(this.base + `/tickets/${ticketId}/comments`, comment);
  }
}
