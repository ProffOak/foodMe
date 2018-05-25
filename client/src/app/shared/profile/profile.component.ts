import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Observable} from 'rxjs';
import {FileService} from '../../core/file-upload/file.service';
import {QuisineService} from "../../quisine/shared/quisine.service";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObs: Observable<User>;
  bytes: number;
  constructor(private authService: AuthService, private fileService: FileService, private quisineService: QuisineService) { }

  ngOnInit() {
    this.userObs = this.authService.user$;
    console.log(this.quisineService.quisineArray);
  }


  fileSelected(files: any) {
    const task = this.fileService.uploadFile(files[0]);
    task.percentageChanges().subscribe(res=>{this.bytes=res});
  }
}
