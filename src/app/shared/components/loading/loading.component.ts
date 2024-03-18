import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoadingTemplateComponent } from './dialog-loading-template/dialog-loading-template.component';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public dialogRef: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  public openDialog(): void {
    this.dialogRef = this.dialog.open(DialogLoadingTemplateComponent, {
      disableClose: true,
    });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
