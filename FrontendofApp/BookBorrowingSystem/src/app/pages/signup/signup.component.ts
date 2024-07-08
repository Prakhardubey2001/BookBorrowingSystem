import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userSignupService:SignupService,
    private snack:MatSnackBar,
    private router:Router
    
  ) { }
  public user={
    name:'',
    username: '',
    password: '',
  }

  ngOnInit(): void {
  }
  formSubmit()
  {

    console.log(this.user.name);
    if (!this.isValidEmail(this.user.username)) {
      this.snack.open('Invalid email format for username and it should be unique.', '', {
        duration: 3000,
      });
      return;
    }

    
    if (!this.isValidPassword(this.user.password)) {
      this.snack.open(
        'Password must contain at least 8 characters, including at least one digit, one lowercase letter, one uppercase letter, and one special character.',
        '',
        {
          duration: 3000,
        }
      );
      return;
    }
    if (this.user.username === '' || this.user.password === ''|| this.user.name==='') {
      this.snack.open('Please fill out all fields correctly,Some fields may be missing ', '', {
        duration: 3000,
      });
      return;
    }
    if (!this.isValidName(this.user.name)) {
      this.snack.open(
        'Name should start with an alphabet and can contain alphabets, spaces, and digits, but should have at least 2 characters excluding space as the second character.And length not greater than 50',
        '',
        {
          duration: 3000,
        }
      );
      return;
    }
// adduser from signup service
this.userSignupService.addUser(this.user).subscribe
((data) => {
  // success
  console.log(data);
  Swal.fire('Success', 'User is registered', 'success');
  this.router.navigate(['login'])

  },
  (err) => {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>',
    });
    
  }
);
  }
  clearForm(){
    this.user={
      name:'',
      username:'',
      password:'',
    };
  }
  private isValidEmail(email: string): boolean {
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    
    const hasDigit = /[0-9]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    const isLengthValid = password.length >= 8;
    const uniqueChars = new Set(password).size >= 2;

    return (
      hasDigit &&
      hasLowercase &&
      hasUppercase &&
      hasSpecialChar &&
      isLengthValid &&
      uniqueChars
    );
  }
   private isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$/;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
  }


}
