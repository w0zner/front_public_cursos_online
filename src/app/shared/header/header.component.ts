import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any= null

  constructor(private authService: AuthService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.authService.user
  }

  logout(){
    this.authService.logout()
  }

}
