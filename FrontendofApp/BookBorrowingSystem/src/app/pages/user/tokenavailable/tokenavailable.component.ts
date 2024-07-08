import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tokenavailable',
  templateUrl: './tokenavailable.component.html',
  styleUrls: ['./tokenavailable.component.css']
})
export class TokenavailableComponent implements OnInit {
tokenAvailable:number | null = null;
  constructor(private login:LoginService) { }

  ngOnInit(): void {
    this.login.getTokenAvailable().subscribe(tokensAvailable => {
      this.tokenAvailable = tokensAvailable;
    });
  }

}
