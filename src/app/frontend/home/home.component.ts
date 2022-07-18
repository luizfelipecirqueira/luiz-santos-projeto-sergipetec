import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ContribuinteDialogComponent } from 'src/app/frontend/shared/contribuinte-dialog/contribuinte-dialog.component';
import { ContribuinteElement } from 'src/app/backend/models/ContribuinteElement';
import { ContribuinteElementService } from 'src/app/backend/services/contribuinte-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ContribuinteElementService],
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'telefone', 'celular', 'enderecos', "actions"];
  dataSource!: ContribuinteElement[];

  constructor(public dialog: MatDialog,
    public ContribuinteElementService: ContribuinteElementService
    ) {
      this.ContribuinteElementService.getElements().subscribe((data: ContribuinteElement[]) => {
        this.dataSource = data;
      });
    }

    

  ngOnInit(){

  }

  openDialog(element: ContribuinteElement | null): void{
    const dialogRef = this.dialog.open(ContribuinteDialogComponent, {
      width: '250px',
      data: element === null ? {
        nome: '',
        email: '',
        cpf: null,
        telefone: null,
        celular: null,
        enderecos: [
          { rua: '' },
          { numero: null },
          { bairro: '' },
          { cidade: '' },
          { cep: null },
          { estado: '' },
          { pais: '' },
        ]
      } : {
        id: element.id,
        nome: element.nome,
        email: element.email,
        cpf: element.cpf,
        telefone: element.telefone,
        celular: element.celular,
        enderecos: [
          { rua: element.enderecos[0].rua },
          { numero: element.enderecos[1].numero },
          { bairro: element.enderecos[2].bairro },
          { cidade: element.enderecos[3].cidade },
          { cep: element.enderecos[4].cep },
          { estado: element.enderecos[5].estado },
          { pais: element.enderecos[6].pais },
        ]
        } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.ContribuinteElementService.editContribuinte(result).subscribe((data: ContribuinteElement) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
          })
        }
        else{
          this.ContribuinteElementService.createContribuinte(result).subscribe((data: ContribuinteElement) => {
            this.dataSource.push(data);
            this.table.renderRows();
          })
        }
      }
    });
  }

  deleteContribuinte(id: number): void{
    this.ContribuinteElementService.deleteContribuinte(id).subscribe(() => {})
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }

  editContribuinte(element: ContribuinteElement): void{
    this.openDialog(element);
  }

}
