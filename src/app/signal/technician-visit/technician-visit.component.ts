import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { validateControlWithProps } from 'src/utils/validateControlWithProps';
import { SessionService } from 'src/app/shared/session/session.service';
import { Observable } from 'rxjs';
import { Session, SMPSubscriber } from 'src/app/shared/types';
import { map } from 'rxjs/operators';

export interface TechnicianOrder {
  name: string;
  roadName: string;
  city: string;
  phone: string;
}

@Component({
  selector: 'app-technician-visit',
  templateUrl: './technician-visit.component.html',
  styleUrls: ['./technician-visit.component.scss']
})
export class TechnicianVisitComponent implements OnInit {
  @Input()
  public techOrder: TechnicianOrder;
  public errorMessage = '';
  public subscriber: SMPSubscriber;

  private fb = new FormBuilder();

  public techOrderForm = this.fb.group({
    phone: ['', Validators.required]
  });

  constructor(
    private apiService: AuthService,
    private router: Router,
    private readonly utilsService: UtilsService,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit() {
    this.utilsService.showError.subscribe(error => (this.errorMessage = error));
    this.sessionService.session.subscribe(session => {
      this.subscriber = session.subscriber;
    });
  }

  public OrderTechnician() {
    if (this.techOrderForm.invalid) {
      return;
    }
    const phone = this.techOrderForm.get('phone').value;
    const { city, address1, firstName, lastName } = this.subscriber;
    this.apiService.orderTechnician({
      phone,
      name: firstName + ' ' + lastName,
      city,
      roadName: address1
    });
  }

  public exit() {
    this.router.navigate(['/']);
  }

  public validateInputWithProp(
    controlName: string,
    props: [keyof AbstractControl]
  ) {
    return validateControlWithProps(controlName, this.techOrderForm, props);
  }
}
