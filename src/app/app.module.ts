import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FavoriteComponent } from './favorites/favorites.component';
import { MovieSynopsisComponent } from './movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from './genre-info/genre-info.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: 'favorites', component: FavoriteComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

/**
 * The main module of the application.
 * 
 * @module AppModule
 */
@NgModule({
    declarations: [
        AppComponent,
        UserRegistrationFormComponent,
        UserLoginFormComponent,
        MovieCardComponent,
        WelcomePageComponent,
        NavbarComponent,
        FavoriteComponent,
        MovieSynopsisComponent,
        GenreInfoComponent,
        DirectorInfoComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule,
        RouterModule.forRoot(appRoutes),
        MatIconModule,
        MatToolbarModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
