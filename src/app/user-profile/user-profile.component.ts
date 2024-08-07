import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user profile page.
 * 
 * @selector 'app-user-profile'
 * @templateUrl './user-profile.component.html'
 * @styleUrls ['./user-profile.component.scss'
 */
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    /**
     * User data object containing username, email, birthday, and password.
     */
    @Input() userData = { Username: "", Email: "", Birthday: "", Password: "" };

    /**
     * Object to store the user's profile information.
     */
    user: any = {};

    /**
     * Creates an instance of UserProfileComponent.
     * 
     * @param fetchApiData - Service for fetching API data.
     * @param snackBar - Service for displaying snack bar notifications.
     * @param router - The router service for navigating between views.
     * @param dialog - Service for opening dialogs.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog
    ) { }

    /**
     * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Fetches the user's profile information.
     */
    ngOnInit(): void {
        this.getProfile();
    }

    /**
     * Fetches the user's profile information from the API.
     * Updates the userData object with the fetched data.
     */
    getProfile(): void {
        this.user = this.fetchApiData.getUser();
        this.userData.Username = this.user.Username;
        this.userData.Email = this.user.Email;
        this.userData.Birthday = this.user.Birthday;
    }

    /**
     * Updates the user's profile information.
     * Performs validation checks on the userData before making the API call.
     * On successful update, logs out the user and navigates to the welcome page.
     * Displays a notification upon success or failure.
     */
    updateUser(): void {
        if (this.userData.Username.length < 5) {
            this.snackBar.open('Username must be at least 5 characters long', 'OK', {
                duration: 2000
            });
            return;
        }

        if (!this.userData.Password) {
            this.snackBar.open('Password is required', 'OK', {
                duration: 2000
            });
            return;
        }

        if (!this.userData.Email.includes('@')) {
            this.snackBar.open('Email does not appear to be valid', 'OK', {
                duration: 2000
            });
            return;
        }

        this.fetchApiData.editUser(this.userData).subscribe((result) => {
            console.log('User update success', result);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.router.navigate(['welcome']);
            this.snackBar.open('User update successful. Please log in again.', 'OK', {
                duration: 2000
            });
        }, (error) => {
            console.error('Error updating user:', error);
            this.snackBar.open('Failed to update user. Please try again.', 'OK', {
                duration: 2000
            });
        });
    }

    /**
     * Deletes the user's profile.
     * Clears the local storage and navigates to the welcome page upon success.
     * Displays a notification upon success or failure.
     */
    deleteUser(): void {
        this.router.navigate(['welcome']).then(() => {
            localStorage.clear();
            this.snackBar.open('User successfully deleted.', 'OK', {
                duration: 2000
            });
        });
        this.fetchApiData.deleteUser().subscribe((result) => {
            console.log(result);
        });
    }
}
