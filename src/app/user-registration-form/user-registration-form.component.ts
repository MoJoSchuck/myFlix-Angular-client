import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import brings in the API calls created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user registration form.
 * 
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @styleUrls ['./user-registration-form.component.scss'
 */
@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    /**
     * User data object containing username, password, email, and birthday.
     */
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

    /**
     * Creates an instance of UserRegistrationFormComponent.
     * 
     * @param fetchApiData - Service for fetching API data.
     * @param dialogRef - Reference to the dialog opened.
     * @param snackBar - Service for displaying snack bar notifications.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ) { }

    /**
     * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
    }

    /**
     * This is the function responsible for sending the form inputs to the backend.
     * Performs validation checks on the userData before making the API call.
     * On successful registration, closes the dialog and displays a success message.
     * Displays an error message upon failure.
     */
    registerUser(): void {
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

        this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
            this.dialogRef.close();
            console.log(response);
            this.snackBar.open('User registered successfully!', 'OK', {
                duration: 2000
            });
        }, (response) => {
            console.log(response);
            this.snackBar.open(response, 'OK', {
                duration: 2000
            });
        });
    }

}
