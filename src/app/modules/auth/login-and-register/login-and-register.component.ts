import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { URL_FROTEND } from 'src/app/config/config';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent implements OnInit {

  email: string = ''
  password: string = ''

  email_register: string= ''
  password_register: string= ''
  password_confirm_register: string= ''
  name_register: string= ''
  surname_register: string= ''
  rol: string= 'CLIENTE'


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
      next: (response: any) => {
        console.log(response)
        if(response){
          location.href = URL_FROTEND
        }
      },
      error: err => console.log(err),
    })
  }

  register() {

    const data= {
      rol: this.rol,
      name: this.name_register,
      surname: this.surname_register,
      email: this.email_register,
      password: this.password_register
    }

    this.authService.register(data).subscribe({
      next: (response: any) => {
        console.log(response)

      },
      error: err => console.log(err)
    })
  }

}
