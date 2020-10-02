import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../dto/movie';
import {map} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class MovieService {


  constructor(private http: HttpClient, private translate: TranslateService) {

   }

  getMovieData(){
    return this.http.get("../../assets/movies.json");
  }

  private _movieList: Movie[];

  get movieList(): Movie[] {
    return this._movieList;
  }

  fetchPopularMovies(): Observable<any> {
    this._movieList = [];
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`)
      .pipe(map((data: any) => {
      if (data != null) {
        data.results.forEach(element => {
          const movie: Movie = new Movie();
          movie.id = element.id;
          movie.title = element.original_title;
          movie.imdbRating = element.vote_average;
          movie.posterurl = element.poster_path;
          this._movieList.push(movie);
        });
      }
    }));
  }

  fetchUpcomingMovies(): Observable<any> {
    this._movieList = [];
    return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`)
      .pipe(map((data: any) => {
      if (data != null) {
        data.results.forEach(element => {
          const movie: Movie = new Movie();
          movie.id = element.id;
          movie.title = element.original_title;
          movie.imdbRating = element.vote_average;
          movie.posterurl = element.poster_path;
          this._movieList.push(movie);
        });
      }
    }));
  }

  url: string= "https://api.themoviedb.org/3/movie/";
  apiKey: string= "api_key=fed69657ba4cc6e1078d2a6a95f51c8c"
  language: string= "&language="

  getApiMovieDetails(id: number) {
    console.log(this.url + id + "?" + this.apiKey + this.language + this.translate.currentLang.toLowerCase());
    return this.http.get(this.url + id + "?" + this.apiKey + this.language + this.translate.currentLang.toLowerCase());
  }

}
