import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeUserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('In Auth Guard');
      console.log('is Logged: ' + this.userService.isLogged());
      if (!this.userService.isLogged()){
        this.router.navigateByUrl('/Admin/Login');
      }
      return this.userService.isLogged();
      // return true;
    }

}
