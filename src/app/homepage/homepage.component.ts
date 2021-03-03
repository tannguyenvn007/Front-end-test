import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { PokeService } from '../service/poke.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pokes: any[] = [];
  constructor(
    private pokeService: PokeService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokeService.getPokemons().subscribe((poke: any) => {
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

  navigateToHeroPage() {
    this.router.navigateByUrl('/poke-list');
 }
}
