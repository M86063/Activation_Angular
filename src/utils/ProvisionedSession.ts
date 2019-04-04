export interface IProvisionedSession {
  session: string;
  youseeScope: string;
  finallink: string;
  subscriber: Subscriber;
  siteconfig: SiteConfig;
  smpaccessnet?: SmpAccessNet[];
  smpservices: SmpService[];
  next: Next;
}

export interface SiteConfig {
  isp: string;
  stylesheet: string;
  phone?: string;
  stylesheetIE: string;
}

export interface Next {
  site: string;
  uri: string;
  http: string;
}

export interface SmpAccessNet {
  type: string;
  macAddress?: string;
  model?: string;
  capabilities?: Capabilities;
  macVendor?: string;
  ip?: string;
  cpeType?: string;
}

export interface Capabilities {
  model: string;
  WiFiChannels: string[];
  SpeedTestDownstream: boolean;
  SpeedTestUpstream: boolean;
  Docsis3: boolean;
  WiFi: boolean;
  Voice: boolean;
  CMTemplate: boolean;
  FactoryResetOID: string;
  truth_value: string;
  reboot_time_first_provisioning: string;
  system_description: string;
  system_name: string;
  mta_fqdn: string;
  mta_mac: string;
  oidbts: string;
  oidstatus: string;
  oidprov: string;
  act_portal_system_name: string;
  mac_offset: string;
}

export interface SmpService {
  type: string;
  ssid?: string;
  channel?: string;
  ss_id_5g?: string;
  gw_channel_id_5g?: string;
  status?: string;
  product?: string;
  modemId?: string;
  channel_5g?: string;
  next?: Next;
  telefonNummer?: string;
  cnam?: string;
  name?: string;
}

export interface Subscriber {
  subscriber: string;
  firstName: string;
  lastName: string;
  email?: string;
  address1: string;
  postnummer?: string;
  city: string;
  postdistrict: string;
}
