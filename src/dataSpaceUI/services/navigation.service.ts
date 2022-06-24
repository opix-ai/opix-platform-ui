import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NavigationService {

    public dataRequestIds: BehaviorSubject<{instanceVersion:string, datasetId:string}> = new BehaviorSubject<{instanceVersion:string, datasetId:string}>(null);

    constructor() {
    }

    go(url: string) {
      location.href = url;
    }

    goOffsite(url: string) {
        window.location.href = url;
    }

    public setDataRequestIds(instanceVersion: string, datasetId: string) {
      this.dataRequestIds.next({instanceVersion:instanceVersion, datasetId:datasetId});
    }

    public get dataRequestIds$() {
      // console.log('get dataRequestIdsObservable', this.dataRequestIds);
      return this.dataRequestIds.asObservable();
    }

}
