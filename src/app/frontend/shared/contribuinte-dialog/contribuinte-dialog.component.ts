import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ContribuinteElement } from 'src/app/backend/models/ContribuinteElement';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './contribuinte-dialog.component.html',
  styleUrls: ['./contribuinte-dialog.component.scss']
})
export class ContribuinteDialogComponent implements OnInit {
  element!:ContribuinteElement;
  isChange!: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ContribuinteElement,
    public dialogRef: MatDialogRef<ContribuinteDialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true;
    } else{
      this.isChange = false;
    }
  }

}
