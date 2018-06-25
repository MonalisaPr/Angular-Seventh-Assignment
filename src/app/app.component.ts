import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  forbiddenProjectName = ['Test'];
  submitted = false;

  constructor() {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'name': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'email': new FormControl('email'),
      'status': new FormArray([])
    });

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    this.signupForm.setValue({
      'userData': {
        'name': 'Mona',
        'email': 'mona@yahoo.com'
      },
      'status': []
    });
    this.signupForm.patchValue({
      'userData': {
        'name': 'Test'
      }
    }); 
  }

  onSubmit() {

    this.submitted = true;
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  forbiddenName(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenProjectName.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  
}
