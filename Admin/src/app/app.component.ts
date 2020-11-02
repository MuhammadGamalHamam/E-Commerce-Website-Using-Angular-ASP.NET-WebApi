import { Component } from '@angular/core';
import { UserService } from './Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin';

  constructor(private userService: UserService, private router: Router) {}

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/Admin/Login');
  }
}
