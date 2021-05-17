import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserType } from '../user-types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal:
    | ElementRef
    | undefined;
  @ViewChild('congratsModal', { static: false }) congratsModal:
    | ElementRef
    | undefined;
  joinForm!: FormGroup;
  isLoading: boolean = false;
  userType = UserType;
  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initJoinForm();
  }
  initJoinForm() {
    this.joinForm = this.fb.group({
      user_type: [UserType.USER_PROFILE, Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', [Validators.email, Validators.required]],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.pattern('^(((8)(0|1))|((7)(0))|((9)(0)))\\d{8}$'),
        ],
      ],
      address: [''],
      company_name: [''],
    });
  }

  changeUserType(event: any) {
    switch (event) {
      case UserType.USER_PROFILE:
        this.joinForm.get('first_name')?.setValidators(Validators.required);
        this.joinForm.get('first_name')?.updateValueAndValidity();
        this.joinForm.get('last_name')?.setValidators(Validators.required);
        this.joinForm.get('last_name')?.updateValueAndValidity();
        this.joinForm.get('company_name')?.clearValidators();
        this.joinForm.get('company_name')?.updateValueAndValidity();
        this.joinForm.get('address')?.clearValidators();
        this.joinForm.get('address')?.updateValueAndValidity();
        break;
      case UserType.COLLECTOR_PROFILE:
        this.joinForm.get('first_name')?.setValidators(Validators.required);
        this.joinForm.get('first_name')?.updateValueAndValidity();
        this.joinForm.get('last_name')?.setValidators(Validators.required);
        this.joinForm.get('last_name')?.updateValueAndValidity();
        this.joinForm.get('address')?.setValidators(Validators.required);
        this.joinForm.get('address')?.updateValueAndValidity();
        this.joinForm.get('company_name')?.clearValidators();
        this.joinForm.get('company_name')?.updateValueAndValidity();
        break;
      case UserType.RECYCLING_COMPANY_PROFILE:
        this.joinForm.get('company_name')?.setValidators(Validators.required);
        this.joinForm.get('company_name')?.updateValueAndValidity();
        this.joinForm.get('first_name')?.clearValidators();
        this.joinForm.get('first_name')?.updateValueAndValidity();
        this.joinForm.get('last_name')?.clearValidators();
        this.joinForm.get('last_name')?.updateValueAndValidity();
        this.joinForm.get('address')?.setValidators(Validators.required);
        this.joinForm.get('address')?.updateValueAndValidity();
        break;
      default:
        break;
    }
  }
  toast() {
    this._toastr.error('Fill the form properly', 'Form Error', {
      timeOut: 3000,
    });
  }
  async submit() {
    this.isLoading = true;
    const payload = this.joinForm.value;
    console.log(payload);
    if (this.joinForm.valid) {
      (await this._auth.join(payload)).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.closeModal?.nativeElement.click();
          this.congratsModal?.nativeElement.click();
          this.initJoinForm();
        },
        error: (e) => {
          this.isLoading = false;
          console.log(e);
          if (e.status == 0) {
            this._toastr.error(
              'Please check your internet connection',
              'Error',
              {
                timeOut: 3000,
              }
            );
          } else {
            this._toastr.error(e.error, '', {
              timeOut: 3000,
            });
          }
        },
      });
    } else {
      this.isLoading = false;
      this._toastr.error('Fill the form properly', 'Form Error', {
        timeOut: 3000,
      });
    }
  }
}
