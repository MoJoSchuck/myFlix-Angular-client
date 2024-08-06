import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import brings in the API calls created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar) { }

    ngOnInit(): void {
    }

    // // This is the function responsible for sending the form inputs to the backend
    // registerUser(): void {
    //     this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    //         // Logic for a successful user registration goes here! (To be implemented)
    //         this.dialogRef.close(); // This will close the modal on success!
    //         this.snackBar.open(result, 'OK', {
    //             duration: 2000
    //         });
    //     }, (result) => {
    //         this.snackBar.open(result, 'OK', {
    //             duration: 2000
    //         });
    //     });
    // }

    // This is the function responsible for sending the form inputs to the backend
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


