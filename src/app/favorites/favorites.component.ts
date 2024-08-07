import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';

/**
 * Component for displaying and managing favorite movies.
 * 
 * @selector 'app-favorite'
 * @templateUrl './favorites.component.html'
 * @styleUrls ['./favorites.component.scss']
 */
@Component({
    selector: 'app-favorite',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoriteComponent implements OnInit {
    /**
     * List of favorite movies.
     */
    favoriteMovies: any[] = [];

    /**
     * Creates an instance of FavoriteComponent.
     * 
     * @param fetchApiData - Service for fetching API data.
     * @param snackBar - Service for displaying snack bar notifications.
     * @param dialog - Service for opening dialogs.
     */
    constructor(
        private fetchApiData: FetchApiDataService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
    ) { }

    /**
     * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Initializes the favorite movies list.
     */
    ngOnInit(): void {
        this.loadFavoriteMovies();
    }

    /**
     * Loads the list of favorite movies.
     * Fetches the user's favorite movies from local storage and filters the full movie list.
     */
    loadFavoriteMovies(): void {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const favoriteMovieIDs = user.FavoriteMovies || [];
        this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
            this.favoriteMovies = movies.filter((movie: any) => favoriteMovieIDs.includes(movie._id));
            console.log('Favorite Movies:', this.favoriteMovies);
        });
    }

    /**
     * Removes a movie from the user's list of favorite movies.
     * 
     * @param movieId - The ID of the movie to remove from favorites.
     */
    removeFromFavorites(movieId: string): void {
        this.fetchApiData.deleteFavouriteMovies({ _id: movieId }).subscribe((resp: any) => {
            // Update the local user data
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movieId);
            localStorage.setItem('user', JSON.stringify(user));

            // Refresh the list of favorite movies
            this.loadFavoriteMovies(); // Refresh the list
            this.snackBar.open('Movie removed from favorites', 'OK', {
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
