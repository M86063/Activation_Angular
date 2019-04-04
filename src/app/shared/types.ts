import { Capabilities } from './types';
export interface Wifi {
  ssid: string;
  ss_id_5g?: string;
  psk: string;
  psk_5g: string;
  channel?: string;
  gw_channel_id_5g?: string;
}

export interface User {
  username: string;
  password: string;
}

export interface YouseeSession {
  session: string;
  next: NextRequest;
  siteconfig: SiteConfig;
}

export interface Session extends YouseeSession {
  youseeScope: boolean;
  finallink: string;
  subscriber: SMPSubscriber;
  smpservices?: SMPService[];
  smpaccessnet?: Smpaccessnet[];
  smporderresult?: Smporderresult;
  accessnet?: Accessnet[];
  activecomputer?: Activecomputer;
  newcustomer?: Newcustomer;
}

export interface NextRequest {
  site: string;
  uri: string;
  http: string;
}

export interface SiteConfig {
  isp: string;
  stylesheet: string;
  stylesheetIE: string;
}

export interface Activecomputer {
  deviceType: string;
  macAddress: string;
  ip: string;
  giAddress: string;
  docsis3Capable: boolean;
  wifiCapable: boolean;
  ownerid: string;
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
  method: string;
}

export interface Smporderresult {
  status: string;
  countdown: string;
}

export interface Newcustomer {
  mail: boolean;
  mobil: boolean;
  password: boolean;
  next: Next;
}

export interface Next {
  site: string;
  uri: string;
  http: string;
}

export interface SMPService {
  type: string;
  ssid?: string;
  ss_id_5g?: string;
  psk?: string;
  psk_5g?: string;
  status?: string;
  product?: string;
  modemId?: string;
  channel_5g?: string;
  channel?: string;
  gw_channel_id_5g?: string;
  telefonNummer?: string;
  cnam?: string;
  next?: NextRequest;
  name?: string;
}

export interface SMPSubscriber {
  subscriber: string;
  firstName: string;
  lastName: string;
  email?: string;
  address1: string;
  postnummer?: string;
  city: string;
  postdistrict: string;
}

export interface Smpaccessnet {
  type: string;
  macAddress?: string;
  model?: string;
  capabilities?: Capabilities;
  ip?: string;
  cpeType?: string;
}

export interface Capabilities {
  model: string;
  oidssid: string;
  oidssid5g: string;
  oidpsk: string;
  oidpsk5g: string;
  WiFi5GChannels: string[];
  WiFiChannels: string[];
  WiFi5G: true;
  Docsis3: true;
  WiFi: true;
  Voice: true;
  CMTemplate: true;
  Preloaded: string;
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

export interface Accessnet {
  deviceType: string;
  macAddress: string;
  ip?: string;
  model?: string;
  capabilities?: Capabilities;
}
