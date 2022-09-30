import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    const user = {
      username: (document.querySelector('.username-input') as HTMLInputElement).value,
      password: (document.querySelector('.password-input') as HTMLInputElement).value
    }
    localStorage.setItem('myCat', JSON.stringify(user));
    
  }

}
