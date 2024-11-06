import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent implements OnInit {

  email: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    console.log(this.authService.user)
    console.log("init token" + this.authService.token)
    if(this.authService.user){
      this.router.navigateByUrl("/")
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: response => console.log(response),
      error: err => console.log(err),
    })
  }

}
