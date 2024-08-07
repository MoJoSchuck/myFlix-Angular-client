import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDataService } from '../movie-data.service';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  allMovies: any[] = [];
  menuOpen: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private movieDataService: MovieDataService,
    private fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.allMovies = resp;
      this.movieDataService.changeMovies(this.allMovies); // Initial alle Filme anzeigen
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  searchMovies(): void {
    if (this.searchQuery) {
      console.log('Searching for:', this.searchQuery);
      const filteredMovies = this.allMovies.filter(movie =>
        movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.movieDataService.changeMovies(filteredMovies);
    } else {
      // Zeige alle Filme, wenn die Suche leer ist
      this.movieDataService.changeMovies(this.allMovies);
    }
  }

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
