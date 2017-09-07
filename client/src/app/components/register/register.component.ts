import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  processing = false;
  usernameMessage;
  emailMessage;

  constructor(
  	private formBuilder: FormBuilder,
  	private authService: AuthService,
  	private router: Router
  	) {
  	this.form = this.formBuilder.group({
  		username: ['', Validators.compose([
  			Validators.required,
  			Validators.minLength(3),
  			Validators.maxLength(25)
  			])],
  		email: ['', Validators.compose([
  			Validators.required,
  			Validators.minLength(5),
  			Validators.maxLength(30),
  			this.validateEmail
  			])],
  		password: ['', Validators.compose([
  			Validators.required,
  			Validators.minLength(8),
  			Validators.maxLength(30)
  			])],
  		confirm: ['', Validators.required]
  	}, {validator: this.validatePasswords('password', 'confirm')})
  }	

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
    	return null
    } else {
    	return {'validateEmail': true}
    }
  }

   validatePasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; 
      	} else {
        return { 'validatePasswords': true } 
      	}
      }
	}

  onRegisterSubmit() {
  	this.processing = true;
  	const user = {
  		username: this.form.get('username').value,
  		email: this.form.get('email').value,
  		password: this.form.get('password').value
  	};
  	this.authService.register(user).subscribe((data) => {
  		if (!data.succes) {
  			this.processing = false;
  			this.messageClass = "alert alert-danger";
  			this.message = data.message
  		} else {
  			this.messageClass = "alert alert-success";
  			this.message = data.message;
  			setTimeout(() => {
  				this.router.navigate(['/login'])
  			}, 1500)
  		}
  	})
  }

  checkUsername() {
  	const username = this.form.get('username').value.toLowerCase();
  	this.authService.checkUsername(username).subscribe((data) => {
  		if (!data.succes) {
  			this.usernameMessage = data.message
  		} else {
  			this.usernameMessage = false
  		}
  	})
  }

  checkEmail() {
  	const email = this.form.get('email').value.toLowerCase();
  	this.authService.checkEmail(email).subscribe((data) => {
  		if (!data.succes) {
  			this.emailMessage = data.message
  		} else {
  			this.emailMessage = false
  		}
  	})
  }

  ngOnInit() {
  }
}
