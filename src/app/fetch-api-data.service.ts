import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://afternoon-sands-47cb04422b71.herokuapp.com/';
@Injectable({
    providedIn: 'root'
})


export class FetchApiDataService {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {
    }

    // Making the api call for the user registration endpoint
    public userRegistration(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    // Making the api call for the user login endpoint
    public userLogin(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'login', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    // Making the api call for the Get All Movies endpoint
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

    // Non-typed response extraction
    private extractResponseData(res: Response): any {
        const body = res;
        return body || {};
    }

    // Making the api call for the Get One Movie endpoint
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

    // Making the api call for the Get Director endpoint
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
      

    // Making the api call for the Get Genre ednpoint
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
      

    // Making the api call for the Get User endpoint
    getUser(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user;
    }

    // Making the api call for the Get Favourite Movies for a user endpoint
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

    // Making the api call for the Add a Movie to Favourite Movies endpoint
    addFavouriteMovies(movie: any): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        console.log('in fetch api service: ', movie);
        console.log('in fetch api service_id: ', movie._id);
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

    // Making the api call for the Edit User endpoint
    editUser(userDetails: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/' + userDetails.Username, userDetails, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Making the api call for the Delete User endpoint
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

    // Making the api call for the Delete a Movie from Favourite Movies endpoint
    deleteFavouriteMovies(movie: any): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        console.log('in fetch api service: ', movie._id);
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

    // Handling of HTTP errors.
    // @param {HttpErrorResponse} error - HTTP error response.
    // @returns {any} - Error details.
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