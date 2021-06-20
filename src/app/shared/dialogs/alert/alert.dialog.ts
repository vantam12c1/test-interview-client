import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.dialog.html',
  styleUrls: ['./alert.dialog.scss']
})
export class AlertDialog implements OnInit {

  // data should = {title: string, content: Array, isError: boolean}
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
