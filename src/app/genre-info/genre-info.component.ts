import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component representing the genre info dialog.
 * 
 * @selector 'app-genre-info'
 * @templateUrl './genre-info.component.html'
 * @styleUrls ['./genre-info.component.scss'
 */
@Component({
    selector: 'app-genre-info',
    templateUrl: './genre-info.component.html',
    styleUrls: ['./genre-info.component.scss']
})
export class GenreInfoComponent implements OnInit {

    /**
     * Data containing genre information.
     * 
     * @param data - The genre data injected into the dialog.
     * @property {string} data.Name - The name of the genre.
     * @property {string} data.Description - The description of the genre.
     */
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            Name: string,
            Description: string
        }
    ) { }

    /**
     * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Initialize any logic needed for the component here.
     */
    ngOnInit(): void {

    }
}
