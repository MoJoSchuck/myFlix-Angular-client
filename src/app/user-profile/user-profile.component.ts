import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    @Input() userData = { Username: "", Email: "", Birthday: "", Password: "" };
    user: any = {};

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getProfile();
    }

    getProfile(): void {
        this.user = this.fetchApiData.getUser();
        this.userData.Username = this.user.Username;
        this.userData.Email = this.user.Email;
        this.userData.Birthday = this.user.Birthday;
    }

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
