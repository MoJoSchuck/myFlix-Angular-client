// movie-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovieDataService {
    private moviesSource = new BehaviorSubject<any[]>([]);
    currentMovies = this.moviesSource.asObservable();

    constructor() { }

    changeMovies(movies: any[]) {
        this.moviesSource.next(movies);
    }
}
