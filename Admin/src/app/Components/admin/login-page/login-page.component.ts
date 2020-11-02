import { Component, OnInit } from '@angular/core';
import { LoginVM } from 'src/app/Shared/login-vm';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userLogin: LoginVM;

  constructor(private userService: UserService, private router: Router) {
    this.userLogin = { username: '', password: '', grant_type: '' };
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.userLogin).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('accessToken', response.access_token);

        let oneday = new Date();
        // oneday.setHours(oneday.getHours() + 24); // one day from now // expires_in
        oneday.setMinutes(oneday.getMinutes() + 5);
        localStorage.setItem('expiration', oneday.toString());
        console.log(oneday.toString());
        console.log(oneday);

        console.log(localStorage.getItem('accessToken'));

        this.router.navigateByUrl('/Admin/Product');
      },
      (err: any) => {
        alert(err.error.error_description);
        console.log(err);
      }
    );
  }

}
