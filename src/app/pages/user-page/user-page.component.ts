import { Component } from '@angular/core';
import { LoginService } from '../login-page/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute ) {}

  activeUser$ = this.loginService.activeUser$;
  userId?: string | null;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
  }

  logOut() {
    this.loginService.clearUser();
    this.router.navigate(['/']);
  }

}
