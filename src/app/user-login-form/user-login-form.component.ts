import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import to bring in the API call created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user login form.
 * 
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss'
 */
@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
    /**
     * User data object containing username and password.
     */
    @Input() userData = { Username: '', Password: '' };

    /**
     * Creates an instance of UserLoginFormComponent.
     * 
     * @param fetchApiData - Service for fetching API data.
     * @param dialogRef - Reference to the dialog opened.
     * @param snackBar - Service for displaying snack bar notifications.
     * @param router - The router service for navigating between views.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router
    ) { }

    /**
     * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
    }

    /**
     * Logs in the user by sending the user data to the API.
     * On successful login, stores user and token in local storage, closes the dialog, and navigates to the movies page.
     * On failed login, displays an error message.
     */
    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
            // Logic for a successful user login
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', result.token);
            this.dialogRef.close(); // Will close modal on success
            this.snackBar.open('User login successful', 'OK', {
                duration: 2000
            });
            this.router.navigate(['movies']);
        }, (result) => {
            this.snackBar.open('User login failed', 'OK', {
                duration: 2000
            });
        });
    }
}
