import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResourcePermission, Survey, SurveyAnswer, SurveyInfo} from "../domain/survey";
import {Paging} from "../catalogue-ui/domain/paging";
import {URLParameter} from "../catalogue-ui/domain/url-parameter";

@Injectable()
export class SurveyService {

  options = {withCredentials: true};
  base = environment.API_ENDPOINT;

  constructor(public http: HttpClient) {}

  getLatestAnswer(stakeHolderId: string, surveyId: string) {
    return this.http.get<SurveyAnswer>(this.base + `/answers/latest?stakeholderId=${stakeHolderId}&surveyId=${surveyId}`, this.options);
  }

  changeAnswerValidStatus(answerId: string, valid: boolean) {
    return this.http.patch<SurveyAnswer>(this.base + `/answers/${answerId}/validation?validated=${valid}`, null, this.options);
  }

  getSurveys(id: string) {
    return this.http.get<Paging<Survey>>(this.base + `/surveys?stakeholderId=${id}`);
  }

  getSurvey(surveyId: string) {
    return this.http.get<Survey>(this.base + `/surveys/${surveyId}`);
  }

  getPermissions(resourceIds: string[]) {
    return this.http.get<ResourcePermission[]>(this.base + `/permissions?resourceIds=${resourceIds}`);
  }

  getAnswerValues(answerId: string) {
    return this.http.get<Object>(this.base + `/answers/${answerId}/answer`, this.options);
  }


  getInvitationToken(inviteeEmail: string, inviteeRole: string, stakeholder: string) {
    return this.http.get(this.base + `/invitation?inviteeEmail=${inviteeEmail}&inviteeRole=${inviteeRole}&stakeholder=${stakeholder}`, { responseType: 'text'});
  }

  acceptInvitation(token: string) {
    return this.http.get(this.base + `/invitation/accept?invitationToken=${token}`);
  }


  getSurveyEntries(urlParameters: URLParameter[]) {
    let searchQuery = new HttpParams();
    for (const urlParameter of urlParameters) {
      for (const value of urlParameter.values) {
        searchQuery = searchQuery.append(urlParameter.key, value);
      }
    }
    searchQuery.delete('to');

    if(searchQuery.toString()=='')
      return this.http.get<Paging<SurveyInfo>>(this.base + `/coordinators/surveys`);
    else
      return this.http.get<Paging<SurveyInfo>>(this.base + `/coordinators/surveys${'?' + searchQuery.toString()}`);
  }

}
