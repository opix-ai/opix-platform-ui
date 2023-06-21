import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

declare var UIkit: any;

@Component({
  selector: 'app-success-page',
  templateUrl: 'successPage.component.html'
})

export class SuccessPageComponent {
  display: number = null;
  timerInterval: any;

  constructor(private router: Router) {

  }

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.display = seconds;
    this.timerInterval = setInterval(() => {
      seconds--;
      // if (statSec != 0) statSec--;
      // else statSec = 59;
      //
      // if (statSec < 10) {
      //   textSec = '0' + statSec;
      // } else textSec = statSec;

      // this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      this.display = seconds;

      if (seconds == -1) {
        // console.log('finished');
        clearInterval(this.timerInterval);
        UIkit.modal('#modal-success').hide();
        this.router.navigate(['/workflowSearch']);
      }
    }, 1000);
  }
}
