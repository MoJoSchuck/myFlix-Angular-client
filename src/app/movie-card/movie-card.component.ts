// movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDataService } from '../movie-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';

/**
 * Component representing a movie card.
 * 
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss'
 */
@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    /**
     * List of movies.
     */
    movies: any[] = [];

    /**
     * User data.
     */
    user: any = {};

    /**
     * List of favorite movies.
     */
    FavoriteMovies: any[] = [];

    /**
     * Creates an instance of MovieCardComponent.
     * 
     * @param fetchApiData - Service for fetching API data.
     * @param snackBar - Service for displaying snack bar notifications.
     * @param dialog - Service for opening dialogs.
     * @param movieDataService - Service for sharing movie data between components.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public movieDataService: MovieDataService
    ) { }

    /**
     * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Initializes the movie list and favorite movies list.
     */
    ngOnInit(): void {
        this.getMovies();
        this.getFavMovies();
        this.movieDataService.currentMovies.subscribe(movies => this.movies = movies);
    }

    /**
     * Fetches the list of all movies.
     */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    /**
     * Fetches the list of favorite movies from local storage.
     */
    getFavMovies(): void {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.FavoriteMovies = this.user.FavoriteMovies || [];
        console.log('Fav Movies:', this.FavoriteMovies);
    }

    /**
     * Checks if a movie is in the user's list of favorite movies.
     * 
     * @param movie - The movie to check.
     * @returns True if the movie is in the favorite movies list, otherwise false.
     */
    isFav(movie: any): boolean {
        return this.FavoriteMovies.includes(movie._id);
    }

    /**
     * Toggles the favorite status of a movie.
     * Adds the movie to favorites if it is not already, otherwise removes it from favorites.
     * 
     * @param movie - The movie to toggle.
     */
    toggleFav(movie: any): void {
        this.isFav(movie) ? this.deleteFavMovies(movie) : this.addFavMovies(movie);
    }

    /**
     * Adds a movie to the user's list of favorite movies.
     * 
     * @param movie - The movie to add to favorites.
     */
    addFavMovies(movie: any): void {
        this.fetchApiData.addFavouriteMovies(movie).subscribe((result) => {
            localStorage.setItem('user', JSON.stringify(result));
            this.getFavMovies();
            this.snackBar.open('Movie has been added to your favorites!', 'OK', {
                duration: 3000,
            });
        });
    }

    /**
     * Removes a movie from the user's list of favorite movies.
     * 
     * @param movie - The movie to remove from favorites.
     */
    deleteFavMovies(movie: any): void {
        this.fetchApiData.deleteFavouriteMovies(movie).subscribe((result) => {
            localStorage.setItem('user', JSON.stringify(result));
            this.getFavMovies();
            this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
                duration: 3000,
            });
        });
    }

    /**
     * Opens a dialog to display the movie synopsis.
     * 
     * @param description - The description of the movie.
     */
    openSynopsisDialog(description: string): void {
        this.dialog.open(MovieSynopsisComponent, {
            data: {
                Description: description,
            },
            width: '450px',
        });
    }

    /**
     * Opens a dialog to display the genre information.
     * 
     * @param name - The name of the genre.
     * @param description - The description of the genre.
     */
    openGenreDialog(name: string, description: string): void {
        this.dialog.open(GenreInfoComponent, {
            data: {
                Name: name,
                Description: description,
            },
            width: '450px',
        });
    }

    /**
     * Opens a dialog to display the director information.
     * 
     * @param name - The name of the director.
     * @param bio - The biography of the director.
     * @param birth - The birth date of the director.
     * @param death - The death date of the director (if applicable).
     */
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
