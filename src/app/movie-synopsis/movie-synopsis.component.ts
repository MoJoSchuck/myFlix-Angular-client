import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component representing the movie synopsis dialog.
 * 
 * @selector 'app-movie-synopsis'
 * @templateUrl './movie-synopsis.component.html'
 * @styleUrls ['./movie-synopsis.component.scss'
 */
@Component({
    selector: 'app-movie-synopsis',
    templateUrl: './movie-synopsis.component.html',
    styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent {

    /**
     * Creates an instance of MovieSynopsisComponent.
     * 
     * @param data - The movie synopsis data injected into the dialog.
     * @property {string} data.Description - The description of the movie.
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { Description: string }
    ) { }

}
