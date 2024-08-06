import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoriteComponent implements OnInit {
    favoriteMovies: any[] = [];

    constructor(
        private fetchApiData: FetchApiDataService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.loadFavoriteMovies();
    }

    loadFavoriteMovies(): void {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const favoriteMovieIDs = user.FavoriteMovies || [];
        this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
            this.favoriteMovies = movies.filter((movie: any) => favoriteMovieIDs.includes(movie._id));
            console.log('Favorite Movies:', this.favoriteMovies);
        });
    }

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
