import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../shared/session/session.service';
import { Session } from '../shared/types';
import { AuthService } from '../shared/auth.service';
import { SMPService, Accessnet } from './../shared/types';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  wifiForm: FormGroup;
  session: Session;
  internetSmpService: SMPService;
  accessnet: Accessnet;
  WifiChannels: string[];
  Wifi5GChannels: string[];
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: AuthService,
    private readonly sessionService: SessionService
  ) { }

  ngOnInit() {
    this.sessionService.session.subscribe(session => {
      this.session = session;
      this.internetSmpService = session.smpservices.find(
        smpService => smpService.type === 'InternetAccess'
      );
      this.accessnet = session.accessnet.find(
        access => access.deviceType === 'CableModem'
      );
    });

    this.WifiChannels = this.accessnet.capabilities.WiFiChannels.map(channel => {
      return channel === '0' ? 'Auto' : channel;
    });
    this.Wifi5GChannels = this.accessnet.capabilities.WiFi5GChannels.map(channel => {
      return channel === '0' ? 'Auto' : channel;
    });

    this.wifiForm = this.formBuilder.group({
      ss_id_5g: [
        this.internetSmpService.ss_id_5g,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
      ],
      psk_5g: [
        this.internetSmpService.psk_5g,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,16}$')]
      ],
      ssid: [
        this.internetSmpService.ssid,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
      ],
      psk: [
        this.internetSmpService.psk,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,16}$')]
      ],

      channel_5g: [this.internetSmpService.channel_5g, Validators.required],
      channel: [this.internetSmpService.channel, Validators.required]
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.wifiForm.invalid) {
      return;
    }
    if (this.wifiForm.get('channel_5g').value === 'Auto') {
      this.wifiForm.get('channel_5g').setValue('0');
    }
    if (this.wifiForm.get('channel').value === 'Auto') {
      this.wifiForm.get('channel').setValue('0');
    }

    this.service.saveWiFi(this.wifiForm.value, this.session.session);

    this.modal.dismiss();
  }
}
