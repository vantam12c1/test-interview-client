import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private _auth: AuthService,
    private _jwt: JwtService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this._auth.currentUser$.subscribe((res: Profile) => {
      this.currentUser = res;            
    });
  }

  onLogout() {
    this._auth.logout().subscribe(res => {
      this._jwt.removeToken();
      this.router.navigateByUrl('/auth/login')
    });
  }  
}
