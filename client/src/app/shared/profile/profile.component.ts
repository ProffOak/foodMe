import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Observable} from 'rxjs';
import {FileService} from '../../core/file-upload/file.service';
import {CuisineService} from "../../cuisine/shared/cuisine.service";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObs: Observable<User>;
  bytes: number;
  constructor(private authService: AuthService, private fileService: FileService, private cuisineService: CuisineService) { }

  ngOnInit() {
    this.userObs = this.authService.user$;
    console.log(this.cuisineService.cuisineArray);
  }


  fileSelected(files: any) {
    const task = this.fileService.uploadFile(files[0]);
    task.percentageChanges().subscribe(res=>{this.bytes=res});
  }
}
