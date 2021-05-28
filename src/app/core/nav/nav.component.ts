import { UtilityService } from './../../services/utility.service';
import { AuthService } from './../../services/auth.service';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserType } from '../user-types';
import { Country, State } from 'src/app/shared/models/country.model';
import { isPlatformBrowser } from '@angular/common';

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
  fetchingStates: boolean = false;
  userType = UserType;
  countries: Country[] = [];
  selectedCountryStates: State[] | undefined = [];
  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _utility: UtilityService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  ngOnInit(): void {
    this.getCountriesJson();
    this.initJoinForm();
    if (isPlatformBrowser(this.platformId)) {
    }
  }
  initJoinForm() {
    this.joinForm = this.fb.group({
      user_type: [UserType.USER_PROFILE, Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', [Validators.email, Validators.required]],
      // phone_number: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern('^(((8)(0|1))|((7)(0))|((9)(0)))\\d{8}$'),
      //   ],
      // ],
      address: [''],
      country: ['Nigeria', Validators.required],
      state: ['default', Validators.required],
      company_name: [''],
    });
  }

  getCountriesJson() {
    this._utility.getCountries().subscribe({
      next: (res) => {
        this.countries = res;
        const selectedCountry: Country | undefined = this.countries.find(
          (c) => c.name == 'Nigeria'
        );
        const selectedCountryStates: State[] | undefined =
          selectedCountry?.states;
        this.selectedCountryStates = selectedCountryStates;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  selectState(country: string) {
    this.fetchingStates = true;
    const selectedCountry: Country | undefined = this.countries.find(
      (c) => c.name == country
    );
    const selectedCountryStates: State[] | undefined = selectedCountry?.states;
    this.selectedCountryStates = selectedCountryStates;
    this.fetchingStates = false;
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
