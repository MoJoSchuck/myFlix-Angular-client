import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-movie-synopsis',
    templateUrl: './movie-synopsis.component.html',
    styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { Description: string }
    ) { }

}
