import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, verifyPasswordResetCode } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {
  public hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public authForm!: FormGroup;
  public loginSubscription!:Subscription;

  constructor(private fb: FormBuilder, private auth: Auth, private asf: Firestore, private router: Router, private dialogRef: MatDialogRef<LoginModalComponent>, private accountService:AccountService) { }

  ngOnInit(): void {
    this.initAuthForm()
  }
  
  ngOnDestroy(): void {
    
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }


  loginUser() {
    console.log('click')
    const {email, password} = this.authForm.value;
    console.log(email, password)
    this.login(email, password).then(() => {
      console.log('log in done');
    }).catch((e) => {
      console.log(e)
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credentials = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credentials.user.uid);
    this.loginSubscription = docData(doc(this.asf, 'users', credentials.user.uid)).subscribe((user):any => {
      const currentUser:any = {...user, uid: credentials.user.uid};
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log(currentUser.role);
      // if (currentUser && currentUser.role === 'ADMIN') {
      //   this.router.navigate(['/admin/discount']);
      // } else if (currentUser && currentUser.role === 'USER') {
      //   this.router.navigate(['/cabinet']);
      // }
    }, (e) => {
      console.log(e)
    })
    this.dialogRef.close();
  }

}
