import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  url: string = '';
  constructor( private http: HttpClient ) {
    this.url = 'https://pokeapi.co/api/v2/';
  }

  getPokemons() {
    return this.http.get(`${this.url}pokemon?limit=10`);
  }

  getPokemonDetail(name: string) {
    return this.http.get(`${this.url}pokemon/${name}`)
  }

  getPokemonsList(limit: number, offset: number) {
    return this.http.get(`${this.url}pokemon?limit=${limit}&offset=${offset}`);
  }
}
