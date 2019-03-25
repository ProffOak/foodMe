import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnInit {


  @Output() fileListEvent: EventEmitter<FileList> = new EventEmitter();

  // If validation to ensure files are Image
  @Input()
    isImage = false;

  // Input to allow multiple files or not
  @Input()
    isMultiple = false;

  // State for dropzone CSS toggling
  isHovering: boolean;

  fileTitle = 'Fil';

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (this.isImage && this.isMultiple) {
      this.fileTitle = 'Bilder';
    } else if (this.isImage && !this.isMultiple ) {
      this.fileTitle = 'Bild';
    } else if (!this.isImage && this.isMultiple) {
      this.fileTitle = 'Filer';
    }
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  fileSelected(event: FileList) {

    // Client-side validation with image
    for (let _i = 0; _i < event.length; _i++) {
      const file = event.item(_i);
      if (this.isImage) {
        if (file.type.split('/')[0] !== 'image') {
          this.snackbarService.showSnackBar(SnackbarStyle.Error, SnackbarMessage.Custom, 'Måste vara en bild!');
          return;
        }
      }
    }
    this.fileListEvent.emit(event);
  }
}


