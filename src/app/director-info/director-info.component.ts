import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component representing the director info dialog.
 * 
 * @selector 'app-director-info'
 * @templateUrl './director-info.component.html'
 * @styleUrls ['./director-info.component.scss'
 */
@Component({
    selector: 'app-director-info',
    templateUrl: './director-info.component.html',
    styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent implements OnInit {

    /**
     * Data containing director information.
     * 
     * @param data - The director data injected into the dialog.
     * @property {string} data.Name - The name of the director.
     * @property {string} data.Bio - The biography of the director.
     * @property {string} data.Birth - The birth date of the director.
     * @property {string} data.Death - The death date of the director (if applicable).
     */
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            Name: string,
            Bio: string,
            Birth: string,
            Death: string
        }
    ) { }

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Initialize any logic needed for the component here.
     */
    ngOnInit(): void {

    }
}
