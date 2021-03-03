import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { PokeService } from '../service/poke.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
  pokes: any[] = [];
  page = 1;
  totalPokes: number = 0;
  paginateConfig: any;
  searchText: any;
  selectedOption: number = 20;

  displays: any[] = [
    10, 20, 50, 100
  ];

  constructor(
    private pokeService: PokeService,
    public dialog: MatDialog
  ) {
    this.paginateConfig = {
      itemsPerPage: 20,
      currentPage: this.page,
      totalItems: this.totalPokes
    };
   }

  

  ngOnInit(): void {
    this.getPokes();
    
  }

  getPokes = () => {
    this.pokeService.getPokemonsList(this.paginateConfig.itemsPerPage, this.paginateConfig.currentPage).subscribe((poke: any) => {
      this.paginateConfig.totalItems = poke.count;
      poke.results.forEach((result: any) => {
        this.pokeService.getPokemonDetail(result.name).subscribe((pokeDetail: any) =>{
          this.pokes.push(pokeDetail);
        })
      });
      
    })
  }


  getPokeDetail = (poke: any ) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = poke;
    dialogConfig.width = "30%";

    this.dialog.open(DetailDialogComponent, dialogConfig);
  }

  pageChanged = (event: any) => {
    this.paginateConfig.currentPage = event;
    this.pokes = [];
    this.getPokes();
  }

  selected = () => {
    console.log("value", this.selectedOption)
    this.paginateConfig.itemsPerPage = this.selectedOption;
    this.pokes = [];
    this.getPokes();
  }
}
