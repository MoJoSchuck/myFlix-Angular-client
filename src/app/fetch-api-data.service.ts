import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the API url that will provide data for the client app
const apiUrl = 'https://afternoon-sands-47cb04422b71.herokuapp.com/';

/**
 * Service for fetching API data.
 * 
 * @export
 * @class FetchApiDataService
 */
@Injectable({
    providedIn: 'root'
})
export class FetchApiDataService {
    /**
     * Creates an instance of FetchApiDataService.
     * 
     * @param http - The HttpClient for making HTTP requests.
     */
    constructor(private http: HttpClient) { }

    /**
     * Registers a new user.
     * 
     * @param userDetails - The user details for registration.
     * @returns An observable containing the response from the API.
     */
    public userRegistration(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Logs in a user.
     * 
     * @param userDetails - The user details for login.
     * @returns An observable containing the response from the API.
     */
    public userLogin(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'login', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Fetches all movies.
     * 
     * @returns An observable containing the list of all movies.
     */
    getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Extracts the response data.
     * 
     * @param res - The response to extract data from.
     * @returns The extracted response data.
     */
    private extractResponseData(res: Response): any {
        const body = res;
        return body || {};
    }

    /**
     * Fetches a single movie by title.
     * 
     * @param title - The title of the movie to fetch.
     * @returns An observable containing the movie details.
     */
    getOneMovie(title: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/' + title, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches the director details by name.
     * 
     * @param directorName - The name of the director to fetch.
     * @returns An observable containing the director details.
     */
    getDirector(directorName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/directors/' + directorName, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches the genre details by name.
     * 
     * @param genreName - The name of the genre to fetch.
     * @returns An observable containing the genre details.
     */
    getGenre(genreName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genre/' + genreName, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches the user profile.
     * 
     * @returns The user profile.
     */
    getUser(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user;
    }

    /**
     * Fetches the favorite movies of a user.
     * 
     * @param username - The username of the user.
     * @returns An observable containing the list of favorite movies.
     */
    getFavouriteMovies(username: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Adds a movie to the user's list of favorite movies.
     * 
     * @param movie - The movie to add to favorites.
     * @returns An observable containing the updated user data.
     */
    addFavouriteMovies(movie: any): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        return this.http.patch(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Updates the user's profile information.
     * 
     * @param userDetails - The new user details.
     * @returns An observable containing the updated user data.
     */
    editUser(userDetails: any): Observable<any> {
        const token = localStorage.getItem('token');
        const currentUsername = JSON.parse(localStorage.getItem('user') || '{}').Username;

        return this.http.put(apiUrl + 'users/' + currentUsername, userDetails, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Deletes the user's profile.
     * 
     * @returns An observable containing the response from the API.
     */
    deleteUser(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + user.Username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Removes a movie from the user's list of favorite movies.
     * 
     * @param movie - The movie to remove from favorites.
     * @returns An observable containing the updated user data.
     */
    deleteFavouriteMovies(movie: any): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Handles HTTP errors.
     * 
     * @param error - The HTTP error response.
     * @returns An observable throwing the error details.
     */
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}
