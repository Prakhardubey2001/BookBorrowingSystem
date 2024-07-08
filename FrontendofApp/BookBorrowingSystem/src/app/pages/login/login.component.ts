import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginData={
  username:'',
  password:'',
};
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
formSubmit()
{
  console.log("loginFormSubmitted");
  if(this.loginData.username.trim()=='' || this.loginData.username == null)
  {
    this.snack.open(' Usename is required','',{duration: 3000,});
    return ;
  }
  if(this.loginData.password.trim()=='' || this.loginData.password == null)
  {
    this.snack.open(' Password is required','',{duration: 3000,});
    return ;
  }

  // request to server to generate token
  this.login.generateToken(this.loginData).subscribe(
    (data: any)=>{
      console.log("success");
      console.log(data);
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe((user:any)=>{
        this.login.setUser(user);
        console.log(user);
        this.router.navigate(['/user-dashboard']);


      })
    },
    (error)=>{
      console.log("error");
      this.snack.open("Invalid username or password !! Try again ",'',{duration: 3000,})
    }
  )
}
resetForm() {
  
  this.loginData = {
    username: '',
    password: ''
  };
}

}
