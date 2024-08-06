// movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDataService } from '../movie-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    user: any = {};
    FavoriteMovies: any[] = [];

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public movieDataService: MovieDataService
    ) { }

    ngOnInit(): void {
        this.getMovies();
        this.getFavMovies();
        this.movieDataService.currentMovies.subscribe(movies => this.movies = movies);
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    getFavMovies(): void {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.FavoriteMovies = this.user.FavoriteMovies || [];
        console.log('Fav Movies:', this.FavoriteMovies);
    }

    isFav(movie: any): boolean {
        return this.FavoriteMovies.includes(movie._id);
    }

    toggleFav(movie: any): void {
        this.isFav(movie) ? this.deleteFavMovies(movie) : this.addFavMovies(movie);
    }

    addFavMovies(movie: any): void {
        this.fetchApiData.addFavouriteMovies(movie).subscribe((result) => {
            localStorage.setItem('user', JSON.stringify(result));
            this.getFavMovies();
            this.snackBar.open('Movie has been added to your favorites!', 'OK', {
                duration: 3000,
            });
        });
    }

    deleteFavMovies(movie: any): void {
        this.fetchApiData.deleteFavouriteMovies(movie).subscribe((result) => {
            localStorage.setItem('user', JSON.stringify(result));
            this.getFavMovies();
            this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
                duration: 3000,
            });
        });
    }

    openSynopsisDialog(description: string): void {
        this.dialog.open(MovieSynopsisComponent, {
            data: {
                Description: description,
            },
            width: '450px',
        });
    }

    openGenreDialog(name: string, description: string): void {
        this.dialog.open(GenreInfoComponent, {
            data: {
                Name: name,
                Description: description,
            },
            width: '450px',
        });
    }

    openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
        this.dialog.open(DirectorInfoComponent, {
            data: {
                Name: name,
                Bio: bio,
                Birth: birth,
                Death: death
            },
            width: '450px',
        });
    }
}
