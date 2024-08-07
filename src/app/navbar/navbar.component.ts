import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDataService } from '../movie-data.service';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component representing the navigation bar.
 * 
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss'
 */
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    /**
     * The search query entered by the user.
     */
    searchQuery: string = '';

    /**
     * List of all movies.
     */
    allMovies: any[] = [];

    /**
     * Flag to indicate whether the menu is open or closed.
     */
    menuOpen: boolean = false;

    /**
     * Creates an instance of NavbarComponent.
     * 
     * @param router - The router service for navigating between views.
     * @param snackBar - The snack bar service for displaying notifications.
     * @param movieDataService - Service for sharing movie data between components.
     * @param fetchApiData - Service for fetching API data.
     */
    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private movieDataService: MovieDataService,
        private fetchApiData: FetchApiDataService
    ) { }

    /**
     * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Fetches the list of all movies.
     */
    ngOnInit(): void {
        this.getAllMovies();
    }

    /**
     * Fetches the list of all movies from the API and updates the movie data service.
     */
    getAllMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.allMovies = resp;
            this.movieDataService.changeMovies(this.allMovies); // Initially show all movies
        });
    }

    /**
     * Toggles the state of the menu (open or closed).
     */
    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
    }

    /**
     * Filters the list of movies based on the search query.
     * Updates the movie data service with the filtered list.
     */
    searchMovies(): void {
        if (this.searchQuery) {
            console.log('Searching for:', this.searchQuery);
            const filteredMovies = this.allMovies.filter(movie =>
                movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            this.movieDataService.changeMovies(filteredMovies);
        } else {
            // Show all movies if the search query is empty
            this.movieDataService.changeMovies(this.allMovies);
        }
    }

    /**
     * Logs out the user by removing the token and user data from local storage.
     * Navigates to the welcome page and shows a logout success message.
     */
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Logging out');
        this.router.navigate(['/welcome']);
        this.snackBar.open('User logout successful', 'OK', {
            duration: 2000
        });
    }
}
