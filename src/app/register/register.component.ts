import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  gotResponse: boolean;
  private signupDetails = new clientRegisterDetails();

  constructor(private signupService: SignupService, private router: Router) { }


  ngOnInit() {
  }

  signupForm = new FormGroup({
    customerName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', [ Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(12)]),
    address: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]),
  });

  SignUp(SignUpInformation) {
    this.signupDetails.customerName = this.CoustumerName.value;
    this.signupDetails.companyName = this.CompanyName.value;
    this.signupDetails.emailId = this.EmailId.value;
    this.signupDetails.contactNumber = this.ContactNumber.value;
    this.signupDetails.address = this.Address.value;
    this.signupService.sendSignUpDetails(this.signupDetails).subscribe(
      response => {
        if (Response) {
          this.gotResponse = true;
        }
        var records = JSON.stringify(response)
        console.log("Response =" + records);

        var statusCode = response.body.statusCode;
        console.log('Response Code =' + statusCode);

        if (statusCode == 201) {
          alert(response.body.message);
          this.router.navigate(['/clients', response]);
        }

        else if (statusCode == 200) {
          alert(response.body.message);
          this.router.navigate(['/clients', response]);
        }
        else {
          alert(response.body.message);
          this.router.navigate(['/signup']);
        }
        error => ((error: any) => {
          console.log("Error in authentication");
          if (error.status === 500) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        });

      }
    );
  }

  get EmailId() {
    return this.signupForm.get('emailId');
  }

  get CoustumerName() {
    return this.signupForm.get('customerName');
  }

  get CompanyName() {
    return this.signupForm.get('companyName');
  }

  get ContactNumber() {
    return this.signupForm.get('contactNumber');
  }

  get Address() {
    return this.signupForm.get('address');
  }

}
