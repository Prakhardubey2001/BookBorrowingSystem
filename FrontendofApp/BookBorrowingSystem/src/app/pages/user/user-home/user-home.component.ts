import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  username: string | null = null;
  constructor(private login:LoginService) { }

  ngOnInit(): void {
    this.username=this.login.getUser().name;
    console.log(this.username);
  }
  showMoreContent = false;

  toggleContent() {
    this.showMoreContent = !this.showMoreContent;
  }
   

}
