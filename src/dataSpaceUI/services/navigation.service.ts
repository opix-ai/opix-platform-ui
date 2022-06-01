import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NavigationService {

    public dataRequestIds: BehaviorSubject<{instanceId:string, datasetId:string}> = new BehaviorSubject<{instanceId:string, datasetId:string}>(null);

    constructor() {
    }

    go(url: string) {
      location.href = url;
    }

    goOffsite(url: string) {
        window.location.href = url;
    }

    public setDataRequestIds(instanceId: string, datasetId: string) {
      this.dataRequestIds.next({instanceId:instanceId, datasetId:datasetId});
    }

    public get dataRequestIds$() {
      // console.log('get dataRequestIdsObservable', this.dataRequestIds);
      return this.dataRequestIds.asObservable();
    }

}
