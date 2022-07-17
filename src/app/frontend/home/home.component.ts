import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/frontend/shared/element-dialog/element-dialog.component';
import { PeriodicElement } from 'src/app/backend/models/PeriodicElement';
import { PeriodicElemenntService } from 'src/app/backend/services/periodic-element.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PeriodicElemenntService],
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'telefone', 'celular', 'enderecos', "actions"];
  dataSource!: PeriodicElement[];

  constructor(public dialog: MatDialog,
    public periodicElementService: PeriodicElemenntService
    ) {
      this.periodicElementService.getElements().subscribe((data: PeriodicElement[]) => {
        this.dataSource = data;
      });
    }

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        nome: '',
        email: '',
        cpf: null,
        telefone: null,
        celular: null,
        enderecos: '',
      } : {
        id: element.id,
        nome: element.nome,
        email: element.email,
        cpf: element.cpf,
        telefone: element.telefone,
        celular: element.celular,
        enderecos: element.enderecos,
        } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.periodicElementService.editElement(result).subscribe((data: PeriodicElement) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
          })
        }
        else{
          this.periodicElementService.createElements(result).subscribe((data: PeriodicElement) => {
            this.dataSource.push(data);
            this.table.renderRows();
          })
        }
      }
    });
  }

  deleteElement(id: number): void{
    this.periodicElementService.deleteElement(id).subscribe(() => {})
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }

  editElement(element: PeriodicElement): void{
    this.openDialog(element);
  }

}
