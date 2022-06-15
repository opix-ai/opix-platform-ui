import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Ticket, TicketComment} from "../entities/ticket";

@Injectable()
export class RequestsService {
  base = environment.REQUESTS_ENDPOINT;

  constructor(public http: HttpClient) {}

  getAllRequests() {
    return this.http.get<Ticket[]>(this.base + '/tickets');
  }

  getRequestById(requestId: string) {
    return this.http.get<Ticket>(this.base + `/tickets/${requestId}`);
  }

  createRequest(ticket: Ticket) {
    return this.http.post<Ticket>(this.base + '/tickets', ticket);
  }

  editRequest(requestId: string, ticket: Ticket) {
    return this.http.put<Ticket>(this.base + `/tickets/${requestId}`, ticket);
  }

  postComment(ticketId: string, comment: TicketComment) {
    return this.http.post<Ticket>(this.base + `/tickets/${ticketId}/comments`, comment);
  }
}
