import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {User} from '../../../core/auth/shared/user.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  @Output() login: EventEmitter<Observable<User>> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onGoogleClick() {
    this.login.emit(this.authService.googleLogin());
  }

  onFacebookClick() {
    this.login.emit(this.authService.facebookLogin());
  }

}
