import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../../core/auth/shared/user.model';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  email: string;
  password: string;

  @Output() login: EventEmitter<Observable<User>> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.login.emit(this.authService.emailLogin(this.email, this.password));
  }

}
