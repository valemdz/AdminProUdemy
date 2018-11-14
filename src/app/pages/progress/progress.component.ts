import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1: number = 20;
  progress2: number = 50;

  constructor() { }

  ngOnInit() {
  }

  actProgress1( progress ) {
    this.progress1 = progress;
  }

  actProgress2( progress ) {
    this.progress2 = progress;
  }

}
