import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObs: Observable<User>;
  bytes: number;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userObs = this.authService.user$;
  }
}
